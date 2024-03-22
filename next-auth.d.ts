import { DefaultSession } from "@auth/core/types";
import { Role } from "@prisma/client";

declare module "@auth/core/types" {
  interface User {
    id: string;
    pseudo: string;
    date: string;
    score: number;
    completed: boolean;
    surveyCompleted: boolean;
    role: Pick<Role>;
  }

  interface Session {
    user: {
      id: string;
      pseudo: string;
      date: string;
      score: number;
      completed: boolean;
      surveyCompleted: boolean;
      role: Pick<Role>;
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
    surveyCompleted: boolean;
    role: Pick<Role>;
  }
}
