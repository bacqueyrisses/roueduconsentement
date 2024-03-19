import { Route } from "next";

export const paths = {
  toHome: "/",
  toWheel: "/wheel",
  toAdmin: "/admin",
  toAdminLogin: "/admin/login",
  toAdminQuestions: "/admin/questions",
} as const satisfies Record<string, Route>;
