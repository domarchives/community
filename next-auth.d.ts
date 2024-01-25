import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      code: string;
      referralCode: string?;
      role: string;
      address: string?;
      network: string?;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string?;
    code: string;
    referralCode: string?;
    provider: string;
    role: string;
    address: string?;
    network: string?;
  }
}
