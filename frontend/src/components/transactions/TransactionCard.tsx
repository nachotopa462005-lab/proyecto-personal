import type { Category, Transaction } from '../../types/finance'
import { Card, CardBody, CardHeader, CardTitle } from '../ui/Card'

export type TransactionCardProps = {
  transaction: Transaction
  category?: Category
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
}

function formatMoney(amountMinor: number, currency: string) {
  const amount = amountMinor / 100
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function TransactionCard({
  transaction,
  category,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isExpense = transaction.type === 'expense'
  const title = category?.name ?? 'Sin categoría'
  const subtitle = transaction.note?.trim() ? transaction.note : transaction.date

  return (
    <Card className="transition-colors hover:border-zinc-700">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <span
              className="inline-flex h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: category?.color ?? '#3f3f46' }}
              aria-hidden="true"
            />
            {title}
          </CardTitle>
          <div className="mt-1 text-sm text-zinc-400">{subtitle}</div>
        </div>
        <div className="text-right">
          <div
            className={[
              'text-sm font-semibold tabular-nums',
              isExpense ? 'text-red-200' : 'text-emerald-200',
            ].join(' ')}
          >
            {isExpense ? '-' : '+'}
            {formatMoney(transaction.amountMinor, transaction.currency)}
          </div>
          <div className="mt-1 text-xs text-zinc-500">{transaction.date}</div>
        </div>
      </CardHeader>

      {(onEdit || onDelete) && (
        <CardBody className="pt-2">
          <div className="flex items-center justify-end gap-2">
            {onEdit ? (
              <button
                type="button"
                className="text-sm text-zinc-300 hover:text-white"
                onClick={() => onEdit(transaction)}
              >
                Editar
              </button>
            ) : null}
            {onDelete ? (
              <button
                type="button"
                className="text-sm text-red-200 hover:text-red-100"
                onClick={() => onDelete(transaction)}
              >
                Eliminar
              </button>
            ) : null}
          </div>
        </CardBody>
      )}
    </Card>
  )
}

