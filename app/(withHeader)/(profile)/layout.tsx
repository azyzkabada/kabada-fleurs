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
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <main className="container flex-1 ">{children}</main>
          {modal}
        </div>
      </div>
    </>
  )
}
