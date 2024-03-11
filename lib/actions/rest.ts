"use server";

import { sql } from "@vercel/postgres";
import {
  CreateOption,
  CreateQuestion,
  UpdateQuestion,
} from "@/lib/schemas/rest";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

  revalidatePath("/admin/questions");
}
export async function createOption(formData: FormData) {
  const validatedField = CreateOption.safeParse({
    description: formData.get("description"),
    active: formData.get("active"),
  });

  if (!validatedField.success)
    throw new Error("Veuillez renseignez les champs");

  const { description, active } = validatedField.data;

  try {
    await sql`
        INSERT INTO options (description, active)
        VALUES (${description}, ${active})`;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new option.");
  }

  revalidatePath("/admin/options");
}

export async function updateQuestion(id, value) {
  const validatedField = z.boolean().safeParse(value);

  if (!validatedField.success)
    throw new Error("Veuillez renseignez les champs");

  const active = validatedField.data;

  try {
    await sql`
        UPDATE questions
        SET active = ${active}
        WHERE id = ${id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new question.");
  }

  revalidatePath("/admin/questions");
}

export async function updateOption(id, value) {
  const validatedField = z.boolean().safeParse(value);

  if (!validatedField.success)
    throw new Error("Veuillez renseignez les champs");

  const active = validatedField.data;

  try {
    await sql`
        UPDATE options
        SET active = ${active}
        WHERE id = ${id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new question.");
  }

  revalidatePath("/admin/options");
}
