"use client"

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { siteConfig } from "@/config/site"

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={handleOpenChange}
      modal={true}
    >
      <DialogOverlay>
        <DialogHeader className="sr-only">
          <DialogTitle>{siteConfig.name}</DialogTitle>
          <DialogDescription>{siteConfig.subName}</DialogDescription>
        </DialogHeader>
        <DialogContent>{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
