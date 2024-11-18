"use client"

import { useTransition } from "react"
import Link from "next/link"
import { resendToken } from "@/src/actions/resend"
import { FormInput } from "@/src/components/auth/form-input"
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/ui/form"
import { resendSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mails } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface ResendFormProps {
  email?: string
}

export const ResendForm = ({ email = "" }: ResendFormProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof resendSchema>>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: email,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resendToken(values).then((data) => {
        if (data.success) {
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  })

  return (
    <div className="flex items-center justify-center w-full h-screen px-4 py-12 bg-background">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 p-20 px-4 md:border sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Mails className="w-32 h-32 text-primary animatecss animatecss-rubberBand animatecss-infinite" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Renvoyer la confirmation</h2>
            <p className="text-muted-foreground">
              Le lien de vérification expirera après une heure. Si vous ne
              vérifiez pas votre email dans ce délai, vous pouvez demander un
              nouveau lien de vérification.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="w-full mb-0 space-y-6">
            <FormInput
              control={form.control}
              name="email"
              label="Adresse e-mail"
              type="email"
              placeholder="ex. johndoe@example.com"
              isPending={isPending}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Renvoyer
            </Button>
          </form>
        </Form>
        <div className="flex flex-col w-full gap-2">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Retourner à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
