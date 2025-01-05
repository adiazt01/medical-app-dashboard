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
        header: () => <div className="flex flex-row text-center items-center justify-center w-full gap-2 ">
            <Camera size={14} />
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
        header: () => <div className="flex flex-row items-center gap-1">
            <PillBottle size={14} />
            Nombre
        </div>,
        accessorKey: 'name',
        cell: ({ cell }) => {
            return <div className="truncate">{cell.getValue()}</div>
        }
    },
    {
        header: () => <div className="flex flex-row items-center gap-1">
            <DollarSign size={14} />
            Precio
        </div>,
        accessorKey: 'price',
    },
    {
        header: () => <div className="flex flex-row items-center gap-1">
            <Book size={14} />
            Descripcion
        </div>,
        accessorKey: 'description',
    },
    {
        header: () => <div className="flex flex-row items-center gap-1">
            <Info size={14} />
            Laboratorio
        </div>,
        cell: ({ cell }) => {
            return <div className="truncate">{cell.getValue()}</div>
        },
        accessorKey: 'laboratory.name',
    },
    {
        header: () => <div className="flex truncate flex-row items-center gap-1">
            <Tablets size={14} />
            Componente principal
        </div>,
        cell: ({ cell }) => {
            return <div className="truncate">{cell.getValue()}</div>
        },
        accessorKey: 'mainComponent.name',
    },
    {
        header: () => <div className="flex flex-row items-center gap-1">
            <Heart size={14} />
            Accion terapeutica
        </div>,
        accessorKey: 'therapeuticAction.name',
    },
]

