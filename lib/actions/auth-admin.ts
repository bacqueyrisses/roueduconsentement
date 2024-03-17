"use server";

import { signIn } from "@/auth";
import { Admin } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";

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

export async function getAdmin(email: Admin["email"]) {
  try {
    const admin = await sql<Admin>`SELECT * FROM "Admin" WHERE email=${email}`;
    return admin.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't get admin data.");
  }
}
