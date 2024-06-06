import { PrismaClient } from '@prisma/client'
import { Order } from '../types/order.types'
import axios from 'axios'
import os from 'os'

import { KafkaProducer } from '../config/kafka/producer'

export class OrderRepository {
  private dbClient: PrismaClient
  private producer: KafkaProducer

  constructor() {
    this.dbClient = new PrismaClient()
    this.producer = new KafkaProducer()
  }

  createOrder = async (data: Order) => {
    delete data?.id

    data.total = 0

    for (let item of data.products) {
      const response = await axios.get(`${process.env.INVENTORY}/get-product/${item["id"]}`, {
        headers: {
          "Content-Type": "application/json"
        },
      })

      data.total = data.total + response.data.price

      if (data["quantity"] < item["quantity"]) return null
    }

    const create = await this.dbClient.orders.create({
      data: {
        status: "PENDING",
        ...data
      }
    })

    if (!data) throw new Error("Erro ao criar pedido")

    return create
  }

  getOrders = async () => {
    return await this.dbClient.orders.findMany()
  }

  getOrder = async (id: string) => {
    return await this.dbClient.orders.findFirstOrThrow({
      where: {
        id
      }
    })
  }

  updateOrder = async (id: string, data: Order) => {
    const find = await this.dbClient.orders.findFirstOrThrow({
      where: {
        id
      }
    })

    if (find.status === "APPROVED" || find.status === "DENIED") {
      return null
    }

    const update = await this.dbClient.orders.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })

    if (update.status === "APPROVED" || update.status === "CANCELED") {
      this.producer.sendMessage("UPDATE_ORDER", { find, data })
    }

    return update
  }

  deleteOrder = async (id: string) => {
    return await this.dbClient.orders.delete({ where: { id } })
  }

}

