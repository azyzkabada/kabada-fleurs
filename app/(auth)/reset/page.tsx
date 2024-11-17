import { Metadata } from "next"
import { ResetForm } from "@/src/components/form/reset-form"

export const metadata: Metadata = {
  title: "Forgot Password",
}

export default function ForgotPassword() {
  return <ResetForm />
}
