import Link from "next/link"
import { MainNav } from "@/src/components/main-nav"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { buttonVariants } from "@/src/components/ui/button"
import { Search, ShoppingBag, User } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 space-x-0 ">
        {/* Left Section: Logo and Navigation */}
        <MainNav />

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex items-center">
              {/* Mobile View */}
              <button className="flex p-2 md:hidden" aria-label="Search">
                <Search className="w-6 h-6" />
              </button>
              {/* Large Screen View */}
              <button className="flex-col items-center hidden text-sm font-semibold text-foreground md:flex">
                <span>RECHERCHER</span>
                <div className="h-[1px] w-full bg-foreground mt-1"></div>
              </button>
            </div>

            {/* User Profile */}
            <Link
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
              aria-label="User Profile"
              href={"/connexion"}
            >
              <User className="w-6 h-6" />
            </Link>

            {/* Shopping Cart */}
            <button
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="sr-only">Panier (0)</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
