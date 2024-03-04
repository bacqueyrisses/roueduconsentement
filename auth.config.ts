import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      // console.log(session, token);
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
  providers: [],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
