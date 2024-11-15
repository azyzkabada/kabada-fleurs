import { Metadata, type Viewport } from "next"
import { auth } from "@/auth"
import Providers from "@/src/components/layout/providers"
import { TailwindIndicator } from "@/src/components/tailwind-indicator"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/cn-utils"
import { fontSans, fontSpecial } from "@/src/lib/fonts"
import NextTopLoader from "nextjs-toploader"
import { NuqsAdapter } from "nuqs/adapters/next/app"

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

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const session = await auth()
  return (
    <>
      <html
        lang="fr"
        //  suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            `min-h-screen bg-background ${fontSans.variable}  ${fontSpecial.variable} font-sans antialiased`,
            fontSans.variable
          )}
        >
          {" "}
          <NextTopLoader
            showSpinner={true}
            color="#1f7551"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            crawl={true}
            easing="ease"
            speed={200}
            template='<div class="bar" role="bar"><div class="peg"></div></div>
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <Providers session={session}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <NuqsAdapter> {children}</NuqsAdapter>
              <TailwindIndicator />
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  )
}
