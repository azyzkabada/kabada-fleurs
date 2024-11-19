"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { profile } from "@/src/actions/profile"
import { FormToggle } from "@/src/components/auth/form-toggle"
import { FormInput } from "@/src/components/form-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import ToggleTexte from "@/src/components/utils/hiddenTexte"
import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeCheck, UserRound, XCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import type { ExtendedUser } from "@/types/next-auth"

// Schéma de validation pour le profil
const profileSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().optional(),
  newPassword: z.string().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
})

// Type dérivé du schéma de validation
type ProfileSchema = z.infer<typeof profileSchema>

// Interface pour un utilisateur
interface User {
  name: string
  email: string
  image: string | null
  id: string
  role: "User" | "Admin"
  isTwoFactorEnabled: boolean
  isOAuth: boolean
  emailVerified: boolean
}

// Props pour le composant de dialogue des paramètres
interface SettingsDialogProps {
  user: ExtendedUser
}

export default function SettingsDialog({ user }: SettingsDialogProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "John Doe",
      email: user?.email || "john.doe@example.com",
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      profile(values).then((data) => {
        if (data.success) {
          form.reset(values)
          toast.success(data.message)
        } else {
          toast.error(data.error?.message || "Une erreur s'est produite.")
        }
      })
    })
  })

  return (
    <main className="flex-1">
      <div className="container w-full py-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage
                src={user.image as string}
                alt={user.name as string}
              />
              <AvatarFallback>
                <UserRound className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              ID Client :
              <ToggleTexte className="text-xs" texte={user.id} />
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm">
              <span>{user.email}</span>
              {user.emailVerified ? (
                <span className="flex items-center px-2 py-1 text-green-700 bg-green-200 ">
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  Vérifié
                </span>
              ) : (
                <div className="flex flex-col">
                  {" "}
                  <div
                    className="flex items-center px-2 py-1 text-red-700 bg-red-200 cursor-pointer hover:bg-red-300 hover:text-red-600"
                    onClick={() =>
                      router.push(
                        `/resend-email?email=${encodeURIComponent(
                          user.email as string
                        )}`
                      )
                    }
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Non vérifié
                  </div>
                </div>
              )}
            </div>
            {!user.emailVerified && (
              <div className="w-full p-4 mt-4 border border-gray-300 bg-gray-50 ">
                <p className="font-sans text-xs font-normal">
                  Votre adresse e-mail n'est pas encore vérifiée. Pour assurer
                  la sécurité de votre compte, <br />
                  <span
                    className="font-bold underline cursor-pointer hover:text-primary"
                    role="button"
                    onClick={() =>
                      router.push(
                        `/resend-email?email=${encodeURIComponent(
                          user.email as string
                        )}`
                      )
                    }
                  >
                    Veuillez la vérifier maintenant.
                  </span>
                </p>
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="w-full space-y-6 ">
              <div className="grid w-full gap-6 sm:grid-cols-2">
                <FormInput
                  className="w-full"
                  control={form.control}
                  name="name"
                  label="Nom et prénom"
                  type="text"
                  placeholder="ex : John Doe"
                  isPending={isPending}
                />
                <FormInput
                  control={form.control}
                  disabled
                  name="email"
                  label="Adresse e-mail"
                  type="email"
                  placeholder="ex : johndoe@example.com"
                  isPending={isPending}
                />
                {!user.isOAuth && (
                  <>
                    <FormInput
                      control={form.control}
                      name="password"
                      label="Ancien mot de passe"
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                      isPending={isPending}
                    />
                    <FormInput
                      control={form.control}
                      name="newPassword"
                      label="Nouveau mot de passe"
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                      isPending={isPending}
                    />
                    <FormToggle
                      control={form.control}
                      name="isTwoFactorEnabled"
                      label="Authentification à deux facteurs"
                      description="Activer une sécurité supplémentaire pour la connexion."
                      isPending={isPending}
                    />
                  </>
                )}
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                Mettre à jour le profil
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
