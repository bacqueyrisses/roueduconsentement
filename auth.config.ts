import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (token.sub != null) {
        session.user.id = token.sub;
      }
      session.user.pseudo = token.pseudo;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnWheel = nextUrl.pathname.startsWith("/wheel");
      if (isOnWheel) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/wheel", nextUrl));
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  providers: [],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
