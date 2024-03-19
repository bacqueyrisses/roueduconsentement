"use server";

import { auth } from "@/auth";
import { PrevState } from "@/lib/utils";
import { AddSurvey, CreateAnswer, CreateQuestion } from "@/lib/schemas/rest";
import { Question } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { paths } from "@/lib/constants";

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
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error. Failed to Create Question.",
    };
  }

  const { description, valueOne, valueTwo, valueThree, active } =
    validatedFields.data;

  try {
    await sql`
        INSERT INTO "Question" (description, "valueOne", "valueTwo", "valueThree", active)
        VALUES (${description}, ${valueOne}, ${valueTwo}, ${valueThree}, ${active})`;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Create Question.");
  }

  revalidatePath(paths.toAdminQuestions);
  return {
    success: true,
  };
}

export async function updateQuestion(id: Question["id"], value: boolean) {
  const validatedField = z.boolean().safeParse(value);

  if (!validatedField.success)
    throw new Error("Validation error. Failed to Update Question.");

  const active = validatedField.data;

  try {
    await sql`
        UPDATE "Question"
        SET active = ${active}
        WHERE id = ${id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Update Question.");
  }

  revalidatePath(paths.toAdminQuestions);
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
        UPDATE "User"
        SET score = ${validatedScore}, completed = true
        WHERE id = ${user?.id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Add Score to User.");
  }

  revalidatePath(paths.toAdmin);
}

export async function addSurvey(prevState: PrevState, formData: FormData) {
  const user = await getUser();

  const validatedFields = AddSurvey.safeParse({
    age: formData.get("age"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error. Failed to Add Survey to User.",
    };
  }

  const { age } = validatedFields.data;

  try {
    await sql`
        UPDATE "User"
        SET age = ${age}
        WHERE id = ${user?.id}
        `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Add Survey to User.");
  }

  revalidatePath(paths.toAdmin);
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
        INSERT INTO "Answer" ("userId", description, option, value)
        VALUES (${user?.id}, ${description}, ${option}, ${value})`;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Create Answer.");
  }

  revalidatePath(paths.toAdmin);
}
