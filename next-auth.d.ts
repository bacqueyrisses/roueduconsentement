import { DefaultSession } from "@auth/core/types";
import { User as UserDB } from "@prisma/client";

declare module "@auth/core/types" {
  interface User extends UserDB {}

  interface Session {
    user: UserDB & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends UserDB {}
}
