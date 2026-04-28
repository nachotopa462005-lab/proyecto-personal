import { useCallback, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { useAppUi } from '../context'
import { formatMoney, useFinanceData } from '../hooks'

export function HomePage() {
  const { transactionFilter, setTransactionFilter } = useAppUi()
  const { transactions, loading, error, retry } = useFinanceData()

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

  useEffect(() => {
    const title = loading
      ? 'Cargando resumen | Finanzas personales'
      : error
        ? 'Error de carga | Finanzas personales'
        : `Balance ${formatMoney(totals.balance)} | Finanzas personales`

    document.title = title
  }, [error, loading, totals.balance])

  const handleShowAll = useCallback(() => setTransactionFilter('all'), [setTransactionFilter])
  const handleShowIncome = useCallback(() => setTransactionFilter('income'), [setTransactionFilter])
  const handleShowExpense = useCallback(() => setTransactionFilter('expense'), [setTransactionFilter])

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
        description="Vista general del balance, los ingresos y los gastos segun el filtro activo."
        actions={
          <Link to="/transactions">
            <Button>Ver movimientos</Button>
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
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
      </div>

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
              'Cargando movimientos desde la API...'
            ) : (
              <>
                El resumen esta mostrando <span className="font-medium text-zinc-100">
                  {filteredTransactions.length}
                </span>{' '}
                movimientos. Para ver el detalle completo y cargar nuevos datos, entra en
                la pagina de movimientos.
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
