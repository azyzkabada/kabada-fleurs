"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import useEmblaCarousel from "embla-carousel-react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flower,
  Gift,
  Leaf,
  Truck,
} from "lucide-react"

type Category = {
  name: string
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
  href: string
  description?: string
}

const fetchCategories = async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      name: "Fleurs",
      icon: Flower,
      href: "#",
      description: "Bouquets pour toutes occasions",
    },
    {
      name: "Plantes",
      icon: Leaf,
      href: "#",
      description: "Une touche verte à votre intérieur",
    },
    {
      name: "Abonnements",
      icon: Calendar,
      href: "#",
      description: "Fleurs fraîches chaque semaine",
    },
    {
      name: "Livraison",
      icon: Truck,
      href: "#",
      description: "Livraison rapide et sécurisée",
    },
    {
      name: "Cadeaux",
      icon: Gift,
      href: "#",
      description: "Complétez avec des cadeaux uniques",
    },
    {
      name: "Cadeauxssss",
      icon: Gift,
      href: "#",
      description: "Complétez avec des cadeaux uniques",
    },
    {
      name: "Cadeauxs",
      icon: Gift,
      href: "#",
      description: "Complétez avec des cadeaux uniques",
    },
  ]
}

const SkeletonCategory = ({ isMobile }: { isMobile: boolean }) => (
  <div
    className={`flex-shrink-0 ${
      isMobile ? "w-20 mr-2" : "w-[200px] mr-4"
    } last:mr-0`}
  >
    <div className="h-full border">
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <Skeleton
          className={`${isMobile ? "w-10 h-10" : "w-8 h-8"} mb-2 rounded-full`}
        />
        <Skeleton className={`${isMobile ? "w-16" : "w-3/4"} h-4 mb-2`} />
        {!isMobile && <Skeleton className="w-1/2 h-3" />}
      </div>
    </div>
  </div>
)

export default function ResponsiveCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768)
    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  const checkButtons = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    checkButtons()
    emblaApi.on("select", checkButtons)
    emblaApi.on("reInit", checkButtons)
    return () => {
      emblaApi.off("select", checkButtons)
      emblaApi.off("reInit", checkButtons)
    }
  }, [emblaApi, checkButtons])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div className="w-full py-4 md:py-8 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Nos catégories
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {categories.length > 0
                ? categories.map((category) => (
                    <div
                      key={category.name}
                      className={`flex-shrink-0 ${
                        isMobile ? "w-20 mr-2" : "w-[200px] mr-4"
                      } last:mr-0`}
                    >
                      <Link href={category.href}>
                        <Card className="h-full transition-colors hover:bg-muted/50">
                          <CardContent className="flex flex-col items-center justify-center h-full p-2 text-center md:p-4">
                            <category.icon
                              className={`w-8 h-8 mb-2 text-primary`}
                            />
                            <h3 className="text-xs font-medium md:text-sm">
                              {category.name}
                            </h3>
                            {!isMobile && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {category.description}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))
                : Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonCategory key={idx} isMobile={isMobile} />
                  ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm z-10 ${
              canScrollPrev ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm z-10 ${
              canScrollNext ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
