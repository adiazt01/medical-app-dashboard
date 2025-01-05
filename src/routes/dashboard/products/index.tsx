import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMedicines } from '@/modules/products/services/medicine-api'

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useQuery<product[]>({
    queryKey: ['medicines'],
    queryFn: getMedicines,
  })

  return (
    <div className='flex flex-col gap-8'>
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
          {query?.data && <DataTable columns={columns} data={query.data} />}
        </CardContent>
      </Card>
    </div>)
}
