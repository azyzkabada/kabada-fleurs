import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Search, ShoppingBag, User2 } from 'lucide-react'
import React from 'react'

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50  bg-black shadow-md">
            <div className="flex items-center justify-between px-4 py-4 text-white">
                {/* Left Section: Logo and Sidebar */}
                <div className="flex items-center gap-4">
                    <SidebarTrigger
                        variant="ghost"
                        size="icon"
                        className="text-white p-2 size-9"
                    />
                    <a
                        href="/"
                        className="flex items-center"
                    >
                        <h1 className="text-2xl font-light tracking-widest">
                            KABADA
                        </h1>
                    </a>
                </div>

                {/* Right Section: Action Buttons */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        {/* Mobile view */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex md:hidden p-2 text-white"
                        >
                            <Search className="h-6 w-6" />
                        </Button>

                        {/* Large screen view */}
                        <div className="hidden md:flex flex-col items-center text-white text-sm font-semibold">
                            <span>RECHERCHER</span>
                            <div className="h-[1px] w-full bg-white mt-1"></div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 "
                    >
                        <User2 className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative p-2 "
                    >
                        <ShoppingBag className="h-6 w-6" />
                        <span className="sr-only">Panier (0)</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
