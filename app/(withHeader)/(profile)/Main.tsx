"use client"

import { useTransition } from "react"
import { profile } from "@/src/actions/profile"
import { FormInput } from "@/src/components/auth/form-input"
import { FormToggle } from "@/src/components/auth/form-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/src/components/ui/sidebar"
import ToggleTexte from "@/src/components/utils/hiddenTexte"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bell, Home, Navigation, Palette, UserRound } from "lucide-react"
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
}

// Props pour le composant de dialogue des paramètres
interface SettingsDialogProps {
  user: ExtendedUser
}

const navItems = [
  { name: "Notifications", icon: Bell },
  { name: "Navigation", icon: Navigation },
  { name: "Accueil", icon: Home },
  { name: "Apparence", icon: Palette },
]

export default function SettingsDialog({ user }: SettingsDialogProps) {
  const [isPending, startTransition] = useTransition()

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
    <SidebarProvider className="flex flex-col min-h-screen md:flex-row md:border-r">
      <Sidebar
        collapsible="none"
        className="hidden w-full border-b md:h-screen md:flex md:w-64 md:border-r md:border-b-0 md:border-l"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center p-2 space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex items-center h-16">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Paramètres</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profil</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

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
              <h1 className="mt-4 space-y-2 text-2xl font-bold">{user.name}</h1>
              {/* <Separator /> */}
              <div className="flex items-center justify-center gap-4 text-xs">
                ID Client :
                <ToggleTexte className="text-xs" texte={user.id} />
              </div>
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
                    </>
                  )}
                </div>
                <FormToggle
                  control={form.control}
                  name="isTwoFactorEnabled"
                  label="Authentification à deux facteurs"
                  description="Activer une sécurité supplémentaire pour la connexion."
                  isPending={isPending}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  Mettre à jour le profil
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
