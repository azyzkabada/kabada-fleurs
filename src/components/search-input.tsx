"use client"

// import { Input } from '@/src/components/ui/input';
import { useKBar } from "kbar"
import { Search } from "lucide-react"

import { Button } from "./ui/button"

export default function SearchInput() {
  const { query } = useKBar()
  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        className="relative justify-start w-full text-sm font-normal shadow-none h-9 bg-background text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={query.toggle}
      >
        <Search className="w-4 h-4 mr-2" />
        Search...
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </div>
  )
}
