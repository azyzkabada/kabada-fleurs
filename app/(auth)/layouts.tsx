export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container items-center justify-center">{children}</main>
  )
}
