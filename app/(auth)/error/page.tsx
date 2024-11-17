import { Metadata } from "next"
import { ErrorCard } from "@/src/components/auth/error-card"
import { AuthError } from "next-auth"

export const metadata: Metadata = {
  title: "Oops! Something went wrong",
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message: AuthError["type"] }
}) {
  return <ErrorCard message={searchParams.message} />
}
