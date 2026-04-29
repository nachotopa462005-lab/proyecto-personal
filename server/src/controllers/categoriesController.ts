import type { Request, Response } from 'express'
import { listCategories } from '../services/categoriesService.js'

export function listCategoriesController(_req: Request, res: Response) {
  res.status(200).json({
    items: listCategories(),
  })
}
