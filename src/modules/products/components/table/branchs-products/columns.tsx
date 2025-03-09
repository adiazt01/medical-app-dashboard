import Image from "@/modules/core/components/Image"
import ImageColumn from "@/modules/core/components/ImageColumn"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { ColumnDef } from "@tanstack/react-table"

export type product = {
  id: number
  name: string
  price: number
  description: string
  createdAt: string
  updatedAt: string
  laboratory: {
    name: string
  },
  mainComponent: {
    name: string
  },
  therapeuticAction: {
    name: string
  },
  presentation: {
    name: string
  },
  file: {
    path: string,
    id: number
  }
}

export const columns: ColumnDef<product>[] = [
  {
    header: () => <div>
      <p className="mr-2">
        Imagen
      </p>
    </div>,
    cell: ({ row }) => {
      return (
        <>
         <ImageColumn queryKey="products" file={row.original.medicine.file} alt={row.original.medicine.name} />
        </>
      )
    },
    accessorKey: 'file.url',
  },
  {
    header: () => <div>
      Cantidad
    </div>,
    accessorKey: 'name',
    cell: ({ row }) => {
      return <div className="truncate">{row.original.quantity}</div>
    }
  },
  {
    header: () => <div>
      Sucursal
    </div>,
    accessorKey: 'name',
    cell: ({ row }) => {
    
      return <div className="truncate">{row.original.branch.name}</div>
    }
  },
]

