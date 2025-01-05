import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMedicines } from '@/modules/products/services/medicine-api'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProductDialog } from '@/modules/products/components/dialog/create-product-dialog'


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
          <CardTitle>Productos</CardTitle>
          <CardDescription>Administra tus productos</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProductDialog />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Listado de productos</h3>
        </CardHeader>
        <CardContent>
          {query?.data && <DataTable columns={columns} data={query.data} />}
        </CardContent>
      </Card>
    </div>)
}
