"use server";

import { sql } from "@vercel/postgres";
import { CreateOption, CreateQuestion } from "@/lib/schemas/rest";
import { revalidatePath } from "next/cache";

export async function createQuestion(formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    description: formData.get("description"),
    value: formData.get("value"),
    active: formData.get("active"),
  });

  if (!validatedFields.success)
    throw new Error("Veuillez renseignez les champs");

  const { description, value, active } = validatedFields.data;

  try {
    await sql`
        INSERT INTO questions (description, value, active)
        VALUES (${description}, ${value}, ${active})`;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new question.");
  }

  return { success: true } && revalidatePath("/admin/questions");
}
export async function createOption(formData: FormData) {
  const validatedField = CreateOption.safeParse({
    description: formData.get("description"),
  });

  if (!validatedField.success)
    throw new Error("Veuillez renseignez les champs");

  const { description } = validatedField.data;

  try {
    await sql`
        INSERT INTO options (description)
        VALUES (${description})`;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new option.");
  }
}
