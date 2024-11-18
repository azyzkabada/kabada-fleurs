"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface ToggleIdProps {
  texte?: string
  className?: string
}

export default function ToggleTexte({
  texte = "********",
  className,
}: ToggleIdProps) {
  const [isVisible, setIsVisible] = useState(false)

  const getMaskedText = (text: string) => text.replace(/./g, "•")

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span>{isVisible ? texte : getMaskedText(texte)}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label={isVisible ? "Cacher le texte" : "Afficher le texte"}
      >
        {isVisible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
