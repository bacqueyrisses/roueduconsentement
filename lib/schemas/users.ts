import { z } from "zod";
export const AddSurvey = z.object({
  age: z.coerce
    .number()
    .gte(0)
    .lte(150, { message: "Rentrez un nombre inférieur à 150." }),
});
