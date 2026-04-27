import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type TransactionFilter = 'all' | 'income' | 'expense'

export type AppUiContextValue = {
  createModalOpen: boolean
  transactionFilter: TransactionFilter
  openCreateModal: () => void
  closeCreateModal: () => void
  setTransactionFilter: (filter: TransactionFilter) => void
}

const AppUiContext = createContext<AppUiContextValue | null>(null)

export type AppUiProviderProps = {
  children: ReactNode
}

export function AppUiProvider({ children }: AppUiProviderProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [transactionFilter, setTransactionFilter] =
    useState<TransactionFilter>('all')

  const openCreateModal = useCallback(() => {
    setCreateModalOpen(true)
  }, [])

  const closeCreateModal = useCallback(() => {
    setCreateModalOpen(false)
  }, [])

  const value = useMemo<AppUiContextValue>(() => {
    return {
      createModalOpen,
      transactionFilter,
      openCreateModal,
      closeCreateModal,
      setTransactionFilter,
    }
  }, [
    createModalOpen,
    transactionFilter,
    openCreateModal,
    closeCreateModal,
    setTransactionFilter,
  ])

  return <AppUiContext.Provider value={value}>{children}</AppUiContext.Provider>
}

export function useAppUi() {
  const context = useContext(AppUiContext)

  if (!context) {
    throw new Error('useAppUi must be used inside AppUiProvider')
  }

  return context
}
