"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/src/actions/login"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { Separator } from "@/src/components/ui/separator"
import { loginSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { CardWrapper } from "@/app/(withoutHeader)/(auth-pages)/_components/card-wrapper"
import { Social } from "@/app/(withoutHeader)/(auth-pages)/_components/social"

export const LoginForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return
          if (!data.success) {
            return toast.error(data.error.message)
          }
          return router.push("/two-factor")
        })
        .catch(() => toast.error("Something went wrong."))
    })
  })

  return (
    <CardWrapper
      headerTitle="Login"
      headerDescription="Welcome back! Please fill out the form below before logging in to the website."
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="e.g. johndoe@example.com"
              isPending={isPending}
            />
            <div>
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                isPending={isPending}
              />
              <Button
                size="sm"
                variant="link"
                className="justify-end w-full p-0 -mt-6 text-xs text-blue-500"
                asChild
              >
                <Link href="/reset">Forgot password?</Link>
              </Button>
            </div>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
      {/* Connexion via réseaux sociaux */}
      <div className="relative flex flex-row items-center justify-center my-4 space-x-4 text-xs ">
        <Separator className="flex-grow" />
        <p className="text-xs text-center">Ou avec vos coordonnées</p>
        <Separator className="flex-grow" />
      </div>
      <Social />
    </CardWrapper>
  )
}
