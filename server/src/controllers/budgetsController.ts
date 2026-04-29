import type { Request, Response } from 'express'
import { getBudgetByMonth, upsertBudget } from '../services/budgetsService.js'
import { parseBudgetQuery, parseUpsertBudget } from '../validators/budgets.js'

export function getBudgetController(req: Request, res: Response) {
  const parsed = parseBudgetQuery(req)

  if ('body' in parsed) {
    return res.status(parsed.status).json(parsed.body)
  }

  const budget = getBudgetByMonth(parsed.value.month)

  return res.status(200).json({
    budget,
  })
}

export function upsertBudgetController(req: Request<{ month: string }>, res: Response) {
  const parsed = parseUpsertBudget(req)

  if ('body' in parsed) {
    return res.status(parsed.status).json(parsed.body)
  }

  const budget = upsertBudget(
    parsed.value.month,
    parsed.value.amountMinor,
    parsed.value.currency,
  )

  return res.status(200).json({
    budget,
  })
}
