"use client"

import Link from "next/link"
import { Icons } from "@/src/components/icons"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { cn } from "@/src/lib/cn-utils"
import {
  BarChart2,
  Home,
  Inbox,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  Sun,
  User,
  Users,
} from "lucide-react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"

const navigationItems = [
  { label: "Home", icon: Home },
  { label: "Analytics", icon: BarChart2 },
  { label: "Users", icon: Users },
  { label: "Inbox", icon: Inbox },
  { label: "Settings", icon: Settings },
]

export default function SiteHeader() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-6">
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2">
          {navigationItems.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              className="flex w-full items-center justify-start gap-4 transition-all duration-300"
            >
              <Icon className="size-6" />
              <span className="text-sm font-medium">{label}</span>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center justify-center"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className="size-6" />
        ) : (
          <Sun className="size-6" />
        )}
      </Button>
    </div>
  )

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-screen">
        <Sheet>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <header className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo et bouton du menu latéral */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <Icons.logo className="size-10" />
              <span className="inline-block text-lg font-semibold">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Button
              className="block md:hidden"
              variant="ghost"
              size="icon"
              aria-label="Search"
            >
              <Search className="size-6" />
            </Button>
            <Button
              variant="ghost"
              className="hidden flex-col items-center text-sm font-semibold md:flex "
            >
              <span>RECHERCHER</span>
              <div className="mt-1 h-px w-full bg-foreground"></div>
            </Button>
            <Link
              href="/connexion"
              className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
              aria-label="Profil utilisateur"
            >
              <User className="size-6" />
            </Link>
            <Button variant="ghost" size="icon" aria-label="Panier">
              <ShoppingBag className="size-6" />
              <span className="sr-only">Panier (0)</span>
            </Button>
          </nav>
        </div>
      </header>
    </>
  )
}
