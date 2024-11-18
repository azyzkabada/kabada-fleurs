import Link from "next/link"
import { Icons } from "@/src/components/icons"
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

interface User {
  name: string
  email: string
  image: string | null
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
interface Props {
  user: User | null | undefined
}
export default function ProfileDropdow({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.image || ""} alt="@shadcn" />
            <AvatarFallback>{user?.name[0] || "KC"} </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuLabel className="font-semibold">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image || ""} alt="@shadcn" />
              <AvatarFallback>{user?.name[0] || "KC"} </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{user?.name || "Anomnyme"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.email || "Anomnyme"}m
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/profile" className="flex items-center gap-2">
          <DropdownMenuItem className="w-full">
            <Icons.user className="w-4 h-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/setting" className="flex items-center gap-2">
          <DropdownMenuItem className="w-full">
            <Icons.settings className="w-4 h-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/session/logout" className="flex items-center w-full gap-2">
          <DropdownMenuItem className="w-full">
            <Icons.logout className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
