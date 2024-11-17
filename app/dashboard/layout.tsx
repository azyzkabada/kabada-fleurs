import type { Metadata } from "next"
import { cookies } from "next/headers"
import KBar from "@/src/components/kbar"
import AppSidebar from "@/src/components/layout/app-sidebar"
import Header from "@/src/components/layout/header"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  )
}
