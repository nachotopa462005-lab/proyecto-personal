export function HomePage() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight">
        Gestor de finanzas personales
      </h1>
      <p className="max-w-prose text-zinc-300">
        Base del frontend creada con Vite + React + TypeScript, Tailwind y React
        Router. A partir de acá vamos a ir agregando features iterativamente.
      </p>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-200">
        Próximo paso sugerido: modelar tipos y flujos para ingresos / gastos.
      </div>
    </section>
  )
}

