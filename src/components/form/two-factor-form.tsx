"use client"

import { useTransition } from "react"
import { resendTwoFactor, twoFactor } from "@/src/actions/two-factor"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { loginSchema, twoFactorSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

type TwoFactorFormProps = {
  payload: z.infer<typeof loginSchema>
}

export const TwoFactorForm = ({ payload }: TwoFactorFormProps) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      twoFactor(values, payload).then((data) => {
        if (!data) return
        if (!data.success) {
          return toast.error(data.error.message)
        }
      })
    })
  })

  const handleResend = () => {
    startTransition(() => {
      resendTwoFactor(payload.email).then((data) => {
        if (data.success) {
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  }

  return (
    <CardWrapper
      headerTitle="Two-Factor Authentication"
      headerDescription="Please enter the 6 digit code from your email to access your account. Code will expire after 2 minutes."
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="code"
            label="Authentication Code"
            placeholder="XXXXXX"
            isPending={isPending}
            autoComplete="off"
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Verify
          </Button>
        </form>
        <Button
          type="button"
          variant="link"
          disabled={isPending}
          className="w-full"
          onClick={handleResend}
        >
          Resend
        </Button>
      </Form>
    </CardWrapper>
  )
}
