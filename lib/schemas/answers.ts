import { z } from "zod";

export const CreateAnswer = z.object({
  description: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1)),
  option: z.string(),
  value: z.coerce.number().gte(0).lte(10),
});
