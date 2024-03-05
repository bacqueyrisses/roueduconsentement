import { DefaultSession } from "@auth/core/types";
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/types" {
  interface User {
    id: string;
    pseudo: string;
  }

  interface Session {
    user: {
      id: string;
      pseudo: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    pseudo: string;
  }
}
