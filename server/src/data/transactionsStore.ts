export type TransactionType = 'income' | 'expense'

export type TransactionRecord = {
  id: string
  type: TransactionType
  amountMinor: number
  currency: 'EUR'
  categoryId: string
  date: string
  note?: string
  createdAt: string
  updatedAt: string
}

import { readJsonFile } from '../utils/fileStore.js'

export const transactionsStore: TransactionRecord[] = readJsonFile('transactions.json', [])
