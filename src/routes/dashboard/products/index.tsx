import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Search } from 'lucide-react'

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
})

const data: product[] = [
  { id: 1, name: 'Producto 1', price: 100, stock: 10 },
  { id: 2, name: 'Producto 2', price: 200, stock: 20 },
  { id: 3, name: 'Producto 3', price: 300, stock: 30 },
  { id: 4, name: 'Producto 4', price: 400, stock: 40 },
]

function RouteComponent() {
  return (<div className='flex flex-col gap-8'>
    <Card>
      <CardHeader>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Administracion de productos
        </h2>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>
        <CardDescription>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Listado de productos</h3>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  </div>)
}
