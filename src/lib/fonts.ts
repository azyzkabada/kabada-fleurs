import {
  Titillium_Web as FontSans,
  Krona_One as FontSpecial,
} from "next/font/google"

// import localFont from "next/font/local"

// Host Grotesk comme police principale "sans"
export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-sans",
})

// Krona One comme police spéciale "special sans"
export const fontSpecial = FontSpecial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-sans",
})
