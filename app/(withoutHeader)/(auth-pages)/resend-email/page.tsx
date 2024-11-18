import { Metadata } from "next"

import { ResendForm } from "@/app/(withoutHeader)/(auth-pages)/_components/resend-form"

export const metadata: Metadata = {
  title: "Renvoyer la confirmation",
}

export default function ResendEmailPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || ""

  return <ResendForm email={email} />
}
