import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'

export function SettingsPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Ajustes"
        description="Espacio simple para mostrar preferencias generales de la aplicacion."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Moneda</CardTitle>
              <CardDescription>Configuracion actual de la aplicacion</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 text-sm text-zinc-300">
            <p>La aplicacion trabaja solo con euros por ahora.</p>
            <p className="text-zinc-400">Codigo de moneda activo: EUR.</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Backend y API</CardTitle>
              <CardDescription>Fuente de verdad de la aplicacion</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 text-sm text-zinc-300">
            <p>Los movimientos y el presupuesto mensual se guardan en el backend.</p>
            <p className="text-zinc-400">
              La interfaz consulta la API para cargar y actualizar los datos reales.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
