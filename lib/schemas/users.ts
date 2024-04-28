import { z } from "zod";
export const AddSurvey = z.object({
  age: z.coerce
    .number()
    .int()
    .positive("Rentrez votre âge.")
    .min(0)
    .max(150, { message: "Rentrez un nombre inférieur à 150." }),
  gender: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1, { message: "Précisez votre genre." })),
  question: z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1, { message: "Complétez la question ouverte." })),
});
