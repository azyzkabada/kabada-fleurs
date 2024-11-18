"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/src/actions/register"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { registerSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

// Traduction du formulaire d'enregistrement
export const RegisterForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.success) {
          router.push("/login")
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  })

  return (
    <CardWrapper
      headerTitle="S'enregistrer"
      headerDescription="Créez votre compte en remplissant le formulaire ci-dessous. Assurez-vous que les informations saisies sont correctes."
      backButtonLabel="Vous avez déjà un compte ? Connectez-vous"
      backButtonHref="/login"
      className="justify-center w-full"
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="justify-center w-full space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="name"
              label="Nom"
              type="text"
              placeholder="ex : Jean Dupont"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="email"
              label="Adresse email"
              type="email"
              placeholder="ex : jeandupont@example.com"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Créer un compte
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
