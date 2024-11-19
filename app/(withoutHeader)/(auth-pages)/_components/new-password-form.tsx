"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { newPassword } from "@/src/actions/new-password"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { newPasswordSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { FormInput } from "../_components/form-input"

type NewPasswordFormProps = {
  token: string
}

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data.success) {
          router.push("/login")
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  })

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 py-12 bg-background">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 p-20 px-4 md:border sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <KeyRound className="w-32 h-32 text-primary animatecss animatecss-rubberBand animatecss-infinite" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">
              Réinitialiser le mot de passe
            </h2>
            <p className="text-muted-foreground">
              Entrez un nouveau mot de passe ci-dessous pour réinitialiser votre
              mot de passe.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <FormInput
              control={form.control}
              name="password"
              label="Nouveau mot de passe"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Réinitialiser le mot de passe
            </Button>
          </form>
        </Form>
        <div className="flex flex-col w-full gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Retourner à la connexion
          </Button>
        </div>
      </div>
    </div>
  )
}
