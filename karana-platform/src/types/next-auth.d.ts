import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "CLIENT" | "ADMIN" | "TEAM_MEMBER"
    } & DefaultSession["user"]
  }

  interface User {
    role: "CLIENT" | "ADMIN" | "TEAM_MEMBER"
  }
}
