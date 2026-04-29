export type BudgetRecord = {
  month: string
  amountMinor: number
  currency: 'EUR'
  updatedAt: string
}

export const budgetsStore: BudgetRecord[] = []
