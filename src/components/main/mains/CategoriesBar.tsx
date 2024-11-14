import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React from 'react'

export const CategoriesBar: React.FC = () => {
    return (
        <header className="fixed top-0 z-50 w-full bg-black shadow-md">
            <div className="container mx-auto flex items-center justify-center px-4 py-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-4">
                        {/* Example Category 1 */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-white font-semibold">
                                Electronics
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="absolute mt-2 bg-white text-black rounded-md shadow-lg">
                                <div className="grid w-[200px] p-4">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Laptops
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Smartphones
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Example Category 2 */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-white font-semibold">
                                Home & Garden
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="absolute mt-2 bg-white text-black rounded-md shadow-lg">
                                <div className="grid w-[200px] p-4">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Furniture
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Home Decor
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Example Category 3 */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-white font-semibold">
                                Fashion
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="absolute mt-2 bg-white text-black rounded-md shadow-lg">
                                <div className="grid w-[200px] p-4">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Men's Clothing
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                                        >
                                            Women's Clothing
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}
