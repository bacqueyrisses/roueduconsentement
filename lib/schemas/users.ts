import { z } from "zod";
export const AddSurvey = z.object({
  age: z.coerce
    .number()
    .int()
    .positive("Rentrez votre âge.")
    .min(0)
    .max(150, { message: "Rentrez un nombre inférieur à 150." }),
});
