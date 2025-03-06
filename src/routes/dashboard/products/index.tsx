import { DataTable } from '@/modules/products/components/table/date-table'
import { columns, product } from '@/modules/products/components/table/columns'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMedicines } from '@/modules/products/services/medicine-api'
import { CreateProductDialog } from '@/modules/products/components/dialog/create-product-dialog'
import { useEffect, useState, useCallback } from 'react'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Plus, Sheet } from 'lucide-react'
import { set } from 'zod'
import { Input } from '@/components/ui/input'
import debounce from 'lodash/debounce'

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(0)

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

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 500),
    []
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value)
  }

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
          <DataTable columns={columns} data={data?.data} isLoading={isPending} />
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setPage(index + 1)} isActive={index + 1 === page}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>)
}