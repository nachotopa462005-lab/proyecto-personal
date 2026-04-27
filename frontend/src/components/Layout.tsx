import { Link, Outlet } from 'react-router-dom'
import { useAppUi } from '../context'

const filterLabel: Record<'all' | 'income' | 'expense', string> = {
  all: 'Todos',
  income: 'Ingresos',
  expense: 'Gastos',
}

export function Layout() {
  const { transactionFilter } = useAppUi()

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="space-y-0.5">
            <Link to="/" className="text-base font-semibold tracking-tight text-zinc-50">
              Finanzas personales
            </Link>
            <p className="text-sm text-zinc-400">Control simple de ingresos y gastos</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 sm:block">
              Filtro actual: {filterLabel[transactionFilter]}
            </div>
            <nav className="flex items-center gap-4 text-sm text-zinc-300">
              <Link className="transition-colors hover:text-white" to="/">
                Resumen
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
