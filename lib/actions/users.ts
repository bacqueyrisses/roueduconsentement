"use server";

import { User as UserDB } from "@prisma/client";

import { getUser } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";
import { AddSurvey } from "@/lib/schemas/users";
import { PrevState } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createUser(pseudo: User["pseudo"]) {
  try {
    const user = await sql<User>`
      INSERT INTO
        "User" (pseudo)
      VALUES
        (${pseudo})
      RETURNING
        *
    `;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  } finally {
    revalidatePath(paths.toAdmin);
  }
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
      SET
        score = ${validatedScore},
        completed = TRUE
      WHERE
        id = ${user?.id}
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
    gender: formData.get("otherGender") || formData.get("gender"),
    question: formData.get("question"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error. Failed to Add Survey to User.",
    };
  }

  const { age, gender, question } = validatedFields.data;

  try {
    await sql`
      UPDATE "User"
      SET
        age = ${age},
        gender = ${gender},
        question = ${question}
      WHERE
        id = ${user?.id}
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

export async function upsertAdmin(email: UserDB["emailAdmin"]) {
  try {
    const user = await sql<User>`
      INSERT INTO
        "User" ("emailAdmin", pseudo, role)
      VALUES
        (
          ${email},
          'Admin',
          'admin'
        )
      ON CONFLICT ("emailAdmin") DO
      UPDATE
      SET
        pseudo = excluded.pseudo,
        role = excluded.role
      RETURNING
        *
    `;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  } finally {
    revalidatePath(paths.toAdmin);
  }
}
