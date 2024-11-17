import { redirect } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

export default function LogoutModal() {
  const handleLogout = async () => {
    "use server" // Instruction côté serveur pour déclencher l'action
    // Ajoute ici la logique pour gérer la déconnexion (exemple d'une API ou action server)
    // Par exemple :
    // await fetch('/api/logout', { method: 'POST' });
    redirect("/") // Redirige après la déconnexion
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Déconnexion</CardTitle>
        <CardDescription>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          En vous déconnectant, vous devrez vous reconnecter pour accéder à
          votre compte.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <form action={handleLogout}>
          <Button type="submit" variant="destructive">
            Se déconnecter
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
