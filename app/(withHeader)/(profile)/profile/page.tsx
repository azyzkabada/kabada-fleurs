import { Metadata } from "next"
import { currentUser } from "@/src/lib/auth"

import Main from "../Main"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  const user = await currentUser()
  if (!user) return

  return (
    <>
      <Main user={user} />
    </>
  )
}
