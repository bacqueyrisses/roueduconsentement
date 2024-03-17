import { DefaultSession, User } from "@auth/core/types";

interface ExtendedUser extends User {
  id: string;
  pseudo: string;
  date: string;
  score: number;
  completed: boolean;
}

declare module "@auth/core/types" {
  interface User {
    id: string;
    pseudo: string;
    date: string;
    score: number;
    completed: boolean;
  }

  interface Session {
    user: {
      id: string;
      pseudo: string;
      date: string;
      score: number;
      completed: boolean;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    pseudo: string;
    date: string;
    score: number;
    completed: boolean;
  }
}
