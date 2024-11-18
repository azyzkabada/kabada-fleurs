import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Icons } from "@/src/components/icons"
import { buttonVariants } from "@/src/components/ui/button"
import { cn } from "@/src/lib/cn-utils"

import { siteConfig } from "@/config/site"

import { RegisterForm } from "../_components/register-form"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  if (searchParams.error) redirect(`/error?message=${searchParams.error}`)
  return (
    <>
      <div className="container relative flex flex-col items-center justify-center h-screen lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Barre supérieure pour mobile */}
        <div className="absolute z-20 flex items-center justify-between lg:justify-end top-6 left-6 right-6">
          {/* Logo */}
          <div className="flex items-center text-lg font-medium font-special lg:hidden">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <Icons.logo className="size-10 text-primary" aria-hidden="true" />
              <div className="relative flex flex-col gap-0">
                <span className="text-lg font-semibold font-special">
                  {siteConfig.name}
                </span>
                <span className="-mt-1 text-xs font-thin font-special">
                  {siteConfig.subName}
                </span>
              </div>
            </Link>
          </div>
          {/* Bouton Retour à l'accueil */}
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "text-sm")}
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Sidebar avec l'image et la citation */}
        <div className="relative flex-col hidden h-full p-6 pl-8 text-white lg:flex dark:border-r">
          <div className="absolute inset-0">
            <Image
              src="/authBanner.jpg"
              alt="Fleuriste Étoilé background"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
          </div>
          <div className="absolute z-20 flex items-center font-medium align-middle text-l font-special">
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group flex flex-row items-center px-4 py-2 transition-colors hover:bg-accent"
              )}
              href="/"
            >
              {/* Icône */}
              <Icons.logo className="w-10 h-10 mr-2 text-primary group-hover:text-primary" />

              {/* Texte principal */}
              <span className="text-lg font-medium group-hover:text-black">
                {siteConfig.name}
              </span>

              {/* Sous-texte */}
              <span className="ml-2 text-sm group-hover:text-black">
                - {siteConfig.subName}
              </span>
            </Link>
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

        {/* Formulaire d'inscription */}
        <div className="flex items-center justify-center lg:p-8">
          <div className="flex flex-col justify-center w-full max-w-md mx-auto space-y-6">
            <RegisterForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
              En vous inscrivant, vous acceptez nos{" "}
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
