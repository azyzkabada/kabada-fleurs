"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { ChevronDown } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    items: [
      { name: "Laptops", href: "/electronics/laptops" },
      { name: "Smartphones", href: "/electronics/smartphones" },
      { name: "Tablets", href: "/electronics/tablets" },
      { name: "Accessories", href: "/electronics/accessories" },
    ],
  },
  {
    name: "Home & Garden",
    items: [
      { name: "Furniture", href: "/home-garden/furniture" },
      { name: "Home Decor", href: "/home-garden/home-decor" },
      { name: "Kitchen", href: "/home-garden/kitchen" },
      { name: "Outdoor", href: "/home-garden/outdoor" },
    ],
  },
  {
    name: "Fashion",
    items: [
      { name: "Men's Clothing", href: "/fashion/men" },
      { name: "Women's Clothing", href: "/fashion/women" },
      { name: "Accessories", href: "/fashion/accessories" },
      { name: "Shoes", href: "/fashion/shoes" },
    ],
  },
  {
    name: "Beauty",
    items: [
      { name: "Skincare", href: "/beauty/skincare" },
      { name: "Makeup", href: "/beauty/makeup" },
      { name: "Haircare", href: "/beauty/haircare" },
      { name: "Fragrances", href: "/beauty/fragrances" },
    ],
  },
  {
    name: "Sports",
    items: [
      { name: "Fitness Equipment", href: "/sports/fitness" },
      { name: "Outdoor Sports", href: "/sports/outdoor" },
      { name: "Team Sports", href: "/sports/team" },
      { name: "Sportswear", href: "/sports/sportswear" },
    ],
  },
]

export default function CategoriesBar() {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-center px-4">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden py-2 md:flex">
          <NavigationMenuList className="flex items-center justify-center">
            {categories.map((category, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] items-center justify-center gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {category.items.map((item, subIndex) => (
                      <li key={subIndex}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" className="my-4 w-full justify-between">
              Categories
              <ChevronDown className="size-4 opacity-50" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
            <nav className="grid gap-4 p-6">
              {categories.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {category.name}
                  </h2>
                  <div className="grid gap-1.5">
                    {category.items.map((item, subIndex) => (
                      <Link
                        key={subIndex}
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
