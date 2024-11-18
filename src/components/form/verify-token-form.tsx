import { redirect } from "next/navigation"
import type { Response } from "@/types"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

type NewVerificationFormProps = {
  data: Response
}

export const NewVerificationForm = ({ data }: NewVerificationFormProps) => {
  if (!data.success) {
    return redirect("/login")
  }

  return (
    <CardWrapper
      headerTitle="Email Address Verified!"
      headerDescription="Congratulations! You have successfully verified your email address. You can now use your account to login to the website."
      backButtonLabel="Back to login"
      backButtonHref="/login"
      heroImage="/assets/email-verified.svg"
    />
  )
}
