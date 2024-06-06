import { Request, Response } from "express";
import { ProductRepository } from '../repository/product.repository'
import { Product } from '../types/product.types'

export class ProductController {
  private repository: ProductRepository

  constructor() {
    this.repository = new ProductRepository()
  }

  post = async (req: Request, res: Response) => {
    const data: Product = req.body

    const save = await this.repository.createProduct(data)

    if (!save) throw new Error("Erro ao tantar salvar produto")

    return res.status(201).json(save)
  }

  getMany = async (req: Request, res: Response) => {
    return res.status(200).json(await this.repository.getProducts())
  }

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params
    return res.status(200).json(await this.repository.getProduct(id))
  }

  put = async (req: Request, res: Response) => {
    const { id } = req.params
    const data: Product = req.body

    delete data.id
    delete data.quantity

    const update = await this.repository.updateProduct(id, data)

    if (!update) throw new Error("Erro ao tantar atualizar produto")

    return res.status(200).json(update)
  }

  addProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const data: Product = req.body

    if (!data.quantity) throw new Error("necessario passar a quantidade de inserção");

    let productExists = await this.repository.getProduct(id)

    if (!productExists) throw new Error("Produto já existente")

    delete data.id

    const update = await this.repository.addProduct(id, data.quantity)

    if (!update) throw new Error("Erro ao tantar atualizar produto")

    return res.status(200).json(update)
  }

  subProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const data: Product = req.body

    if (!data.quantity) throw new Error("necessario passar a quantidade de inserção");

    let productExists = await this.repository.getProduct(id)

    if (!productExists) throw new Error("Produto já existente")

    delete data.id

    const update = await this.repository.subProduct(id, data.quantity)

    if (!update) throw new Error("Erro ao tantar atualizar produto")

    return res.status(200).json(update)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const remove = await this.repository.deleteProduct(id)

    if (!remove) throw new Error("Erro ao deletar")

    return res.status(200).json(remove)
  }
}