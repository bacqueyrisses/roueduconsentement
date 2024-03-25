"use server";

import { auth, signIn, signOut, unstable_update } from "@/auth";
import { Route } from "next";
import { AuthError, User } from "next-auth";

export async function getUser() {
  const session = await auth();
  return session?.user;
}

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

export async function signout(redirectTo: Route) {
  await signOut({ redirectTo });
}
export async function updateSession(data: Partial<User>) {
  await unstable_update({ user: data });
}
