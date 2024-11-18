"use client"

import { useTransition } from "react"
import { resendToken } from "@/src/actions/resend"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { resendSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

export const ResendForm = () => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof resendSchema>>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resendToken(values).then((data) => {
        if (data.success) {
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  })
  return (
    <CardWrapper
      headerTitle="Resend Confirmation"
      headerDescription="The verification link will expires after a hour. If you don't verify your email within a hour, you can request another email verification link."
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="e.g. johndoe@example.com"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Resend
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
