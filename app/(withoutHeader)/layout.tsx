import { NextPage } from "next"

// import { SiteHeader } from "@/src/components/site-header"

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
  params: { showHeader?: boolean }
}

const Layout: NextPage<LayoutProps> = ({ children, params, modal }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* {modal} */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default Layout
