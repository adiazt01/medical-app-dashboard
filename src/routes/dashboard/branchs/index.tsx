import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { columns } from '@/modules/branchs/components/table/columns'
import { DataTable } from '@/modules/branchs/components/table/date-table'
import { IBranch } from '@/modules/branchs/interface/branch-api'
import { getBranchs } from '@/modules/branchs/services/branchs-api'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { debounce } from 'lodash'
import { Sheet } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/branchs/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState(0)

    const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery<{
        data: IBranch[],
        meta: IMetaDataFindAll
    }>({
        queryKey: ['users', page, search],
        queryFn: () => getBranchs(page, limit, search),
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
                    {/* <Link to='/dashboard/products/new'>
              <Plus />
              Agregar producto
            </Link> */}
                </Button>
            </div>
            <Card className='border flex flex-col w-full flex-1 gap-4'>
                <CardHeader>
                    <CardTitle>
                        Sucursales
                    </CardTitle>
                    <CardDescription>
                        Listado de surcursales
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
