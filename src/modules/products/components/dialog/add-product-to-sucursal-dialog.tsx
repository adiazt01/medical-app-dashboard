import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getMedicines } from '../../services/medicine-api'
import { getBranchs } from '@/modules/branchs/services/branchs-api'
import { createBranchsMedicines } from '../../services/branchs-medicines-api'
import { useForm } from '@tanstack/react-form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/modules/core/hooks/use-toast'
import { FieldInfo } from '@/modules/core/components/input/form-info'
import { branchsProductsSchema } from '../../schemas/branchs-products'

export default function AddProductToSucursalDialog({
  page,
  search,
}) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { data: branchs } = useQuery({
        queryKey: ['branches'],
        queryFn: () => getBranchs(1, 100),
    })

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => getMedicines(1, 100),
    })

    const addProductMutation = useMutation({
        mutationKey: ['products-branches'],
        mutationFn: async (values: { quantity: number; branchId: number; productId: number }) => {
            await createBranchsMedicines({
                branchId: Number(values.branchId),
                medicineId: Number(values.productId),
                quantity: Number(values.quantity),
            })
        },
        onError: (error) => {
            toast({
                title: 'Error al añadir producto a sucursal',
                description: 'Ya existe el producto en la sucursal',
                variant: 'destructive',
            })
        }
    })

    const form = useForm({
        defaultValues: {
            quantity: 1,
            productId: '',
            branchId: '',
        },
        onSubmit: async ({ value, formApi }) => {
          console.log(value)
            await addProductMutation.mutateAsync({
              quantity: Number(value.quantity),
              branchId: Number(value.branchId),
              productId: Number(value.productId),
            })
            await formApi.reset()
            toast({
                title: 'Producto añadido a sucursal',
                description: 'El producto ha sido añadido a la sucursal',
                variant: 'default',
            })
            await queryClient.invalidateQueries({
              queryKey: ['products-branchs', page, search],
            })
        },
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Añadir producto a sucursal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Añadir producto a sucursal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* Campo de cantidad */}
                        <form.Field
                            name="quantity"
                            children={(field) => (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={field.name} className="text-right">
                                        Cantidad
                                    </Label>
                                    <Input
                                        disabled={addProductMutation.isPending}
                                        id={field.name}
                                        type="number"
                                        value={field.state.value}
                                        min={1}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="col-span-3"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />

                        {/* Selección de producto */}
                        <form.Field
                            name="productId"
                            children={(field) => (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={field.name} className="text-right">
                                        Producto
                                    </Label>
                                    <Select
                                        disabled={addProductMutation.isPending}
                                        value={field.state.value || ''}
                                        onValueChange={(val) => field.handleChange(val)}
                                    >
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue
                                                placeholder="Selecciona una medicina"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Medicinas</SelectLabel>
                                                {products?.data.map((product) => (
                                                    <SelectItem
                                                        key={product.id}
                                                        value={product.id.toString()}
                                                    >
                                                        {product.name.toString()}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />

                        {/* Selección de sucursal */}
                        <form.Field
                            name="branchId"
                            children={(field) => (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={field.name} className="text-right">
                                        Sucursal
                                    </Label>
                                    <Select
                                        disabled={addProductMutation.isPending}
                                        value={field.state.value || ''}
                                        onValueChange={(val) => field.handleChange(val)}
                                    >
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue
                                                placeholder="Selecciona una sucursal"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Sucursales</SelectLabel>
                                                {branchs?.data.map((branch) => (
                                                    <SelectItem
                                                        key={branch.id}
                                                        value={branch.id.toString()}
                                                    >
                                                        {branch.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={addProductMutation.isPending}>
                            {addProductMutation.isPending ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
