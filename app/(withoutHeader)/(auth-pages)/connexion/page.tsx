import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "@/src/components/icons"
import { buttonVariants } from "@/src/components/ui/button"
import { cn } from "@/src/lib/cn-utils"

import { UserAuthForm } from "./_components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentification",
  description: "Formulaires d'authentification conçus à l'aide des composants.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Retour a l'acceuil
        </Link>
        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              className=""
              src="/authBanner.jpg"
              alt="Fleuriste Étoilé background"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary n to-transparent to-40%"></div>
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="h-8 mr-2 w-9 font-sm" />
            Kabada - Atelier Vegetale
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Ce site m'a permis de commander des fleurs magnifiques et
                d'offrir des cadeaux personnalisés à mes proches avec une
                facilité incroyable.&rdquo;
              </p>
              <footer className="text-sm">Sihem</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Créez un compte
              </h1>
              <p className="text-sm text-muted-foreground">
                Saisissez votre adresse e-mail ci-dessous pour créer votre
                compte.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
              En cliquant sur continuer, vous acceptez nos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
