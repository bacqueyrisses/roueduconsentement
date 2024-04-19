import { createUser } from "@/lib/actions/users";

import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { upsertAdmin } from "@/lib/actions/users";
import { authConfig } from "./auth.config";

export const { auth, unstable_update, signIn, signOut } = NextAuth({
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

          const user = await createUser(pseudo);

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
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.literal(process.env.ADMIN_PASSWORD),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email } = parsedCredentials.data;

          const user = await upsertAdmin(email);
          if (!user) return null;

          return user;
        }

        console.log("Identifiants incorrects.");
        return null;
      },
    }),
  ],
});
