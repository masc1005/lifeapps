import { ProductController } from '../controller/product.controller'
import { Router } from 'express'

const controller = new ProductController()

const router = Router()

router.get('/get-products', controller.getMany)
router.get('/get-product/:id', controller.getOne)
router.post('/create-product', controller.post)
router.put('/update-product/:id', controller.put)
router.delete('/delete-product/:id', controller.delete)

router.put('/add-product/:id', controller.addProduct)
router.put('/sub-product/:id', controller.subProduct)

export { router as ProductRouter }