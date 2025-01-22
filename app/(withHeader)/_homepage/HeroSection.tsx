"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/src/components/ui/button"

export default function HeroSection() {
  return (
    <section className="container px-4 py-10">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <h1 className="text-xl font-extrabold leading-tight tracking-tighter font-special md:text-3xl lg:text-4xl">
            Offrez la beauté des fleurs
            <span className="block mt-2 text-primary">
              pour chaque occasion spéciale.
            </span>
          </h1>
          <p className="mt-4 max-w-[600px] text-lg text-muted-foreground">
            Découvrez notre sélection de bouquets magnifiquement conçus et de
            cadeaux personnalisés. Livraison rapide, soin garanti, et service
            impeccable.
          </p>
          <div className="flex flex-col gap-4 mt-8 sm:flex-row">
            <Link
              href={"/"}
              target="_self"
              className={buttonVariants({ size: "lg" })}
            >
              Explorez notre boutique
            </Link>
            <Link
              target="_self"
              href="/about"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              En savoir plus
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/authBanner.jpg"
            alt="Beautifully designed components"
            width={200}
            height={200}
            className="w-full h-auto rounded-sm shadow-lg "
            priority
          />
        </div>
      </div>
    </section>
  )
}
