import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyJwtToken } from "@/src/lib/utils"
import { loginSchema } from "@/src/schemas"
import { getTwoFactorTokenByEmail } from "@/src/services/two-factor-token"
import { z } from "zod"

import { TwoFactorForm } from "@/app/(withoutHeader)/(auth-pages)/_components/two-factor-form"

export const metadata: Metadata = {
  title: "Two-Factor Authentication",
}

export default async function TwoFactorPage() {
  const cookieStore = cookies()

  let credentials = cookieStore.get("credentials-session")
  if (!credentials) {
    redirect("/")
  }

  const verifyToken = verifyJwtToken<z.infer<typeof loginSchema>>(
    credentials.value
  )
  if (!verifyToken.valid || !verifyToken.decoded) {
    redirect("/")
  }

  const existingToken = await getTwoFactorTokenByEmail(
    verifyToken.decoded.email
  )
  if (!existingToken) {
    redirect("/")
  }

  return (
    <TwoFactorForm
      payload={{
        email: existingToken.email,
        password: verifyToken.decoded.password,
      }}
    />
  )
}
