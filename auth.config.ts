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
      session.user.surveyCompleted = token.surveyCompleted;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isUserLoggedIn = auth?.user.role === Role.user;
      const isAdminLoggedIn = auth?.user.role === Role.admin;

      const isOnWheel = nextUrl.pathname.startsWith(paths.toWheel);
      const isOnHome = nextUrl.pathname === paths.toHome;
      const isOnAdmin = nextUrl.pathname === paths.toAdmin;
      const isOnAdminLogin = nextUrl.pathname === paths.toAdminLogin;

      // Authorize logging page for all users
      if (isOnAdminLogin) {
        // Redirect logged admin to the dashboard
        if (isAdminLoggedIn)
          return Response.redirect(new URL(paths.toAdmin, nextUrl));

        return true;
      }

      // Authorize only admins
      if (isOnAdmin) return isAdminLoggedIn;

      // Redirect logged user to /wheel
      if (isOnHome && isUserLoggedIn)
        return Response.redirect(new URL(paths.toWheel, nextUrl));

      // Handle /wheel auth
      if (isOnWheel) {
        // Redirect logged admin to the dashboard
        if (isAdminLoggedIn)
          return Response.redirect(new URL(paths.toAdmin, nextUrl));

        return isUserLoggedIn;
      }

      return true;
    },
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
