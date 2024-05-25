import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  // interface Profile {
  //   role: Role;
  //   email: string;
  // }

  interface User {
    role: Role;
    phone: string;
    email: string;
    picture: string
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: Role
      phone: string;
      email: string;
      picture: string
    }
  }
}