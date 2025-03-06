import { ColumnDef } from "@tanstack/react-table"
import { IUserApi } from "../../interface/user-api"

export const columns: ColumnDef<IUserApi>[] = [
  {
    header: () => <div>
      Nombres
    </div>,
    accessorKey: 'firstNames',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Apellidos
    </div>,
    accessorKey: 'lastNames',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Email
    </div>,
    accessorKey: 'email',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Rol
    </div>,
    accessorKey: 'role',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Creado
    </div>,
    accessorKey: 'createdAt',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
  {
    header: () => <div>
      Actualizado
    </div>,
    accessorKey: 'updatedAt',
    cell: ({ cell }) => {
      return <div className="truncate">{cell.getValue()}</div>
    }
  },
]

