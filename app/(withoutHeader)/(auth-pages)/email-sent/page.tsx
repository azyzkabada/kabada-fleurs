"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Mails } from "lucide-react"

interface Props {
  email?: string
}

export function EmailSentPage({ email }: Props) {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4 py-12 bg-background">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 p-20 px-4 md:border sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Mails className="w-32 h-32 animate-bounce text-primary" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">
              Email envoyé {email ? `à ${email}` : ""}
            </h2>
            <p className="text-muted-foreground">
              Merci de vérifier votre boîte de réception pour confirmer votre
              adresse email. Si vous ne recevez pas l'email, vous pouvez le
              renvoyer.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Link href={`/resend-email?email=${encodeURIComponent(email ?? "")}`}>
            <Button variant="outline" className="w-full">
              Renvoyer l'email
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">Retourner à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function EmailVerificationPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || ""

  return <EmailSentPage email={email} />
}
