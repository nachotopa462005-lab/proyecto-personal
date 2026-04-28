import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { Modal } from '../components/ui/Modal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useAppUi } from '../context'
import { useFinanceData } from '../hooks'
import type { Transaction, TransactionDraft } from '../types/finance'

export function TransactionsPage() {
  const {
    createModalOpen,
    transactionFilter,
    openCreateModal,
    closeCreateModal,
    setTransactionFilter,
  } = useAppUi()
  const {
    categories,
    categoriesById,
    transactions,
    loading,
    error,
    retry,
    createTransaction,
    deleteTransaction,
  } = useFinanceData()
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === 'all') return transactions
    return transactions.filter((transaction) => transaction.type === transactionFilter)
  }, [transactions, transactionFilter])

  const handleCreate = useCallback((values: TransactionDraft) => {
    void (async () => {
      try {
        await createTransaction(values)
        closeCreateModal()
        setFeedbackMessage('Movimiento guardado correctamente.')
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'No se pudo guardar el movimiento.'
        setFeedbackMessage(message)
      }
    })()
  }, [closeCreateModal, createTransaction])

  const handleDelete = useCallback((transaction: Transaction) => {
    void (async () => {
      try {
        await deleteTransaction(transaction)
        setFeedbackMessage('Movimiento eliminado correctamente.')
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'No se pudo eliminar el movimiento.'
        setFeedbackMessage(message)
      }
    })()
  }, [deleteTransaction])

  useEffect(() => {
    if (!feedbackMessage) return

    const timeoutId = window.setTimeout(() => {
      setFeedbackMessage(null)
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [feedbackMessage])

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
        title="Movimientos"
        description="Aqui puedes ver, filtrar, crear y borrar ingresos o gastos."
        actions={<Button onClick={openCreateModal}>Nuevo movimiento</Button>}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-400">
          {filteredTransactions.length} movimientos visibles
        </div>
        {filterActions}
      </div>

      {feedbackMessage ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {feedbackMessage}
        </div>
      ) : null}

      {error ? (
        <EmptyState
          title="No se pudieron cargar los movimientos"
          description={error}
          action={
            <Button type="button" variant="secondary" onClick={() => void retry()}>
              Reintentar
            </Button>
          }
        />
      ) : loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm text-zinc-300">
          Cargando movimientos desde la API...
        </div>
      ) : (
        <TransactionList
          items={filteredTransactions}
          categoriesById={categoriesById}
          onDelete={handleDelete}
          onCreate={openCreateModal}
        />
      )}

      <Modal
        open={createModalOpen}
        title="Nuevo movimiento"
        description="Carga un gasto o un ingreso y guardalo con su categoria y fecha."
        onClose={closeCreateModal}
        footer={null}
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleCreate}
          onCancel={closeCreateModal}
        />
      </Modal>
    </section>
  )
}
