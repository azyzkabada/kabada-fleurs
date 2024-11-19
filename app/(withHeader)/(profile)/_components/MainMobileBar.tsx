"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Award, CreditCard, Home, Settings } from "lucide-react"

const menuItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "cards", label: "Cards", icon: CreditCard, href: "/cards" },
  { id: "awards", label: "Awards", icon: Award, href: "/awards" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

const NavBarMobile = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="flex items-center justify-between px-4 py-2">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href} passHref>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center h-16 w-16 ${
                pathname === item.href ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="mt-1 text-xs">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBarMobile
