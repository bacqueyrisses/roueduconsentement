import { z } from "zod";

export const CreateQuestion = z.object({
  description: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1)),
  value: z.coerce.number().gte(0).lte(10),
  active: z
    .string()
    .toLowerCase()
    .optional()
    .nullable()
    .default("off")
    .transform((x) => x === "on")
    .pipe(z.boolean()),
});

export const CreateAnswer = z.object({
  userId: z.string(),
  description: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1)),
  option: z.string(),
  value: z.coerce.number().gte(0).lte(10),
});
