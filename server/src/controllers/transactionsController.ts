import type { Request, Response } from 'express'
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
} from '../services/transactionsService.js'
import {
  parseCreateTransaction,
  parseUpdateTransaction,
} from '../validators/transactions.js'

export function healthController(_req: Request, res: Response) {
  res.status(200).json({
    status: 'ok',
    time: new Date().toISOString(),
  })
}

export function listTransactionsController(_req: Request, res: Response) {
  res.status(200).json({
    items: listTransactions(),
  })
}

export function getTransactionController(req: Request<{ id: string }>, res: Response) {
  const transaction = getTransactionById(req.params.id)

  if (!transaction) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Transaction not found',
      },
    })
  }

  return res.status(200).json({ transaction })
}

export function createTransactionController(req: Request, res: Response) {
  const parsed = parseCreateTransaction(req)

  if ('body' in parsed) {
    return res.status(parsed.status).json(parsed.body)
  }

  const transaction = createTransaction(parsed.value)
  return res.status(201).json({ transaction })
}

export function updateTransactionController(req: Request<{ id: string }>, res: Response) {
  const parsed = parseUpdateTransaction(req)

  if ('body' in parsed) {
    return res.status(parsed.status).json(parsed.body)
  }

  const transaction = updateTransaction(req.params.id, parsed.value)

  if (!transaction) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Transaction not found',
      },
    })
  }

  return res.status(200).json({ transaction })
}

export function deleteTransactionController(req: Request<{ id: string }>, res: Response) {
  const deleted = deleteTransaction(req.params.id)

  if (!deleted) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Transaction not found',
      },
    })
  }

  return res.status(204).send()
}
