import { z } from "zod";

export const branchsProductsSchema = z.object({
    branchId: z.number({
        required_error: 'Seleccione una sucursal',
    }),
    productId: z.number({
        required_error: 'Seleccione un producto',
    }),
    quantity: z.number({
        required_error: 'Ingrese una cantidad',
    }).min(1, 'La cantidad debe ser mayor a 0').max(100, 'La cantidad debe ser menor a 100'),
}); 