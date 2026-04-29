import { Router } from 'express'
import { listCategoriesController } from '../controllers/categoriesController.js'

export const categoriesRouter = Router()

categoriesRouter.get('/', listCategoriesController)
