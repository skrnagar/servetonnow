import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { GeolocationProvider } from "@/context/geolocation-context"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Serveto - AI-Powered Home Services Platform",
  description:
    "Book home services, compare vendors, or post tasks for bidding. Serveto makes home services simple and efficient.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <GeolocationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </GeolocationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'