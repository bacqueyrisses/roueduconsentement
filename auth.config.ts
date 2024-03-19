import { paths } from "@/lib/constants";
import { Role } from "@prisma/client";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: paths.toHome,
  },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token.sub != null) {
        session.user.id = token.sub;
      }
      session.user.pseudo = token.pseudo;
      session.user.date = token.date;
      session.user.score = token.score;
      session.user.role = token.role;
      session.user.completed = token.completed;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isUserLoggedIn = auth?.user.role === Role.user;
      const isAdminLoggedIn = auth?.user.role === Role.admin;

      const isOnWheel = nextUrl.pathname.startsWith(paths.toWheel);
      const isOnAdmin = nextUrl.pathname.startsWith(paths.toAdmin);
      const isOnAdminLogin = nextUrl.pathname === paths.toAdminLogin;

      if (isOnAdminLogin) {
        if (!isAdminLoggedIn) return true;
        return Response.redirect(new URL(paths.toAdmin, nextUrl));
      } else if (isOnAdmin) {
        return isAdminLoggedIn;
      }

      if (isOnWheel) {
        if (isAdminLoggedIn)
          return Response.redirect(new URL(paths.toAdmin, nextUrl));
        return isUserLoggedIn;
      } else if (isUserLoggedIn) {
        return Response.redirect(new URL(paths.toWheel, nextUrl));
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  providers: [],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
