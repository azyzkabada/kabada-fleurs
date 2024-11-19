"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"

import { menuItems } from "./menu-items.contants"

const NavBarMobile = () => {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background">
      <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-hide">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href} passHref>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center min-w-[5rem] h-16 ${
                pathname === item.href ? "bg-primary text-white" : ""
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
