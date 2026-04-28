import type { Request } from 'express'
import type { TransactionType } from '../data/transactionsStore.js'

export type CreateTransactionInput = {
  type: TransactionType
  amountMinor: number
  currency: 'EUR'
  categoryId: string
  date: string
  note?: string
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>

type ValidationError = {
  status: 400
  body: {
    error: {
      code: 'VALIDATION_ERROR'
      message: string
    }
  }
}

type ValidationSuccess<T> = {
  status: 200
  value: T
}

function isTransactionType(value: unknown): value is TransactionType {
  return value === 'income' || value === 'expense'
}

function isValidDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function badRequest(message: string): ValidationError {
  return {
    status: 400,
    body: {
      error: {
        code: 'VALIDATION_ERROR',
        message,
      },
    },
  }
}

export function parseCreateTransaction(
  req: Request,
): ValidationError | ValidationSuccess<CreateTransactionInput> {
  const body = req.body as Record<string, unknown>

  if (!isTransactionType(body.type)) return badRequest('type must be income or expense')
  if (!Number.isInteger(body.amountMinor) || Number(body.amountMinor) <= 0) {
    return badRequest('amountMinor must be a positive integer')
  }
  if (body.currency !== 'EUR') return badRequest('currency must be EUR')
  if (typeof body.categoryId !== 'string' || !body.categoryId.trim()) {
    return badRequest('categoryId is required')
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
      categoryId: body.categoryId.trim(),
      date: body.date,
      note: typeof body.note === 'string' && body.note.trim() ? body.note.trim() : undefined,
    },
  }
}

export function parseUpdateTransaction(
  req: Request,
): ValidationError | ValidationSuccess<UpdateTransactionInput> {
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
    next.categoryId = body.categoryId.trim()
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
