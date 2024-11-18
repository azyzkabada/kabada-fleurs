"use client"

import { useTransition } from "react"
import Link from "next/link"
import { profile } from "@/src/actions/profile"
import { FormInput } from "@/src/components/auth/form-input"
import { FormToggle } from "@/src/components/auth/form-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Form } from "@/src/components/ui/form"
import { profileSchema } from "@/src/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRound } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { ExtendedUser } from "@/types/next-auth"

type ComponentProps = {
  user: ExtendedUser
}

export default function Component({ user }: ComponentProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    values: {
      name: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      profile(values).then((data) => {
        if (data.success) {
          form.reset()
          return toast.success(data.message)
        }
        return toast.error(data.error.message)
      })
    })
  })

  return (
    <div className="flex w-full min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r shrink-0 bg-muted/40 md:block">
        <div className="flex flex-col h-full gap-4 p-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={user.image ?? "/placeholder-user.jpg"}
                alt={user.name ?? "User"}
              />
              <AvatarFallback>{user.name ? user.name[0] : "?"}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="text-lg font-medium">
                {user.name ?? "Unknown User"}
              </div>
              <div className="text-sm text-muted-foreground">
                {user.email ?? "No Email"}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              Profile
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
              prefetch={false}
            >
              Settings
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              Notifications
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b shadow-sm h-14 bg-background md:hidden">
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1 font-medium text-center">Settings</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user.image ?? "/placeholder-user.jpg"}
                    alt={user.name ?? "User"}
                  />
                  <AvatarFallback>
                    {user.name ? user.name[0] : "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-4 md:p-6">
          <div className="grid max-w-3xl gap-8 mx-auto">
            {/* Profile Form */}
            <div className="flex justify-center">
              <Avatar className="w-64 h-64">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>
                  <UserRound size={128} />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="col-span-3 space-y-12">
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <FormInput
                      control={form.control}
                      name="name"
                      label="Name"
                      type="text"
                      placeholder="e.g. John Doe"
                      isPending={isPending}
                    />
                    {!user.isOAuth && (
                      <>
                        <FormInput
                          control={form.control}
                          name="email"
                          label="Email Address"
                          type="email"
                          placeholder="e.g. johndoe@example.com"
                          isPending={isPending}
                          disabled={user.isOAuth}
                        />
                        <FormInput
                          control={form.control}
                          name="password"
                          label="Old Password"
                          type="password"
                          placeholder="******"
                          autoComplete="off"
                          isPending={isPending}
                        />
                        <FormInput
                          control={form.control}
                          name="newPassword"
                          label="New Password"
                          type="password"
                          placeholder="******"
                          autoComplete="off"
                          isPending={isPending}
                        />
                        <FormToggle
                          control={form.control}
                          name="isTwoFactorEnabled"
                          label="Two-Factor Authentication"
                          description="Enable additional security for login."
                          isPending={isPending}
                        />
                      </>
                    )}
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full">
                    Update profile
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
