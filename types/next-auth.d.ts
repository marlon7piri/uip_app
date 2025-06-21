import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      rol?: string;
      token: string;
      plan: string;
    } & DefaultSession["user"];
  }

  interface User {
    rol?: string;
    token: string;
    plan: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rol?: string;
    token: string;
  }
}
