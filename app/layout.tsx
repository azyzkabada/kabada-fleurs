import { Metadata, type Viewport } from "next"
import { TailwindIndicator } from "@/src/components/tailwind-indicator"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/cn-utils"
import { fontSans } from "@/src/lib/fonts"

import { siteConfig } from "@/config/site"

import "./styles/globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { showHeader?: boolean }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <>
      <html
        lang="fr"
        //  suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
