import { currentUser } from "@/src/lib/auth"

import Header from "./_header/Header"

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}
interface User {
  name: string
  email: string
  image: string | null
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
export default async function Layout({ children, modal }: LayoutProps) {
  const user = (await currentUser()) as User | null
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <Header user={user} />

          <main className="flex-1">{children}</main>
          {modal}
        </div>
      </div>
    </>
  )
}
