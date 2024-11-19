import { Metadata } from "next"

import { ResetForm } from "@/app/(withoutHeader)/(auth-pages)/_components/reset-form"

export const metadata: Metadata = {
  title: "Forgot Password",
}

export default function ForgotPassword() {
  return <ResetForm />
}
