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

export async function createQuestion(prevState: PrevState, formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    description: formData.get("description"),
    valueOne: formData.get("value-one"),
    valueTwo: formData.get("value-two"),
    valueThree: formData.get("value-three"),
    active: formData.get("active"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error. Failed to Create Question.",
    };
  }

  const { description, valueOne, valueTwo, valueThree, active } =
    validatedFields.data;

  try {
    await sql`
        INSERT INTO questions (description, "valueOne", "valueTwo", "valueThree", active)
        VALUES (${description}, ${valueOne}, ${valueTwo}, ${valueThree}, ${active})`;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Create Question.");
  }

  revalidatePath("/admin/questions");
  return {
    success: true,
  };
}

export async function updateQuestion(id, value) {
  const validatedField = z.boolean().safeParse(value);

  if (!validatedField.success)
    throw new Error("Validation error. Failed to Update Question.");

  const active = validatedField.data;

  try {
    await sql`
        UPDATE questions
        SET active = ${active}
        WHERE id = ${id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Update Question.");
  }

  revalidatePath("/admin/questions");
}

export async function addScore(score: User["score"]) {
  const user = await getUser();
  const validatedField = z
    .number()
    .transform((n) => Number(n.toFixed(1)))
    .safeParse(score);

  if (!validatedField.success)
    throw new Error("Validation error. Failed to Add Score to User.");

  const validatedScore = validatedField.data;

  try {
    await sql`
        UPDATE users
        SET score = ${validatedScore}, completed = true
        WHERE id = ${user?.id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Add Score to User.");
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
      message: "Validation error. Failed to Add Survey to User.",
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
    throw new Error("Database error. Failed to Add Survey to User.");
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
    throw new Error("Validation error. Failed to Create Answer.");

  const { description, option, value } = validatedFields.data;

  try {
    await sql`
        INSERT INTO answers ("userId", description, option, value)
        VALUES (${user?.id}, ${description}, ${option}, ${value})`;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Create Answer.");
  }

  revalidatePath("/admin");
}

export async function updateSession() {
  await unstable_update({ user: { completed: true } });
}
