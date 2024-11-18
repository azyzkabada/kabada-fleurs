import { loginSchema } from "@/src/schemas"
import { getUserByEmail } from "@/src/services/user"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import Facebook from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const CredentialsProvider = Credentials({
  async authorize(credentials) {
    const validatedFields = loginSchema.safeParse(credentials)

    if (validatedFields.success) {
      const { email, password } = validatedFields.data

      const user = await getUserByEmail(email)
      if (!user || !user.password) return null

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (passwordsMatch) return user
    }

    return null
  },
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
})

export const GithubProvider = Github({
  clientId: process.env.GITHUB_ID as string,
  clientSecret: process.env.GITHUB_SECRET as string,
})

export const GoogleProvider = Google({
  clientId: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
})

export const FacebookProvider = Facebook({
  clientId: process.env.FACEBOOK_CLIENT_ID as string,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
})
