import { transactionsStore, type TransactionRecord } from '../data/transactionsStore.js'
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../validators/transactions.js'

export function listTransactions() {
  return transactionsStore
}

export function getTransactionById(id: string) {
  return transactionsStore.find((transaction) => transaction.id === id) ?? null
}

export function createTransaction(input: CreateTransactionInput) {
  const now = new Date().toISOString()

  const transaction: TransactionRecord = {
    id: `txn_${Date.now()}`,
    ...input,
    createdAt: now,
    updatedAt: now,
  }

  transactionsStore.unshift(transaction)
  return transaction
}

export function updateTransaction(id: string, input: UpdateTransactionInput) {
  const transaction = getTransactionById(id)

  if (!transaction) return null

  Object.assign(transaction, input, {
    updatedAt: new Date().toISOString(),
  })

  return transaction
}

export function deleteTransaction(id: string) {
  const index = transactionsStore.findIndex((transaction) => transaction.id === id)

  if (index === -1) return false

  transactionsStore.splice(index, 1)
  return true
}
