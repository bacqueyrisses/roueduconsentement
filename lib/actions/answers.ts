"use server";

import { getUser } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";
import { CreateAnswer } from "@/lib/schemas/answers";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function createAnswer(formData: FormData) {
  const user = await getUser();
  const validatedFields = CreateAnswer.safeParse({
    description: formData.get("description"),
    option: formData.get("option"),
    value: formData.get("value"),
  });

  if (!validatedFields.success)
    throw new Error("Validation error. Failed to Create Answer.");

  const { description, option, value } = validatedFields.data;

  try {
    await sql`
        INSERT INTO "Answer" ("userId", description, option, value)
        VALUES (${user?.id}, ${description}, ${option}, ${value})`;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Create Answer.");
  }

  revalidatePath(paths.toAdmin);
}
