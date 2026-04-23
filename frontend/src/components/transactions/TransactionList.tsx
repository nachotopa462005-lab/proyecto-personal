import type { Category, Transaction } from '../../types/finance'
import { TransactionCard } from './TransactionCard'

export type TransactionListProps = {
  items: Transaction[]
  categoriesById: Record<string, Category>
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
}

export function TransactionList({
  items,
  categoriesById,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/30 p-6 text-sm text-zinc-300">
        No hay movimientos todavía.
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <TransactionCard
          key={t.id}
          transaction={t}
          category={categoriesById[t.categoryId]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

