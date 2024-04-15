import { z } from "zod";

export const CreateQuestion = z.object({
  description: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1, { message: "Rentrez une description." })),
  valueOne: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Rentrez une valeur pour Oui." })
    .gte(0)
    .lte(10),
  valueTwo: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Rentrez une valeur pour Non." })
    .gte(0)
    .lte(10),
  valueThree: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Rentrez une valeur pour Je sais pas." })
    .gte(0)
    .lte(10),
  active: z
    .string()
    .toLowerCase()
    .optional()
    .nullable()
    .default("off")
    .transform((x) => x === "on")
    .pipe(z.boolean()),
});
