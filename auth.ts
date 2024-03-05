import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { create } from "@/lib/actions/auth";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "pseudo", type: "text", placeholder: "pseudo" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ pseudo: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { pseudo } = parsedCredentials.data;
          const user = await create(pseudo);
          if (!user) {
            console.log("Pseudonym already in use.");
            return null;
          }
          return user;
        }

        console.log("Wrong pseudonym format.");
        return null;
      },
    }),
  ],
});
