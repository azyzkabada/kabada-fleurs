'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface AppPopupProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export const AppPopup: React.FC<AppPopupProps> = ({ open, setOpen }) => {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {"VOUS N'AVEZ PAS ENCORE L'APPLICATION ?"}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 pt-4">
                    <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="QR Code"
                        className="h-32 w-32"
                    />
                    <p className="text-center text-sm">
                        TÉLÉCHARGEZ-LA DÈS MAINTENANT !
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
