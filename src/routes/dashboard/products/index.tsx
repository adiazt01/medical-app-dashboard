import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getMedicines } from '@/modules/products/services/medicine-api'
import { CreateProductDialog } from '@/modules/products/components/dialog/create-product-dialog'
import { useEffect, useState } from 'react'
import { set } from 'zod'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Plus, Sheet } from 'lucide-react'


export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery<{
    data: product[],
    meta: IMetaDataFindAll
  }>({
    queryKey: ['medicines', page],
    queryFn: () => getMedicines(page, limit),
    placeholderData: keepPreviousData,
  })

  if (!data) {
    return <div>Loading...</div>
  }

  const totalPages = data.meta ? Math.ceil(data.meta.total / limit) : 0;



  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='flex justify-end gap-2 flex-row'>
        <Button variant="outline" >
          <Sheet />
          Exportar
          {/* TODO: Export to sheet of google */}
        </Button>
        <Button asChild>
          <Link to='/dashboard/products/new'>
          <Plus />
          Agregar producto
          </Link>
        </Button>
      </div>
      <Card className='w-full h-full'>
        <CardHeader>
          <CardTitle>
            Productos
          </CardTitle>
          <CardDescription>
            Listado de productos
          </CardDescription>
        </CardHeader>
        <CardContent className='flex h-full flex-col gap-4'>
          {data?.data && <DataTable columns={columns} data={data?.data} />}
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(page - 1)} />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setPage(index + 1)} isActive={index + 1 === page}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>)
}
