import { DefaultSession, User } from "@auth/core/types";

interface ExtendedUser extends User {
  id: string;
  pseudo: string;
  date: string;
  score: number;
  completed: boolean;
}

type IUser = ExtendedUser;

declare module "@auth/core/types" {
  interface User extends IUser {}

  interface Session {
    user: IUser & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends IUser {}
}
