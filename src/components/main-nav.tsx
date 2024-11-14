import Link from "next/link"
import { Icons } from "@/src/components/icons"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="ml-8 flex gap-6 md:ml-20 md:gap-10">
      <Link
        href="/"
        className="flex items-center space-x-2 text-foreground dark:text-white"
      >
        <Icons.logo className="size-10 text-foreground dark:text-white" />
        <span className="inline-block text-lg font-semibold ">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
