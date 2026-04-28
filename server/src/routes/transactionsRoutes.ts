import { Router } from 'express'
import {
  createTransactionController,
  deleteTransactionController,
  getTransactionController,
  listTransactionsController,
  updateTransactionController,
} from '../controllers/transactionsController.js'

export const transactionsRouter = Router()

transactionsRouter.get('/', listTransactionsController)
transactionsRouter.get('/:id', getTransactionController)
transactionsRouter.post('/', createTransactionController)
transactionsRouter.patch('/:id', updateTransactionController)
transactionsRouter.delete('/:id', deleteTransactionController)
