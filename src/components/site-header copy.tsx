// "use client"

// import { useCallback, useState } from "react"
// import Link from "next/link"
// import { Icons } from "@/src/components/icons"
// import { Button, buttonVariants } from "@/src/components/ui/button"
// import { ScrollArea } from "@/src/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
// import { cn } from "@/src/lib/cn-utils"
// import {
//   BarChart2,
//   ChevronLeft,
//   Home,
//   Inbox,
//   Menu,
//   Moon,
//   Search,
//   Settings,
//   ShoppingBag,
//   Sun,
//   User,
//   Users,
// } from "lucide-react"
// import { useTheme } from "next-themes"

// import { siteConfig } from "@/config/site"

// const navigationItems = [
//   { label: "Home", icon: Home },
//   { label: "Analytics", icon: BarChart2 },
//   { label: "Users", icon: Users },
//   { label: "Inbox", icon: Inbox },
//   { label: "Settings", icon: Settings },
// ]

// export default function SiteHeader() {
//   const [isCollapsed, setIsCollapsed] = useState(true)
//   const { setTheme, theme } = useTheme()

//   const toggleTheme = useCallback(
//     () => setTheme(theme === "light" ? "dark" : "light"),
//     [setTheme, theme]
//   )
//   const toggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), [])

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className="flex flex-col h-full gap-6">
//       {!isMobile && (
//         <Button
//           variant="ghost"
//           size="icon"
//           className={cn(
//             "flex justify-center",
//             isCollapsed ? "w-full" : "items-center"
//           )}
//           onClick={toggleCollapse}
//         >
//           {isCollapsed ? (
//             <Menu className="w-6 h-6" />
//           ) : (
//             <ChevronLeft className="w-6 h-6" />
//           )}
//         </Button>
//       )}
//       <ScrollArea className="flex-1">
//         <nav className="flex flex-col gap-2">
//           {navigationItems.map(({ label, icon: Icon }) => (
//             <Button
//               key={label}
//               variant="ghost"
//               className={cn(
//                 "flex items-center gap-4 transition-all duration-300",
//                 isCollapsed && !isMobile
//                   ? "justify-center"
//                   : "justify-start w-full"
//               )}
//             >
//               <Icon className="w-6 h-6" />
//               {(!isCollapsed || isMobile) && (
//                 <span className="text-sm font-medium">{label}</span>
//               )}
//             </Button>
//           ))}
//         </nav>
//       </ScrollArea>
//       <Button
//         variant="ghost"
//         size="icon"
//         className={cn(
//           "flex justify-center",
//           isCollapsed && !isMobile ? "w-full" : "items-center"
//         )}
//         onClick={toggleTheme}
//       >
//         {theme === "light" ? (
//           <Moon className="w-6 h-6" />
//         ) : (
//           <Sun className="w-6 h-6" />
//         )}
//       </Button>
//     </div>
//   )

//   return (
//     <>
//       <div className="fixed top-0 left-0 z-40 h-screen">
//         <aside
//           className={cn(
//             "hidden md:flex flex-col border-r bg-background p-4 transition-all duration-300",
//             isCollapsed ? "w-[100px]" : "w-[250px]"
//           )}
//         >
//           <SidebarContent />
//         </aside>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="fixed z-50 md:hidden top-4 left-4"
//             >
//               <Menu className="w-6 h-6" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-64 p-0">
//             <SidebarContent isMobile />
//           </SheetContent>
//         </Sheet>
//       </div>
//       <header className="sticky top-0 z-30 w-full border-b bg-background">
//         <div className="container flex items-center justify-between h-16">
//           <div className="flex items-center gap-6 md:gap-10">
//             <Link
//               href="/"
//               className="flex items-center space-x-2 text-foreground"
//             >
//               <Icons.logo className="w-10 h-10" />
//               <span className="inline-block text-lg font-semibold">
//                 {siteConfig.name}
//               </span>
//             </Link>
//           </div>
//           <nav className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 aria-label="Search"
//               >
//                 <Search className="w-6 h-6" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex-col items-center hidden text-sm font-semibold md:flex"
//               >
//                 <span>RECHERCHER</span>
//                 <div className="h-[1px] w-full bg-foreground mt-1"></div>
//               </Button>
//             </div>
//             <Link
//               href="/connexion"
//               className={buttonVariants({ size: "icon", variant: "ghost" })}
//               aria-label="User Profile"
//             >
//               <User className="w-6 h-6" />
//             </Link>
//             <Button variant="ghost" size="icon" aria-label="Shopping Cart">
//               <ShoppingBag className="w-6 h-6" />
//               <span className="sr-only">Panier (0)</span>
//             </Button>
//           </nav>
//         </div>
//       </header>
//     </>
//   )
// }

"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { Icons } from "@/src/components/icons"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { cn } from "@/src/lib/cn-utils"
import {
  BarChart2,
  ChevronLeft,
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
} from "lucide-react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"

const navigationItems = [
  { label: "Home", icon: Home },
  { label: "Analytics", icon: BarChart2 },
  { label: "Users", icon: Users },
  { label: "Inbox", icon: Inbox },
  { label: "Settings", icon: Settings },
]

export default function SiteHeader() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [setTheme, theme]
  )
  const toggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), [])

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex h-full flex-col gap-6">
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex justify-center",
            isCollapsed ? "w-full" : "items-center"
          )}
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <Menu className="size-6" />
          ) : (
            <ChevronLeft className="size-6" />
          )}
        </Button>
      )}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2">
          {navigationItems.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              className={cn(
                "flex items-center gap-4 transition-all duration-300",
                isCollapsed && !isMobile
                  ? "justify-center"
                  : "w-full justify-start"
              )}
            >
              <Icon className="size-6" />
              {(!isCollapsed || isMobile) && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "flex justify-center",
          isCollapsed && !isMobile ? "w-full" : "items-center"
        )}
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className="size-6" />
        ) : (
          <Sun className="size-6" />
        )}
      </Button>
    </div>
  )

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-screen">
        <aside
          className={cn(
            "hidden flex-col border-r bg-background p-4 transition-all duration-300 md:flex",
            isCollapsed ? "w-[100px]" : "w-[250px]"
          )}
        >
          <SidebarContent />
        </aside>
        <Sheet>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>
      <header className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo + Sidebar Toggle */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className=""
                  aria-label="Menu"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent isMobile />
              </SheetContent>
            </Sheet>
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <Icons.logo className="size-10" />
              <span className="inline-block text-lg font-semibold">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Search"
              >
                <Search className="size-6" />
              </Button>
              <Button
                variant="ghost"
                className="hidden flex-col items-center text-sm font-semibold md:flex"
              >
                <span>RECHERCHER</span>
                <div className="mt-1 h-px w-full bg-foreground"></div>
              </Button>
            </div>
            <Link
              href="/connexion"
              className={buttonVariants({ size: "icon", variant: "ghost" })}
              aria-label="User Profile"
            >
              <User className="size-6" />
            </Link>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingBag className="size-6" />
              <span className="sr-only">Panier (0)</span>
            </Button>
          </nav>
        </div>
      </header>
    </>
  )
}
