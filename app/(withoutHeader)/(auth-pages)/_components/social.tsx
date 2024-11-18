"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

// import { IoLogoGithub } from "react-icons/io5"
// import { IoLogoFacebook } from "react-icons/io5"

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes"

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT

  const onClick = (provider: "google" | "github" | "facebook") => {
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full gap-2 text-base text-white bg-gray-700"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="text-2xl" />
        Continuer avec Google
      </Button>
      {/* <Button
        size="lg"
        className="w-full gap-2 text-base text-white bg-blue-700"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <IoLogoFacebook className="text-2xl" />
        Continuer avec Facebook
      </Button> */}
      {/* <Button
        size="lg"
        className="w-full text-2xl"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <IoLogoGithub />
      </Button> */}
    </div>
  )
}
