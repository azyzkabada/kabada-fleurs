"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { cn } from "@/src/lib/cn-utils"
import { X } from "lucide-react"

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Inbox", href: "/inbox" },
  { label: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false) // État local pour ouvrir/fermer la sidebar

  const toggleSidebar = () => setIsOpen((prev) => !prev) // Basculer entre ouvert et fermé
  const closeSidebar = () => setIsOpen(false) // Forcer la fermeture

  return (
    <>
      {/* Bouton pour ouvrir la sidebar */}
      <Button onClick={toggleSidebar} className="fixed z-50 top-4 left-4">
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header de la Sidebar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold">Logo</span>
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="size-6" />
            </Button>
          </div>

          {/* Contenu scrollable */}
          <ScrollArea className="flex-1">
            <nav>
              <ul className="flex flex-col gap-2">
                {navigationItems.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-4 px-4 py-2 text-sm font-medium hover:bg-gray-200"
                      onClick={closeSidebar} // Fermer la sidebar après navigation
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

      {/* Overlay pour fermer la sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
