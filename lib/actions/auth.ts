"use server";

import { signIn, signOut, unstable_update } from "@/auth";
import { sql } from "@vercel/postgres";
import { Route } from "next";
import { AuthError, User } from "next-auth";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("app-login", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Renseignez un pseudo.";
        default:
          return "Une erreur est survenue.";
      }
    }
    throw error;
  }
}

export async function create(pseudo: User["pseudo"]) {
  try {
    const user =
      await sql<User>`INSERT INTO "User" (pseudo) VALUES (${pseudo}) RETURNING *`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  } finally {
    revalidatePath("/admin");
  }
}

export async function signout(redirectTo: Route) {
  await signOut({ redirectTo });
}
export async function updateSession(newUser: Partial<User>) {
  await unstable_update({ user: newUser });
}
