import CategoriesBar from "@/src/features/mains/CategoriesBar"
import { currentUser } from "@/src/lib/auth"

import Header from "./_header/Header"

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function Layout({ children, modal }: LayoutProps) {
  const user = await currentUser()
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <Header user={user} />
          <CategoriesBar />
          <main className="container flex-1">{children}</main>
          {modal}
        </div>
      </div>
    </>
  )
}
