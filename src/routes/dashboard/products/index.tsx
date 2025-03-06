import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMedicines } from '@/modules/products/services/medicine-api'
import { useEffect } from 'react'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { Button } from '@/components/ui/button'
import { Plus, Sheet } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { useSearch } from '@/modules/core/hooks/use-search'
import { usePagination } from '@/modules/core/hooks/use-pagination'

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { handleSearchChange, search } = useSearch()
  const { setPage, totalPages, limit, page, setTotalPages } = usePagination()

  const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery<{
    data: product[],
    meta: IMetaDataFindAll
  }>({
    queryKey: ['medicines', page, search],
    queryFn: () => getMedicines(page, limit, search),
  })

  useEffect(() => {
    if (data?.meta) {
      setTotalPages(Math.ceil(data.meta.total / limit))
    }
  }, [data])



  return (
    <div className='flex-1 flex-col flex gap-4'>
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
      <Card className='border flex flex-col w-full flex-1 gap-4'>
        <CardHeader>
          <CardTitle>
            Productos
          </CardTitle>
          <CardDescription>
            Listado de productos
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex h-full flex-col gap-4'>

          <Input
            placeholder="Search"
            onChange={handleSearchChange}
            className="max-w-sm"

          />
          <DataTable columns={columns} data={data?.data || []} isLoading={isPending} />
          <PaginationButtons page={page} setPage={setPage} totalPages={totalPages} />
        </CardContent>
      </Card>
    </div>)
}