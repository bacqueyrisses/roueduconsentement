"use server";

import { auth, unstable_update } from "@/auth";
import { PrevState } from "@/lib/actions/helpers";
import { AddSurvey, CreateAnswer, CreateQuestion } from "@/lib/schemas/rest";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getUser() {
  const session = await auth();
  return session?.user;
}
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

export async function addScore(score: User["score"]) {
  const user = await getUser();
  const validatedField = z
    .number()
    .transform((n) => Number(n.toFixed(1)))
    .safeParse(score);

  if (!validatedField.success) throw new Error("Une erreur est survenue.");

  const validatedScore = validatedField.data;

  try {
    await sql`
        UPDATE users
        SET score = ${validatedScore}, completed = true
        WHERE id = ${user?.id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't add score to user.");
  }

  revalidatePath("/admin");
}

export async function addSurvey(prevState: PrevState, formData: FormData) {
  const user = await getUser();

  const validatedFields = AddSurvey.safeParse({
    age: formData.get("age"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Add Survey.",
    };
  }

  const { age } = validatedFields.data;

  try {
    await sql`
        UPDATE users
        SET age = ${age}
        WHERE id = ${user?.id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't add score to user.");
  }

  revalidatePath("/admin");
  return {
    success: true,
  };
}

export async function createAnswer(formData: FormData) {
  const user = await getUser();
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

export async function updateSession() {
  await unstable_update({ user: { completed: true } });
}
