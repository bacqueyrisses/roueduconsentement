import { create } from "@/lib/actions/auth";

import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { getAdmin } from "@/lib/actions/auth-admin";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  unstable_update,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "app-login",
      name: "app",
      credentials: {
        name: { label: "pseudo", type: "text", placeholder: "pseudo" },
      },
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({
            pseudo: z
              .string()
              .transform((t) => t?.trim())
              .pipe(z.string().min(1)),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { pseudo } = parsedCredentials.data;
          const user = await create(pseudo);
          if (!user) return null;

          return user;
        }

        console.log("Pseudo schema validation failed.");
        return null;
      },
    }),
    Credentials({
      id: "admin-login",
      name: "admin",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials): Promise<any | null> {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const admin = await getAdmin(email);
          if (!admin) return null;

          // const passwordsMatch = await bcrypt.compare(password, admin.password);
          return admin;
        }

        console.log("Identifiants incorrects.");
        return null;
      },
    }),
  ],
});
