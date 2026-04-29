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

export const transactionsStore: TransactionRecord[] = []
