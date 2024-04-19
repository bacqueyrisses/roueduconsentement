"use server";

import { paths } from "@/lib/constants";
import { CreateQuestion } from "@/lib/schemas/questions";
import { PrevState } from "@/lib/utils";
import { Question } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
      INSERT INTO
        "Question" (
          description,
          "valueOne",
          "valueTwo",
          "valueThree",
          active
        )
      VALUES
        (
          ${description},
          ${valueOne},
          ${valueTwo},
          ${valueThree},
          ${active}
        )
    `;
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
      SET
        active = ${active}
      WHERE
        id = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. Failed to Update Question.");
  }

  revalidatePath(paths.toAdminQuestions);
}
