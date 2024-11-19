// menuItems.ts
import { Bell, Home, Settings, User } from "lucide-react"

export interface MenuItem {
  id: string
  name: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
}

export const menuItems: MenuItem[] = [
  { id: "home", name: "Home", label: "Home", icon: Home, href: "/" },
  {
    id: "cards",
    name: "Cards",
    label: "Cards",
    icon: User,
    href: "/profile",
  },

  {
    id: "settings",
    name: "Settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "settings",
    name: "Settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "notifications",
    name: "Notifications",
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
]
