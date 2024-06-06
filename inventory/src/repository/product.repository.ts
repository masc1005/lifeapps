import { PrismaClient } from '@prisma/client'
import { Product } from '../types/product.types'

export class ProductRepository {
  private dbClient: PrismaClient

  constructor() {
    this.dbClient = new PrismaClient()
  }

  createProduct = async (data: Product) => {
    delete data?.id
    const create = await this.dbClient.product.create({
      data: {
        ...data
      }
    })
    return create
  }

  getProducts = async () => {
    return await this.dbClient.product.findMany()
  }

  getProduct = async (id: string) => {
    return await this.dbClient.product.findFirstOrThrow({
      where: {
        id
      }
    })
  }

  updateProduct = async (id: string, data: Product) => {
    delete data.id

    const update = await this.dbClient.product.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })

    return update
  }

  addProduct = async (id: string, quantity: number) => {
    const add = await this.dbClient.product.update({
      where: {
        id
      },
      data: {
        quantity: {
          increment: quantity
        }
      }
    })

    return add
  }

  subProduct = async (id: string, quantity: number) => {
    const sub = await this.dbClient.product.update({
      where: {
        id
      },
      data: {
        quantity: {
          decrement: quantity
        }
      }
    })

    return sub
  }

  deleteProduct = async (id: string) => {
    return await this.dbClient.product.delete({ where: { id } })
  }

}

