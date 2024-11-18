import React from "react"
import { Button } from "@/src/components/ui/button"
import { SidebarTrigger } from "@/src/components/ui/sidebar"
import { Search, ShoppingBag, User2 } from "lucide-react"

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-black shadow-md">
      <div className="flex items-center justify-between p-4 text-white">
        {/* Left Section: Logo and Sidebar */}
        <div className="flex items-center gap-4">
          <SidebarTrigger
            variant="ghost"
            size="icon"
            className="p-2 text-white size-9"
          />
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-light tracking-widest">KABADA</h1>
          </a>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* Mobile view */}
            <Button
              variant="ghost"
              size="icon"
              className="flex p-2 text-white md:hidden"
            >
              <Search className="size-6" />
            </Button>

            {/* Large screen view */}
            <div className="flex-col items-center hidden text-sm font-semibold text-white md:flex">
              <span>RECHERCHER</span>
              <div className="w-full h-px mt-1 bg-white"></div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="p-2 ">
            <User2 className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" className="relative p-2 ">
            <ShoppingBag className="size-6" />
            <span className="sr-only">Panier (0)</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
