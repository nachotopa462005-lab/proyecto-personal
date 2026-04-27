import { useMemo, useState } from 'react'
import type { Category, TransactionDraft, TransactionType } from '../../types/finance'
import { Button } from '../ui/Button'
import { Field, Input, Select, Textarea } from '../ui/Field'

export type TransactionFormValues = TransactionDraft

export type TransactionFormProps = {
  categories: Category[]
  initialValues?: Partial<TransactionFormValues>
  submitLabel?: string
  onSubmit: (values: TransactionFormValues) => void
  onCancel?: () => void
}

function todayYYYYMMDD() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function TransactionForm({
  categories,
  initialValues,
  submitLabel = 'Guardar',
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const defaultType: TransactionType = initialValues?.type ?? 'expense'
  const defaultCurrency = initialValues?.currency ?? 'EUR'

  const allowedCategories = useMemo(
    () => categories.filter((c) => c.type === defaultType),
    [categories, defaultType],
  )

  const [type, setType] = useState<TransactionType>(defaultType)
  const [amountMinor, setAmountMinor] = useState<number>(initialValues?.amountMinor ?? 0)
  const [categoryId, setCategoryId] = useState<string>(
    initialValues?.categoryId ?? allowedCategories[0]?.id ?? '',
  )
  const [date, setDate] = useState<string>(initialValues?.date ?? todayYYYYMMDD())
  const [note, setNote] = useState<string>(initialValues?.note ?? '')
  const [error, setError] = useState<string | null>(null)

  const categoriesForType = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!categoryId) return setError('Elegí una categoría.')
    if (!Number.isInteger(amountMinor) || amountMinor <= 0)
      return setError('El monto debe ser un entero positivo (en centimos).')
    if (!date) return setError('Elegí una fecha.')

    onSubmit({
      type,
      amountMinor,
      currency: defaultCurrency,
      categoryId,
      date,
      note: note.trim() ? note.trim() : undefined,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tipo">
          <Select
            value={type}
            onChange={(e) => {
              const next = e.target.value as TransactionType
              setType(next)
              const nextCategories = categories.filter((c) => c.type === next)
              setCategoryId(nextCategories[0]?.id ?? '')
            }}
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </Select>
        </Field>

        <Field label="Categoría">
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categoriesForType.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Monto (centimos)" hint="Ej: 125000 = 1.250,00 EUR">
          <Input
            inputMode="numeric"
            value={String(amountMinor)}
            onChange={(e) => setAmountMinor(Number(e.target.value))}
            placeholder="125000"
          />
        </Field>

        <Field label="Fecha">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
      </div>

      <Field label="Nota (opcional)">
        <Textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ej: Supermercado, taxi, etc."
        />
      </Field>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
