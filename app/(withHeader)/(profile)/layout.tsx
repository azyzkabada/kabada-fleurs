"use client"

import { SidebarProvider } from "@/src/components/ui/sidebar"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { Bell, Home, Navigation, Palette } from "lucide-react"

import NavBarMobile from "@/app/(withHeader)/(profile)/_components/MobileBar"
import SideBar from "@/app/(withHeader)/(profile)/_components/SideBar"

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}
const navItems = [
  { name: "Notifications", icon: Bell, isActive: true, link: "/" },
  { name: "Navigation", icon: Navigation },
  { name: "Accueil", icon: Home },
  { name: "Apparence", icon: Palette },
]
interface User {
  name: string
  email: string
  image: string | null
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
export default function Layout({ children, modal }: LayoutProps) {
  const isMobile = useIsMobile()
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <main className="container flex-1 ">
            {/* {!isMobile && (
              <header className="sticky top-0 z-10 border-b md:border-x bg-background">
                <div className="container flex items-center justify-center h-16 ">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Paramètres</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Profil</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
            )} */}
            {/* Sidebar */}
            <SidebarProvider className="flex flex-col min-h-[70vh] md:flex-row md:border-r">
              {isMobile ? <NavBarMobile /> : <SideBar />}
              {children}
            </SidebarProvider>
          </main>
          {modal}
        </div>
      </div>
    </>
  )
}
