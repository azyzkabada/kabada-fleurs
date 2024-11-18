"use client"

import Link from "next/link"
import { buttonVariants } from "@/src/components/ui/button"
import { cn } from "@/src/lib/cn-utils"
import { Mail } from "lucide-react"

interface Props {
  email?: string
}
export function EmailSentPage({ email }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6 px-4 py-12 bg-background sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <Mail className="w-32 h-32 animate-bounce text-primary" />
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
      <div className="flex flex-col w-full max-w-md gap-2">
        <Link
          href={`/resend-email?email=${encodeURIComponent(email ?? "")}`}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          Renvoyer l'email
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          href={"/"}
        >
          Retourner à l'accueil
        </Link>
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
