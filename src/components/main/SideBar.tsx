"use client"

import React from "react"
import { cn } from "@/src/lib/cn-utils"
import { ChevronLeft, Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const categoriesMenu = [
  {
    label: "En Vedette",
    items: ["NOUVEAUTÉS", "NANUSHKA", "NOËL"],
  },
  {
    label: "Pièces",
    items: ["CHAMBRE", "SALON", "SALLE À MANGER", "CUISINE", "SALLE DE BAIN"],
  },
  {
    label: "Produits",
    items: ["VÊTEMENTS ET CHAUSSURES", "MEUBLES"],
  },
]

const DéclencheurSidebar = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <ChevronLeft />
      <span className="sr-only">Basculer la barre latérale</span>
    </Button>
  )
})
DéclencheurSidebar.displayName = "DéclencheurSidebar"

export default function BarreLatéralePrincipale() {
  return (
    <Sidebar className="border-r z-50 bg-white">
      <SidebarHeader className="px-6 py-4 flex  bg-white">
        <DéclencheurSidebar
          variant="ghost"
          size="icon"
          className="text-black h-9  w-9"
        />
        <h1 className="text-2xl font-bold tracking-tight">KABADA</h1>
      </SidebarHeader>
      <SidebarContent className="px-4  bg-white">
        <SidebarGroup className="py-4">
          <SidebarGroupContent className="relative">
            <SidebarInput placeholder="Rechercher..." />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="mb-4" />
        {categoriesMenu.map((category, index) => (
          <SidebarGroup key={category.label}>
            <SidebarGroupLabel>{category.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.items.map((item) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton asChild>
                      <a href="#" className="w-full">
                        {item}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            {index < categoriesMenu.length - 1 && (
              <Separator className="my-4" />
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4  bg-white font-bold">
        <Button className="w-full  font-bold">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Voir le Panier
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
