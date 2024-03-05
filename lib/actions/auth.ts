"use server";
import { signIn, signOut } from "@/auth";
import { AuthError, User } from "next-auth";
import { sql } from "@vercel/postgres";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Ce pseudonyme est déjà en cours d'utilisation.";
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
      await sql<User>`INSERT INTO "users" (pseudo) VALUES (${pseudo}) ON CONFLICT (pseudo) DO NOTHING RETURNING pseudo`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't create user.");
  }
}

export async function signout() {
  await signOut();
}
