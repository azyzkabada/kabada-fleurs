import { Metadata } from "next"
import { ResendForm } from "@/src/components/form/resend-form"

export const metadata: Metadata = {
  title: "Resend Confirmation",
}

export default function ResendPage() {
  return <ResendForm />
}
