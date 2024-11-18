import Link from "next/link"
import { redirect } from "next/navigation"
import { buttonVariants } from "@/src/components/ui/button"
import { cn } from "@/src/lib/cn-utils"
import type { Response } from "@/types"
import { MailCheck } from "lucide-react"

interface DataProps {
  data: Response
}
export function EmailVerified({ data }: DataProps) {
  if (!data.success) {
    return redirect("/login")
  }

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 py-12 bg-background">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 p-20 px-4 md:border sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <MailCheck className="w-32 h-32 text-primary animatecss animatecss-rubberBand animatecss-infinite" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Votre e-mail a été vérifié</h2>
            <p className="text-muted-foreground">
              Merci d'avoir vérifié votre e-mail. Vous pouvez maintenant
              continuer.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Link
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
            href={"/profile"}
          >
            Continuer
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            href={"/"}
          >
            Retourner à l'acceuil
          </Link>
        </div>
      </div>
    </div>
  )
}
