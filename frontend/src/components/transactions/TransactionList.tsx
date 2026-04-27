import type { Category, Transaction } from '../../types/finance'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import { TransactionCard } from './TransactionCard'

export type TransactionListProps = {
  items: Transaction[]
  categoriesById: Record<string, Category>
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
  onCreate?: () => void
}

export function TransactionList({
  items,
  categoriesById,
  onEdit,
  onDelete,
  onCreate,
}: TransactionListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No hay movimientos todavia"
        description="Cuando cargues ingresos o gastos, apareceran aca con su categoria y su importe."
        action={
          onCreate ? (
            <Button type="button" variant="secondary" onClick={onCreate}>
              Cargar primer movimiento
            </Button>
          ) : null
        }
      />
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
