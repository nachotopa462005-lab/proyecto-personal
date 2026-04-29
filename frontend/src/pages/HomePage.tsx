import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Field'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { useAppUi } from '../context'
import { formatMoney, useFinanceData } from '../hooks'

function parseAmountToMinorUnits(rawValue: string) {
  const sanitized = rawValue.trim().replace(/\s/g, '')

  if (!sanitized) return null

  const lastComma = sanitized.lastIndexOf(',')
  const lastDot = sanitized.lastIndexOf('.')
  const decimalIndex = Math.max(lastComma, lastDot)

  if (decimalIndex === -1) {
    const integerOnly = sanitized.replace(/[^\d]/g, '')
    if (!integerOnly) return null
    return Number(integerOnly) * 100
  }

  const integerPart = sanitized.slice(0, decimalIndex).replace(/[^\d]/g, '')
  const decimalPart = sanitized.slice(decimalIndex + 1).replace(/[^\d]/g, '')

  if (!integerPart && !decimalPart) return null

  const normalizedInteger = integerPart || '0'
  const normalizedDecimals = `${decimalPart}00`.slice(0, 2)

  return Number(normalizedInteger) * 100 + Number(normalizedDecimals)
}

export function HomePage() {
  const { transactionFilter, setTransactionFilter } = useAppUi()
  const {
    transactions,
    budget,
    currentMonth,
    loading,
    error,
    retry,
    saveBudget,
  } = useFinanceData()
  const [budgetInput, setBudgetInput] = useState('')
  const [budgetMessage, setBudgetMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!budget) {
      setBudgetInput('')
      return
    }

    setBudgetInput((budget.amountMinor / 100).toFixed(2).replace('.', ','))
  }, [budget])

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === 'all') return transactions
    return transactions.filter((transaction) => transaction.type === transactionFilter)
  }, [transactions, transactionFilter])

  const totals = useMemo(() => {
    let income = 0
    let expense = 0

    for (const t of filteredTransactions) {
      if (t.type === 'income') income += t.amountMinor
      else expense += t.amountMinor
    }

    return { income, expense, balance: income - expense }
  }, [filteredTransactions])

  const monthlyExpense = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type !== 'expense') return total
      if (!transaction.date.startsWith(currentMonth)) return total
      return total + transaction.amountMinor
    }, 0)
  }, [currentMonth, transactions])

  const remainingBudget = useMemo(() => {
    if (!budget) return null
    return budget.amountMinor - monthlyExpense
  }, [budget, monthlyExpense])

  useEffect(() => {
    const title = loading
      ? 'Cargando resumen | Finanzas personales'
      : error
        ? 'Error de carga | Finanzas personales'
        : `Balance ${formatMoney(totals.balance)} | Finanzas personales`

    document.title = title
  }, [error, loading, totals.balance])

  useEffect(() => {
    if (!budgetMessage) return

    const timeoutId = window.setTimeout(() => {
      setBudgetMessage(null)
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [budgetMessage])

  const handleShowAll = useCallback(() => setTransactionFilter('all'), [setTransactionFilter])
  const handleShowIncome = useCallback(() => setTransactionFilter('income'), [setTransactionFilter])
  const handleShowExpense = useCallback(() => setTransactionFilter('expense'), [setTransactionFilter])

  const handleSaveBudget = useCallback(() => {
    void (async () => {
      const amountMinor = parseAmountToMinorUnits(budgetInput)

      if (amountMinor === null || amountMinor < 0) {
        setBudgetMessage('Escribe un presupuesto valido. Puedes usar coma o punto decimal.')
        return
      }

      try {
        await saveBudget(amountMinor)
        setBudgetMessage('Presupuesto mensual guardado correctamente.')
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'No se pudo guardar el presupuesto.'
        setBudgetMessage(message)
      }
    })()
  }, [budgetInput, saveBudget])

  const filterActions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={transactionFilter === 'all' ? 'primary' : 'ghost'}
        size="sm"
        onClick={handleShowAll}
      >
        Todos
      </Button>
      <Button
        variant={transactionFilter === 'income' ? 'primary' : 'ghost'}
        size="sm"
        onClick={handleShowIncome}
      >
        Ingresos
      </Button>
      <Button
        variant={transactionFilter === 'expense' ? 'primary' : 'ghost'}
        size="sm"
        onClick={handleShowExpense}
      >
        Gastos
      </Button>
    </div>
  )

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Resumen mensual"
        description="Vista general del balance, los ingresos, los gastos y el presupuesto del mes."
        actions={
          <Link to="/transactions">
            <Button>Ver movimientos</Button>
          </Link>
        }
      />

      <div className="grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
        <StatCard
          title="Ingresos"
          description="Total del periodo visible"
          value={loading ? 'Cargando...' : formatMoney(totals.income)}
          tone="positive"
        />
        <StatCard
          title="Gastos"
          description="Total del periodo visible"
          value={loading ? 'Cargando...' : formatMoney(totals.expense)}
          tone="negative"
        />
        <StatCard
          title="Balance"
          description="Ingresos menos gastos"
          value={loading ? 'Cargando...' : formatMoney(totals.balance)}
        />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Presupuesto mensual</CardTitle>
              <CardDescription>Mes activo: {currentMonth}</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="text-2xl font-semibold tabular-nums text-zinc-50">
              {loading
                ? 'Cargando...'
                : remainingBudget === null
                  ? 'Sin definir'
                  : formatMoney(remainingBudget)}
            </div>
            <div className="text-sm text-zinc-400">
              {budget
                ? `Gastos del mes: ${formatMoney(monthlyExpense)}`
                : 'Todavia no has definido un presupuesto para este mes.'}
            </div>
            <div className="flex gap-2">
              <Input
                inputMode="decimal"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder="0,00"
              />
              <Button type="button" onClick={handleSaveBudget}>
                Guardar
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {budgetMessage ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {budgetMessage}
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
            Filtro del dashboard
          </h2>
          {filterActions}
        </div>

        {error ? (
          <EmptyState
            title="No se pudo cargar el resumen"
            description={error}
            action={
              <Button type="button" variant="secondary" onClick={() => void retry()}>
                Reintentar
              </Button>
            }
          />
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-300">
            {loading ? (
              'Cargando datos desde la API...'
            ) : (
              <>
                El resumen esta mostrando <span className="font-medium text-zinc-100">
                  {filteredTransactions.length}
                </span>{' '}
                movimientos. Para cargar ingresos y gastos entra en la pagina de
                movimientos.
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
