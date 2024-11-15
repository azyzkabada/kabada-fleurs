import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()
  // const session = { user: 92879287298 }

  if (!session?.user) {
    return redirect("/")
  } else {
    redirect("/dashboard/overview")
  }
}
