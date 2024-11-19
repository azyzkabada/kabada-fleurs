"use client"

import { useTransition } from "react"
import { resendTwoFactor, twoFactor } from "@/src/actions/two-factor"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { loginSchema, twoFactorSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { FormInput } from "../_components/form-input"

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
    <div className="flex items-center justify-center w-full h-screen px-4 py-12 bg-background">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 p-20 px-4 md:border sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <ShieldCheck className="w-32 h-32 text-primary animatecss animatecss-rubberBand animatecss-infinite" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">
              Authentification à deux facteurs
            </h2>
            <p className="text-muted-foreground">
              Veuillez entrer le code à 6 chiffres envoyé à votre email pour
              accéder à votre compte. Le code expire après 2 minutes.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <FormInput
              control={form.control}
              name="code"
              label="Code d'authentification"
              placeholder="XXXXXX"
              isPending={isPending}
              autoComplete="off"
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Vérifier
            </Button>
          </form>
        </Form>
        <div className="flex flex-col w-full gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            className="w-full"
            onClick={handleResend}
          >
            Renvoyer le code
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => (window.location.href = "/login")}
          >
            Retourner à la connexion
          </Button>
        </div>
      </div>
    </div>
  )
}
