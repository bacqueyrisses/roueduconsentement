"use server";

import { signIn } from "@/auth";
import { paths } from "@/lib/constants";
import { User as UserDB } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { AuthError, User } from "next-auth";
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

export async function upsertAdmin(email: UserDB["emailAdmin"]) {
  try {
    const user = await sql<User>`
        INSERT INTO "User" ("emailAdmin", pseudo, role)
        VALUES (${email}, 'Admin', 'admin')
        ON CONFLICT ("emailAdmin")  DO UPDATE SET pseudo = excluded.pseudo, role = excluded.role
        RETURNING *`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  } finally {
    revalidatePath(paths.toAdmin);
  }
}
