import { OrderController } from '../controller/orders.controller'
import { Router } from 'express'

const controller = new OrderController()

const router = Router()

router.get('/get-orders', controller.getMany)
router.get('/get-order/:id', controller.getOne)
router.post('/create-order', controller.post)
router.put('/update-order/:id', controller.put)
router.delete('/delete-order/:id', controller.delete)

export { router as OrderRouter }