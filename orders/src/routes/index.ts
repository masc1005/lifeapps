import { Router } from 'express'
import { OrderRouter } from './order.routes'

const router = Router()

router.use(OrderRouter)

export { router }
