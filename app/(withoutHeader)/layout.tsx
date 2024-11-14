import { NextPage } from "next"
import { SiteHeader } from "@/src/components/site-header"

interface LayoutProps {
  children: React.ReactNode
  params: { showHeader?: boolean }
}

const Layout: NextPage<LayoutProps> = ({ children, params }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default Layout
