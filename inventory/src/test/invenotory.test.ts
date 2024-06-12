import { ProductRepository } from '../repository/product.repository'
import { Product } from '../types/product.types'

const data: Product = {
    nome: 'TestSave',
    description: 'test to save product',
    price: 10,
    quantity: 100000,
}

let saved: Product

describe('test product post', () => {
    const repository = new ProductRepository()

    it('should create a new product', async () => {
        saved = await repository.createProduct(data)

        expect(saved).toBeDefined()
        expect(saved).toMatchObject({
            id: expect.any(String),
            nome: 'TestSave',
            description: 'test to save product',
            price: 10,
            quantity: 100000,
        })
    })


    it('should not create a new product', async () => {
        let notSaved = await repository.createProduct(null)

        expect(notSaved).toBeUndefined()
        expect(notSaved).toEqual(undefined)
    })
})
