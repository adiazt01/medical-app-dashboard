import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { IMetaDataFindAll } from '@/modules/core/interface/meta-interface'
import { Role } from '@/modules/enums/role'
import { columns } from '@/modules/users/components/table/columns'
import { DataTable } from '@/modules/users/components/table/date-table'
import { IUserApi } from '@/modules/users/interface/user-api'
import { getUsers } from '@/modules/users/services/users-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { debounce } from 'lodash'
import { Sheet } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [role, setRole] = useState(Role.USER)

  const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery<{
    data: IUserApi[],
    meta: IMetaDataFindAll
  }>({
    queryKey: ['users', page, search, role],
    queryFn: () => getUsers(page, limit, search, role),
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
          <Select onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger className="max-w-sm mr-auto">
              <SelectValue placeholder="Selecciona un rol"/>
            </SelectTrigger>
            <SelectContent >
              <SelectGroup>
                <SelectLabel>
                  Roles
                </SelectLabel>
                <SelectItem value="USER">
                  Usuario
                </SelectItem>
                <SelectItem value="EMPLOYEE">
                  Trabajador
                </SelectItem>
                <SelectItem value="MODERATOR">
                  Administrador
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <DataTable columns={columns} data={data?.data || []} isLoading={isPending} />
          <PaginationButtons page={page} setPage={setPage} totalPages={totalPages} />
        </CardContent>
      </Card>
    </div>)
}
