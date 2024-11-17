import { Metadata } from "next"
import { ProfileForm } from "@/src/components/form/profile-form"
import { currentUser } from "@/src/lib/auth"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  const user = await currentUser()
  if (!user) return
  console.log(user)
  return (
    <div className="grid grid-cols-7 gap-y-14">
      <h2 className="col-start-4 text-xl font-semibold col-span-full">
        Profile Settings
      </h2>
      <ProfileForm user={user} />
    </div>
  )
}
