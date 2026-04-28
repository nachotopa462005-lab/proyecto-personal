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

export const transactionsStore: TransactionRecord[] = [
  {
    id: 'txn_1',
    type: 'expense',
    amountMinor: 125000,
    currency: 'EUR',
    categoryId: 'cat_food',
    date: '2026-04-23',
    note: 'Supermercado',
    createdAt: '2026-04-23T10:00:00.000Z',
    updatedAt: '2026-04-23T10:00:00.000Z',
  },
  {
    id: 'txn_2',
    type: 'income',
    amountMinor: 120000000,
    currency: 'EUR',
    categoryId: 'cat_salary',
    date: '2026-04-01',
    note: 'Abril',
    createdAt: '2026-04-01T09:00:00.000Z',
    updatedAt: '2026-04-01T09:00:00.000Z',
  },
]
