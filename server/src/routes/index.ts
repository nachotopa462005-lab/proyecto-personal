import { Router } from 'express'
import { healthController } from '../controllers/transactionsController.js'
import { budgetsRouter } from './budgetsRoutes.js'
import { categoriesRouter } from './categoriesRoutes.js'
import { transactionsRouter } from './transactionsRoutes.js'

export const apiRouter = Router()

apiRouter.get('/health', healthController)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/budgets', budgetsRouter)
apiRouter.use('/transactions', transactionsRouter)
