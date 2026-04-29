import { budgetsStore, type BudgetRecord } from '../data/budgetsStore.js'

export function getBudgetByMonth(month: string) {
  return budgetsStore.find((budget) => budget.month === month) ?? null
}

export function upsertBudget(month: string, amountMinor: number, currency: 'EUR') {
  const existing = getBudgetByMonth(month)

  if (existing) {
    existing.amountMinor = amountMinor
    existing.currency = currency
    existing.updatedAt = new Date().toISOString()
    return existing
  }

  const budget: BudgetRecord = {
    month,
    amountMinor,
    currency,
    updatedAt: new Date().toISOString(),
  }

  budgetsStore.push(budget)
  return budget
}
