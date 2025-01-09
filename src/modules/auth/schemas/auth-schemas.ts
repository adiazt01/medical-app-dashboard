import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  }).email({
    message: "El email no es válido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }).min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});