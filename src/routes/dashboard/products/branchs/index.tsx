import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { usePagination } from '@/modules/core/hooks/use-pagination'
import { useSearch } from '@/modules/core/hooks/use-search'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { columns, product } from '@/modules/products/components/table/branchs-products/columns'
import { DataTable } from '@/modules/products/components/table/branchs-products/date-table'
import { getMedicinesByBranchs } from '@/modules/products/services/branchs-medicines-api'
import { getMedicines } from '@/modules/products/services/medicine-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Sheet } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard/products/branchs/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { handleSearchChange, search } = useSearch()
    const { setPage, totalPages, limit, page, setTotalPages } = usePagination()
    
    const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery<{
        data: product[],
        meta: IMetaDataFindAll
    }>({
        queryKey: ['products-branchs', page, search],
        queryFn: () => getMedicinesByBranchs(page, limit, search, ),
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