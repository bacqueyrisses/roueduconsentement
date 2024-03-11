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

export const UpdateQuestion = CreateQuestion.omit({
  description: true,
  value: true,
});

export const CreateOption = z.object({
  description: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1)),
  active: z
    .string()
    .toLowerCase()
    .optional()
    .nullable()
    .default("off")
    .transform((x) => x === "on")
    .pipe(z.boolean()),
});
