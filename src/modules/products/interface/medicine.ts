import { z } from "zod";
import { createProductWithFileIdSchema } from "../schemas/product-schema";

export type CreateProductWithFileId = z.infer<typeof createProductWithFileIdSchema>;
