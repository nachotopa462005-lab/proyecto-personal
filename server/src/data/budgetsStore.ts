import { readJsonFile, writeJsonFile } from '../utils/fileStore.js'

export type BudgetRecord = {
  month: string
  amountMinor: number
  currency: 'EUR'
  updatedAt: string
}

export const budgetsStore: BudgetRecord[] = readJsonFile('budgets.json', [])

export function saveBudgets() {
  writeJsonFile('budgets.json', budgetsStore)
}
