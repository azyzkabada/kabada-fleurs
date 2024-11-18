"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/src/actions/register"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { Separator } from "@/src/components/ui/separator"
import { registerSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"

import { Social } from "./social"

// Formulaire d'inscription avec logique de choix entre social et coordonnées
export const RegisterForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Configuration du formulaire avec React Hook Form et Zod
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // Gestion de l'envoi du formulaire
  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.success) {
          toast.success("Votre compte a été créé avec succès !")
          router.push("/login")
        } else {
          toast.error(`Erreur : ${data.error.message}`)
        }
      })
    })
  })

  return (
    <CardWrapper
      headerTitle="Créer un compte"
      headerDescription="Vous pouvez vous connecter via un réseau social ou remplir vos coordonnées."
      backButtonLabel="Déjà inscrit ? Connectez-vous"
      backButtonHref="/login"
      className="justify-center w-full"
    >
      {/* Connexion via réseaux sociaux */}
      <Social />

      <div className="relative flex flex-row items-center justify-center my-4 space-x-4 text-xs">
        <Separator className="flex-grow" />
        <p className="w-full text-xs text-center">Ou avec vos coordonnées</p>
        <Separator className="flex-grow" />
      </div>

      {/* Formulaire d'inscription par coordonnées */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="justify-center w-full space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="name"
              label="Nom complet"
              type="text"
              placeholder="ex : Foulen Ben Falten"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="email"
              label="Adresse email"
              type="email"
              placeholder="ex : benflaten@foulen.com"
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
