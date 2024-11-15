"use client"

import { useSearchParams } from "next/navigation"
import { Icons } from "@/src/components/icons"
import { Button } from "@/src/components/ui/button"
import { signIn } from "next-auth/react"

export default function GithubSignInButton() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
      }
    >
      <Icons.gitHub className="w-4 h-4 mr-2" />
      Continue with Github
    </Button>
  )
}
