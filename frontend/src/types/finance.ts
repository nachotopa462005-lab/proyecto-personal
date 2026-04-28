export type Money = {
  amountMinor: number
  currency: 'EUR'
}

export type Category = {
  id: string
  name: string
  type: 'expense' | 'income'
  color?: string
}

export type TransactionType = 'expense' | 'income'

export type Transaction = {
  id: string
  type: TransactionType
  amountMinor: number
  currency: Money['currency']
  categoryId: string
  date: string // YYYY-MM-DD
  note?: string
  createdAt: string
  updatedAt: string
}

export type TransactionDraft = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string
}
