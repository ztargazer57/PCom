import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string
        const user = await prisma.profiles.findUnique({
          where: { email },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email }
      },
    }),
  ],
  callbacks: {
    authorized({ request ,auth }) {
        const { nextUrl } = request;

        if(nextUrl.pathname.startsWith("/dashboard")) { return !!auth; }
        if(nextUrl.pathname.startsWith("/auth")) { return true; }
        return true;
    }
  },
  pages: {
        signIn: "/auth",
      },
  secret: process.env.NEXT_AUTH_SECRET,
})
