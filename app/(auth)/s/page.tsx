import { Metadata } from "next"
import { redirect } from "next/navigation"
import { LoginForm } from "@/src/components/form/login-form"

export const metadata: Metadata = {
  title: "Login",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  if (searchParams.error) redirect(`/error?message=${searchParams.error}`)
  return <LoginForm />
}
