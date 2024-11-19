"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/src/actions/reset-password"
import { FormInput } from "@/src/components/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { resetPasswordSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockKeyhole } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const ResetForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
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
          <LockKeyhole className="w-32 h-32 text-primary animatecss animatecss-rubberBand animatecss-infinite" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Mot de passe oublié</h2>
            <p className="text-muted-foreground">
              Veuillez entrer votre adresse e-mail. Vous recevrez un message
              avec des instructions pour réinitialiser votre mot de passe.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <FormInput
              control={form.control}
              name="email"
              label="Adresse e-mail"
              type="email"
              placeholder="ex. foulen@benfalten.com"
              isPending={isPending}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Envoyer le lien de réinitialisation
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
