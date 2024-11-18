import { Metadata } from "next"
import { redirect } from "next/navigation"
import { newVerification } from "@/src/actions/verify-token"

import { EmailVerified } from "../_components/email-verified"

export const metadata: Metadata = {
  title: "Verify Email",
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  if (!searchParams.token) redirect("/login")

  const data = await newVerification(searchParams.token)

  return <EmailVerified data={data} />
}
