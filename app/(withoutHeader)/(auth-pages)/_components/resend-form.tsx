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

interface ResendFormProps {
  email?: string
}

export const ResendForm = ({ email = "" }: ResendFormProps) => {
  const [isPending, startTransition] = useTransition()

  // Initialiser le formulaire avec l'email par défaut
  const form = useForm<z.infer<typeof resendSchema>>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: email,
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
      headerTitle="Renvoyer la confirmation"
      headerDescription="Le lien de vérification expirera après une heure. Si vous ne vérifiez pas votre email dans ce délai, vous pouvez demander un nouveau lien de vérification."
      backButtonLabel="Retourner"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Adresse e-mail"
            type="email"
            placeholder="ex. johndoe@example.com"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Renvoyer
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
