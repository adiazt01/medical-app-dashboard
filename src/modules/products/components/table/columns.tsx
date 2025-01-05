import { ColumnDef } from "@tanstack/react-table"

export type product = {
    id: number
    name: string
    price: number
    stock: number
}

export const columns: ColumnDef<product>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'price',
        header: 'Precio',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
]

