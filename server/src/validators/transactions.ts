import type { Request } from 'express'
import { categoriesStore } from '../data/categoriesStore.js'
import type { TransactionType } from '../data/transactionsStore.js'
import { badRequest, isValidDate, type ValidationResult } from './shared.js'

export type CreateTransactionInput = {
  type: TransactionType
  amountMinor: number
  currency: 'EUR'
  categoryId: string
  date: string
  note?: string
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>

function isTransactionType(value: unknown): value is TransactionType {
  return value === 'income' || value === 'expense'
}

export function parseCreateTransaction(
  req: Request,
): ValidationResult<CreateTransactionInput> {
  const body = req.body as Record<string, unknown>

  if (!isTransactionType(body.type)) return badRequest('type must be income or expense')
  if (!Number.isInteger(body.amountMinor) || Number(body.amountMinor) <= 0) {
    return badRequest('amountMinor must be a positive integer')
  }
  if (body.currency !== 'EUR') return badRequest('currency must be EUR')
  if (typeof body.categoryId !== 'string' || !body.categoryId.trim()) {
    return badRequest('categoryId is required')
  }
  const categoryId = body.categoryId.trim()
  if (!categoriesStore.some((category) => category.id === categoryId)) {
    return badRequest('categoryId must reference an existing category')
  }
  if (!isValidDate(body.date)) return badRequest('date must have format YYYY-MM-DD')
  if (body.note !== undefined && typeof body.note !== 'string') {
    return badRequest('note must be a string')
  }

  return {
    status: 200,
    value: {
      type: body.type,
      amountMinor: Number(body.amountMinor),
      currency: 'EUR' as const,
      categoryId,
      date: body.date,
      note: typeof body.note === 'string' && body.note.trim() ? body.note.trim() : undefined,
    },
  }
}

export function parseUpdateTransaction(
  req: Request,
): ValidationResult<UpdateTransactionInput> {
  const body = req.body as Record<string, unknown>
  const next: UpdateTransactionInput = {}

  if (body.type !== undefined) {
    if (!isTransactionType(body.type)) return badRequest('type must be income or expense')
    next.type = body.type
  }

  if (body.amountMinor !== undefined) {
    if (!Number.isInteger(body.amountMinor) || Number(body.amountMinor) <= 0) {
      return badRequest('amountMinor must be a positive integer')
    }
    next.amountMinor = Number(body.amountMinor)
  }

  if (body.currency !== undefined) {
    if (body.currency !== 'EUR') return badRequest('currency must be EUR')
    next.currency = 'EUR'
  }

  if (body.categoryId !== undefined) {
    if (typeof body.categoryId !== 'string' || !body.categoryId.trim()) {
      return badRequest('categoryId must be a non-empty string')
    }
    const categoryId = body.categoryId.trim()
    if (!categoriesStore.some((category) => category.id === categoryId)) {
      return badRequest('categoryId must reference an existing category')
    }
    next.categoryId = categoryId
  }

  if (body.date !== undefined) {
    if (!isValidDate(body.date)) return badRequest('date must have format YYYY-MM-DD')
    next.date = body.date
  }

  if (body.note !== undefined) {
    if (typeof body.note !== 'string') return badRequest('note must be a string')
    next.note = body.note.trim() !== '' ? body.note.trim() : undefined
  }

  if (Object.keys(next).length === 0) {
    return badRequest('request body must include at least one field to update')
  }

  return {
    status: 200,
    value: next,
  }
}
