import { NextAuthConfig } from "next-auth";

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
    async session({ session, token }) {
      if (token.sub != null) {
        session.user.id = token.sub;
      }
      session.user.pseudo = token.pseudo;
      session.user.date = token.date;
      session.user.score = token.score;
      session.user.completed = token.completed;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isUserLoggedIn = !!auth?.user;
      const isAdminLoggedIn = !!auth?.user.email;
      const isOnWheel = nextUrl.pathname.startsWith("/wheel");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnAdminLogin = nextUrl.pathname === "/admin/login";

      if (isOnAdminLogin) {
        if (!isAdminLoggedIn) return true;
        return Response.redirect(new URL("/admin", nextUrl));
      } else if (isOnAdmin) {
        return isAdminLoggedIn;
      }

      if (isOnWheel) {
        return isUserLoggedIn;
      } else if (isUserLoggedIn) {
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
