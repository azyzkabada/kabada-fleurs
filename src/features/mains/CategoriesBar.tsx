"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu"
import { Separator } from "@/src/components/ui/separator"

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
    <div className="hidden border-b bg-background md:flex">
      <div className="container flex items-center justify-center max-w-screen-xl px-4 mx-auto">
        {/* Desktop Navigation */}
        <NavigationMenu className="flex items-center justify-center py-2">
          <NavigationMenuList className="flex items-center justify-center">
            {categories.map((category, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className={`${navigationMenuTriggerStyle()} + font-special font-medium`}
                >
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex items-center justify-center w-screen ">
                    <div className="w-[800px]">
                      <ul className="grid gap-3 p-2 py-4 md:grid-cols-2">
                        {category.items.map((item, subIndex) => (
                          <li key={subIndex}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="flex flex-col w-full p-3 space-y-1 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:font-bold hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="w-full font-medium leading-none text-md">
                                  {item.name}
                                </div>
                                <Separator className="w-full mt-2 text-primary" />
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
