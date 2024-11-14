"use client"

import React from "react"
import { cn } from "@/src/lib/cn-utils"

interface HeroSectionProps {
  navigation: string[]
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigation }) => {
  return (
    <section className="h-screen w-full ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h2 className="mb-4 font-serif text-6xl font-light italic tracking-wide">
          {"Endless autumn."}
        </h2>
        <p className="max-w-md text-sm font-light tracking-wide">
          Embrace the rich season palette and earthy blends. Step into a
          landscape where time stands still.
        </p>
      </div>

      <nav className="absolute bottom-8 left-0 w-full overflow-x-auto">
        <ul className="flex justify-center gap-6 px-4 text-sm text-white">
          {navigation.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={cn(
                  "whitespace-nowrap hover:opacity-75",
                  item === "ENDLESS AUTUMN" && "font-medium"
                )}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
