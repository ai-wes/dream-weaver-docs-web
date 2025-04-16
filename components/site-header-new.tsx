"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function SiteHeaderNew() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 animate-pulse"></div>
              <div className="absolute inset-0.5 rounded-full bg-background flex items-center justify-center">
                <span className="text-blue-400 font-bold text-xs">DW</span>
              </div>
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
              Dream Weaver
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="text-blue-200 hover:text-white hover:bg-blue-900/30">
              <Link href="/">Documentation</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-blue-200 hover:text-white hover:bg-blue-900/30">
              <Link href="https://ai-wes.github.io/dreamweaver-litepaper/">Whitepaper</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-blue-200 hover:text-white hover:bg-blue-900/30">
              <Link href="/">Contact</Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild className="text-blue-200 hover:text-white hover:bg-blue-900/30">
            <Link href="https://github.com/ai-wes/dream-weaver-docs-web" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
