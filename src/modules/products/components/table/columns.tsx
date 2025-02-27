import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { ColumnDef } from "@tanstack/react-table"
import { Book, Camera, DollarSign, Hash, Heart, Info, PillBottle, Tablets } from "lucide-react"

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
    url: string
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
      return (<AspectRatio ratio={16 / 9}>
        <img src={row.original.file.url} alt="product" className="mx-auto rounded-md object-cover" />
      </AspectRatio>)
    },
    accessorKey: 'file.url',
  },
  {
    header: () => <div>
      Nombre
    </div>,
    accessorKey: 'name',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Precio
    </div>,
    accessorKey: 'price',
  },
  {
    header: () => <div>
      Descripcion
    </div>,
    accessorKey: 'description',
  },
  {
    header: () => <div>
      Laboratorio
    </div>,
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    },
    accessorKey: 'laboratory.name',
  },
  {
    header: () => <div>
      Componente principal
    </div>,
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    },
    accessorKey: 'mainComponent.name',
  },
  {
    header: () => <div className="truncate">
      Accion terapeutica
    </div>,
    accessorKey: 'therapeuticAction.name',
  },
]

