import { Router } from 'express'
import { healthController } from '../controllers/transactionsController.js'
import { transactionsRouter } from './transactionsRoutes.js'

export const apiRouter = Router()

apiRouter.get('/health', healthController)
apiRouter.use('/transactions', transactionsRouter)
