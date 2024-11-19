"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/src/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"
import { cn } from "@/src/lib/cn-utils"

import { menuItems } from "./menu-items.contants"

const SideBar = () => {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="none"
      className="hidden w-full border-b md:h-screen md:flex md:w-64 md:border-r md:border-b-0 md:border-l "
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full flex items-center gap-2 p-2 justify-start",
                      pathname === item.href && "bg-primary text-white"
                    )}
                    href={item.href}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar
