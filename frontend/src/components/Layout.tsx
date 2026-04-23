import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-semibold tracking-tight">
            Finanzas
          </Link>
          <nav className="text-sm text-zinc-300">
            <a
              className="hover:text-white"
              href="https://vite.dev/"
              target="_blank"
              rel="noreferrer"
            >
              Vite
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}

