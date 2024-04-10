import { z } from "zod";

export const CreateAnswer = z.object({
  description: z.string(),
  option: z.string(),
  value: z.coerce.number().gte(0).lte(10),
  summary: z.string(),
});
