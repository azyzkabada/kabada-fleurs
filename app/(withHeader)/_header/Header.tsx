"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// Import de la fonction logout
import { Icons } from "@/src/components/icons"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { cn } from "@/src/lib/cn-utils"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import ProfileDropDown from "@/app/(withHeader)/_header/ProfileDropdown"

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Inbox", href: "/inbox" },
  { label: "Settings", href: "/settings" },
]
// Définition de l'interface utilisateur
interface User {
  name: string
  email: string
  image: string | null
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
interface HeaderProps {
  user: User | null | undefined // `null` si l'utilisateur n'est pas connecté
}
export default function Header({ user }: HeaderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)
  const closeSidebar = () => setSidebarOpen(false)
  // console.log(user)
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Bouton pour ouvrir la Sidebar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu className="size-6" />
            </Button>
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <Icons.logo className="size-10 text-primary" aria-hidden="true" />
              <div className="relative flex flex-col gap-0">
                <span className="text-lg font-semibold font-special">
                  {siteConfig.name}
                </span>
                <span className="-mt-1 text-xs font-thin font-special">
                  {siteConfig.subName}
                </span>
              </div>
            </Link>
          </div>
          <nav>
            <ul className="flex items-center space-x-5">
              <li>
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="size-6" />
                </Button>
              </li>
              <li>
                <Link
                  href={"/shop/cart"}
                  className={cn(
                    buttonVariants({ size: "icon", variant: "ghost" }),
                    "size-6"
                  )}
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="size-6" />
                </Link>
              </li>
              {user ? (
                <>
                  {/* User Info */}

                  <ProfileDropDown user={user} />
                </>
              ) : (
                <>
                  {/* Lien de Connexion */}
                  <li>
                    <Link
                      href="/login"
                      className={cn(
                        buttonVariants({ size: "icon", variant: "ghost" })
                      )}
                      aria-label="User profile"
                    >
                      <User className="size-6" />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Sidebar Content */}
          <aside
            className={cn(
              "fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background shadow-lg transition-transform duration-300 ease-in-out",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold">Logo</span>
                <Button variant="ghost" size="icon" onClick={closeSidebar}>
                  <X className="size-6" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <nav>
                  <ul className="flex flex-col gap-2">
                    {navigationItems.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="flex items-center gap-4 px-4 py-2 text-sm font-medium hover:bg-gray-200"
                          onClick={closeSidebar}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </ScrollArea>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
