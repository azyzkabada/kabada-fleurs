"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { profile } from "@/src/actions/profile"
import { FormInput } from "@/src/components/form-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeCheck, UserRound, XCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Schéma de validation
const profileSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
  dateOfBirth: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "Date de naissance invalide")
    .optional(),
})

// Types dérivés
type ProfileSchema = z.infer<typeof profileSchema>

// Props pour le composant
interface User {
  name: string
  email: string
  phone?: string
  dateOfBirth?: string
  image: string | null
  id: string
  emailVerified: boolean
}

interface SettingsDialogProps {
  user: User
}

export default function SettingsDialog({ user }: SettingsDialogProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      dateOfBirth: user.dateOfBirth || "",
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
    <main className="flex-1 mt-4">
      <div className="mx-auto md:container">
        <div className="space-y-8 bg-white ">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback>
                <UserRound className="w-12 h-12 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="mt-2">
              {user.emailVerified ? (
                <span className="px-2 py-1 text-sm text-green-600 bg-green-100 ">
                  <BadgeCheck className="inline w-4 h-4 mr-1" />
                  Vérifié
                </span>
              ) : (
                <button
                  className="px-2 py-1 text-sm text-red-600 bg-red-100 hover:bg-red-200"
                  onClick={() =>
                    router.push(
                      `/resend-email?email=${encodeURIComponent(user.email)}`
                    )
                  }
                >
                  <XCircle className="inline w-4 h-4 mr-1" />
                  Non vérifié
                </button>
              )}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormInput
                  name="name"
                  label="Nom et prénom"
                  type="text"
                  placeholder="ex : John Doe"
                  control={form.control}
                  className="w-full"
                  isPending={isPending}
                />
                <FormInput
                  name="phone"
                  label="Numéro de téléphone"
                  type="tel"
                  placeholder="ex : +33123456789"
                  control={form.control}
                  className="w-full"
                  isPending={isPending}
                />
              </div>
              <FormInput
                name="dateOfBirth"
                label="Date de naissance"
                type="date"
                placeholder="ex : 1990-01-01"
                control={form.control}
                className="w-full"
                isPending={isPending}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Mettre à jour
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
