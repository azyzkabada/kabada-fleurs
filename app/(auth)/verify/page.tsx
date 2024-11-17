import { Metadata } from "next"
import { redirect } from "next/navigation"
import { newVerification } from "@/src/actions/verify-token"
import { NewVerificationForm } from "@/src/components/form/verify-token-form"

export const metadata: Metadata = {
  title: "Verify Email",
}

export default async function NewVerificationPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  if (!searchParams.token) redirect("/login")
  const data = await newVerification(searchParams.token)

  return <NewVerificationForm data={data} />
}
