import { Router } from 'express'
import { getBudgetController, upsertBudgetController } from '../controllers/budgetsController.js'

export const budgetsRouter = Router()

budgetsRouter.get('/', getBudgetController)
budgetsRouter.put('/:month', upsertBudgetController)
