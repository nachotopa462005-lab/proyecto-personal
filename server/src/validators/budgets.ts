import type { Request } from 'express'
import { badRequest, isValidMonth, type ValidationResult } from './shared.js'

export type UpsertBudgetInput = {
  month: string
  amountMinor: number
  currency: 'EUR'
}

export function parseBudgetQuery(req: Request): ValidationResult<{ month: string }> {
  const { month } = req.query

  if (!isValidMonth(month)) {
    return badRequest('month query must have format YYYY-MM')
  }

  return {
    status: 200,
    value: { month },
  }
}

export function parseUpsertBudget(
  req: Request<{ month: string }>,
): ValidationResult<UpsertBudgetInput> {
  const { month } = req.params
  const body = req.body as Record<string, unknown>

  if (!isValidMonth(month)) {
    return badRequest('month param must have format YYYY-MM')
  }
  if (!Number.isInteger(body.amountMinor) || Number(body.amountMinor) < 0) {
    return badRequest('amountMinor must be a non-negative integer')
  }
  if (body.currency !== 'EUR') {
    return badRequest('currency must be EUR')
  }

  return {
    status: 200,
    value: {
      month,
      amountMinor: Number(body.amountMinor),
      currency: 'EUR',
    },
  }
}
