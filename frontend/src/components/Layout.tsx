import { NavLink, Outlet } from 'react-router-dom'
import { useAppUi } from '../context'

const filterLabel: Record<'all' | 'income' | 'expense', string> = {
  all: 'Todos',
  income: 'Ingresos',
  expense: 'Gastos',
}

function navClassName(isActive: boolean) {
  return [
    'rounded-lg px-3 py-2 transition-colors',
    isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/5',
  ].join(' ')
}

export function Layout() {
  const { transactionFilter } = useAppUi()

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <div className="text-base font-semibold tracking-tight text-zinc-50">
              Finanzas personales
            </div>
            <p className="text-sm text-zinc-400">Control simple de ingresos y gastos</p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="hidden rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 sm:block">
              Filtro actual: {filterLabel[transactionFilter]}
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <NavLink to="/" end className={({ isActive }) => navClassName(isActive)}>
                Resumen
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) => navClassName(isActive)}
              >
                Movimientos
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) => navClassName(isActive)}
              >
                Ajustes
              </NavLink>
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
