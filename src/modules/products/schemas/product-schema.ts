import * as zod from 'zod';

export const createProductSchema = zod.object({
    name: zod.string().nonempty('El nombre del producto es necesario'),
    description: zod.string(),
    price: zod.number().positive('El precio es necesario'),
    presentationId: zod.number().positive('La presentación es necesaria'),
    mainComponentId: zod.number().positive('El componente principal es necesario'),
    laboratoryId: zod.number().positive('El laboratorio es necesario'),
    therapeuticActionId: zod.number().positive('La acción terapéutica es necesaria'),
    image: zod.instanceof(File, {
      message: 'La imagen es necesaria',
    }).refine(file => file.size > 0, 'La imagen es necesaria'),
});

export const createProductWithFileIdSchema = createProductSchema.omit({ image: true }).extend({
  fileId: zod.number().positive('File ID must be a positive number'),
});
