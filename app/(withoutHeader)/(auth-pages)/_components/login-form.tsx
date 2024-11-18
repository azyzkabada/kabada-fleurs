"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/src/actions/login"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { Separator } from "@/src/components/ui/separator"
import { loginSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

import { Social } from "./social"

export const LoginForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Configuration du formulaire avec React Hook Form et Zod
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Gestion de l'envoi du formulaire
  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return
          if (!data.success) {
            return toast.error(data.error.message)
          }
          return router.push("/two-factor")
        })
        .catch(() => toast.error("Something went wrong."))
    })
  })

  return (
    <CardWrapper
      headerTitle="Se connecter"
      headerDescription="Connectez-vous avec un réseau social ou utilisez vos identifiants."
      backButtonLabel="Pas encore inscrit ? Créez un compte"
      backButtonHref="/register"
      className="justify-center w-full"
    >
      {/* Connexion via réseaux sociaux */}
      <Social />

      <div className="relative flex flex-row items-center justify-center my-4 space-x-4 text-xs">
        <Separator className="flex-grow" />
        <p className="w-full text-xs text-center">Ou avec vos identifiants</p>
        <Separator className="flex-grow" />
      </div>

      {/* Formulaire de connexion par email et mot de passe */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="justify-center w-full space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label="Adresse email"
              type="email"
              placeholder="ex : utilisateur@example.com"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label={
                <div className="flex items-center justify-between">
                  <span>Mot de passe</span>
                  <Link
                    href="/reset"
                    className="text-xs text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              }
              type="password"
              placeholder="******"
              isPending={isPending}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Se connecter
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
