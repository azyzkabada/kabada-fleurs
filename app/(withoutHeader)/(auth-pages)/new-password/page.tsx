import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getResetPasswordToken } from "@/src/services/reset-password-token"

import { NewPasswordForm } from "@/app/(withoutHeader)/(auth-pages)/_components/new-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
}

export default async function NewPassword({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  if (!searchParams.token) redirect("/")
  const resetPasswordToken = await getResetPasswordToken(searchParams.token)
  if (!resetPasswordToken) redirect("/")

  return <NewPasswordForm token={resetPasswordToken.token} />
}
