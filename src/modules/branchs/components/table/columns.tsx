import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IUserApi>[] = [
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
      Direccion
    </div>,
    accessorKey: 'address',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Numero telefonico
    </div>,
    accessorKey: 'phone',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Correo electronico
    </div>,
    accessorKey: 'email',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Fecha de registro
    </div>,
    accessorKey: 'createdAt',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
]

