import { Router } from 'express'
import { ProductRouter } from './product.routes'

const router = Router()

router.use(ProductRouter)

export { router }
