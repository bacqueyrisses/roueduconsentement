"use server";

import { signIn } from "@/auth";
import { User } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function authenticateAdmin(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("admin-login", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Identifiants incorrects.";
        default:
          return "Une erreur est survenue.";
      }
    }
    throw error;
  }
}

export async function upsertAdmin(email: User["emailAdmin"]) {
  try {
    const user = await sql<User>`
        INSERT INTO "User" ("emailAdmin", pseudo, role)
        VALUES (${email}, 'admin', 'admin')
        ON CONFLICT ("emailAdmin")  DO UPDATE SET pseudo = excluded.pseudo, role = excluded.role
        RETURNING *`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  } finally {
    revalidatePath("/admin");
  }
}
