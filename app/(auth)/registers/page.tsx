import type { Metadata } from "next"
import { RegisterForm } from "@/src/components/form/register-form"

export const metadata: Metadata = {
  title: "Register",
}

export default function RegisterPage() {
  return <RegisterForm />
}
