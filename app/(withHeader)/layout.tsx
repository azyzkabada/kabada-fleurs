"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Icons } from "@/src/components/icons"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import CategoriesBar from "@/src/features/mains/CategoriesBar"
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
  X,
} from "lucide-react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"

const navigationItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Analytics", icon: BarChart2, href: "/analytics" },
  { label: "Users", icon: Users, href: "/users" },
  { label: "Inbox", icon: Inbox, href: "/inbox" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0  top-0 z-50 h-screen w-64 border-r bg-background shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center justify-between">
            <Icons.logo className="size-10 text-primary" aria-hidden="true" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="size-6" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav>
              <ul className="flex flex-col gap-2">
                {navigationItems.map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={cn(
                        "flex w-full items-center gap-4 px-4 py-2  text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none "
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
          <Button
            variant="ghost"
            size="icon"
            className="mt-auto"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <Moon className="size-6" />
            ) : (
              <Sun className="size-6" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 w-full border-b bg-background/60 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Si vous souhaitez supprimer le bouton Menu, commentez ou supprimez le bloc suivant */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
                onMouseEnter={() => setIsOpen(true)}
              >
                <Menu className="size-6" />
              </Button>
              <Link
                href="/"
                className="flex items-center space-x-2 text-foreground"
                // onMouseEnter={() => setIsOpen(true)}
              >
                <Icons.logo
                  className="size-10 text-primary"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col gap-0">
                  <span className="font-special text-lg font-semibold">
                    {siteConfig.name}
                  </span>
                  <span className="-mt-1 font-special text-xs font-thin">
                    {siteConfig.subName}
                  </span>
                </div>
              </Link>
            </div>
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Button variant="ghost" size="icon" aria-label="Search">
                    <Search className="size-6" />
                  </Button>
                </li>
                <li>
                  <Link
                    href="/connexion"
                    className={cn(
                      buttonVariants({ size: "icon", variant: "ghost" })
                    )}
                    aria-label="User profile"
                  >
                    <User className="size-6" />
                  </Link>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Shopping cart"
                  >
                    <ShoppingBag className="size-6" />
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <CategoriesBar />
        <main className="container flex-1">{children}</main>
      </div>
    </div>
  )
}
