import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/lib/validators"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user || !user.passwordHash) return null

        const valid = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash
        )
        if (!valid) return null

        return user
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // @ts-ignore - role is added via type augmentation
        session.user.role = user.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/dashboard",
  },
  session: { strategy: "database" },
})
