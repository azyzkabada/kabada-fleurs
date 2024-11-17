"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/src/components/ui/button"

import { siteConfig } from "@/config/site"

export default function HeroSection() {
  return (
    <section className="px-4 py-10 ">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <h1 className="text-xl font-extrabold leading-tight tracking-tighter font-special md:text-3xl lg:text-4xl">
            Beautifully designed components
            <span className="block mt-2 text-primary">
              built with Radix UI and Tailwind CSS.
            </span>
          </h1>
          <p className="mt-4 max-w-[600px] text-lg text-muted-foreground">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. And Next.js 13 Ready.
          </p>
          <div className="flex flex-col gap-4 mt-8 sm:flex-row">
            <Link
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              GitHub
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
