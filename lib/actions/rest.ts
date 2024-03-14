"use server";

import { auth } from "@/auth";
import { CreateAnswer, CreateQuestion } from "@/lib/schemas/rest";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createQuestion(formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    description: formData.get("description"),
    valueOne: formData.get("value-one"),
    valueTwo: formData.get("value-two"),
    valueThree: formData.get("value-three"),
    active: formData.get("active"),
  });

  if (!validatedFields.success)
    throw new Error("Veuillez renseignez les champs");

  const { description, valueOne, valueTwo, valueThree, active } =
    validatedFields.data;

  try {
    await sql`
        INSERT INTO questions (description, "valueOne", "valueTwo", "valueThree", active)
        VALUES (${description}, ${valueOne}, ${valueTwo}, ${valueThree}, ${active})`;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new question.");
  }

  revalidatePath("/admin/questions");
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

export async function createAnswer(formData: FormData) {
  const session = await auth();
  const user = session?.user;
  const validatedFields = CreateAnswer.safeParse({
    description: formData.get("description"),
    option: formData.get("option"),
    value: formData.get("value"),
  });

  if (!validatedFields.success)
    throw new Error("Veuillez renseignez les champs");

  const { description, option, value } = validatedFields.data;

  try {
    await sql`
        INSERT INTO answers ("userId", description, option, value)
        VALUES (${user?.id}, ${description}, ${option}, ${value})`;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create new answer.");
  }

  revalidatePath("/admin");
}
