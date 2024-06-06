import { Request, Response, json } from "express";
import { OrderRepository } from '../repository/order.repository'
import { Order } from '../types/order.types'
import { kafka } from '../config/kafka'
import { Kafka } from "kafkajs";

export class OrderController {
  private repository: OrderRepository

  constructor() {
    this.repository = new OrderRepository()
  }

  post = async (req: Request, res: Response) => {
    const data: Order = req.body

    const save = await this.repository.createOrder(data)

    if (!save) return res.status(500).json({ message: "erro ao salvar" });

    return res.status(201).json({ order_id: save.id, status: save.status, message: "Criado, aguardando aprovação" })
  }

  getMany = async (req: Request, res: Response) => {
    return res.status(200).json(await this.repository.getOrders())
  }

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: "necessario enviar ID" });

    const find = await this.repository.getOrder(id)

    if (!find) return res.status(400).json({ message: "Pedido não encontrado" });

    return res.status(200).json(find)
  }

  put = async (req: Request, res: Response) => {
    const { id } = req.params
    const data: Order = req.body

    delete data.id

    const update = await this.repository.updateOrder(id, data)

    if (!update) return res.status(500).json({ message: "erro ao atualizar" });
    if (update.status === "DENIED") return res.status(400).json({ message: "Pedido negado" });

    return res.status(200).json(update)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const remove = await this.repository.deleteOrder(id)

    if (!remove) return res.status(500).json({ message: "erro ao deletar" });

    return res.status(200).json(remove)
  }
}