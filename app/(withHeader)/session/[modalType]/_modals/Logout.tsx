"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

export default function LogoutModal() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  // React Hook Form setup

  // Handle logout submission
  const handleSubmit = async () => {
    try {
      setIsPending(true)

      await signOut({ redirect: false })
      toast.success("Déconnexion réussie.")
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error)
      toast.error("Une erreur est survenue lors de la déconnexion.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto shadow-none">
      <div className="grid gap-8">
        <Card className="mx-auto border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Déconnexion
            </CardTitle>
            <CardDescription>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <p className="mt-8 text-sm text-muted-foreground">
              En vous déconnectant, vous devrez vous reconnecter pour accéder à
              votre compte.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 border-none">
            <Button
              variant="outline"
              className="w-full text-white bg-primary"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              variant="outline"
              className="w-full"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Déconnexion..." : "Se déconnecter"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
