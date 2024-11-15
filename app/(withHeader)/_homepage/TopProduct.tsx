"use client"

import { useCallback } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import useEmblaCarousel from "embla-carousel-react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Flower,
  Gift,
  Heart,
  Leaf,
  Sun,
  Tag,
  Truck,
} from "lucide-react"

export default function TopCategories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  const categories = [
    {
      name: "Bouquets de Fleurs",
      icon: Flower,
      href: "#",
      description: "Des bouquets pour toutes les occasions",
    },
    {
      name: "Plantes d'intérieur",
      icon: Leaf,
      href: "#",
      description: "Apportez une touche verte à votre intérieur",
    },
    {
      name: "Abonnements Floraux",
      icon: Calendar,
      href: "#",
      description: "Recevez des fleurs fraîches chaque semaine",
    },
    {
      name: "Livraison Express",
      icon: Truck,
      href: "#",
      description: "Livrez vos fleurs rapidement et en toute sécurité",
    },
    {
      name: "Cadeaux & Accessoires",
      icon: Gift,
      href: "#",
      description: "Complétez vos fleurs avec des cadeaux uniques",
    },
    {
      name: "Occasions Spéciales",
      icon: Heart,
      href: "#",
      description: "Fleurs pour mariages, anniversaires et plus",
    },
    {
      name: "Fleurs Séchées",
      icon: Sun,
      href: "#",
      description: "Des compositions durables et élégantes",
    },
    {
      name: "Promotions",
      icon: Tag,
      href: "#",
      description: "Découvrez nos offres spéciales et réductions",
    },
    {
      name: "Entretien des Plantes",
      icon: Droplet,
      href: "#",
      description: "Conseils et produits pour prendre soin de vos plantes",
    },
  ]

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Top Catégories</h2>
          <p className="text-muted-foreground">
            Découvrez nos services les plus populaires
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex-[0_0_150px] min-w-0 mr-4 last:mr-0"
                >
                  <Link href={category.href}>
                    <Card className="h-full transition-colors hover:bg-muted/50">
                      <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <category.icon className="w-8 h-8 mb-2 text-primary" />
                        <h3 className="text-sm font-medium">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2 bg-background top-1/2"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 p-0 translate-x-1/2 -translate-y-1/2 bg-background top-1/2"
            onClick={scrollNext}
          >
            <ChevronRight className="w-4 h-4 p-0" />
          </Button>
        </div>
      </div>
    </section>
  )
}
