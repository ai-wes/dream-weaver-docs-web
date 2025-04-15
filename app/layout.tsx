import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"
import "../styles/sidebar.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeaderNew } from "@/components/site-header-new"
import StarBackground from "@/components/star-background"

// Serif font for the main title only
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cinzel",
})

// Sans-serif font for everything else
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Dream Weaver Documentation",
  description: "Comprehensive documentation for the Dream Weaver project",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${cinzel.variable} ${inter.variable} font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider defaultOpen={false}>
            {/* Star Background at the root level */}
            <StarBackground />

            <div className="relative flex min-h-screen flex-col">
              <SiteHeaderNew />
              <div className="flex flex-1">
                <main className="flex-1 z-10 relative">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'