import { create } from "@/lib/actions/auth";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

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
      name: "Credentials",
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
          const user: User = await create(pseudo);
          if (!user) {
            return null;
          }
          return user;
        }

        console.log("Pseudo schema validation failed.");
        return null;
      },
    }),
  ],
});
