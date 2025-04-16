"use client"

import { useRef } from "react"
import TableOfContents from "@/components/table-of-contents"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ExecutiveSummary from "@/components/sections/executive-summary"
import Vision from "@/components/sections/vision"
import ProblemOpportunity from "@/components/sections/problem-opportunity"
import TargetAudience from "@/components/sections/target-audience"
import DreamWeaverConcept from "@/components/sections/dream-weaver-concept"
import AIPoweredEvolution from "@/components/sections/ai-powered-evolution"
import BlockchainSignificance from "@/components/sections/blockchain-significance"
import EmergenceAsFeature from "@/components/sections/emergence-as-feature"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const firstSectionRef = useRef<HTMLElement>(null)

  const scrollToFirstSection = () => {
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold tracking-wider text-white mb-6 uppercase">
            Dreamweaver
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Documentation and Blueprints for the Dream Weaver Project
          </p>

          <Button onClick={scrollToFirstSection} className="cosmic-button">
            Explore Documentation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-300"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-background/80 backdrop-blur-sm py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400">
            Explore DreamWeaver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/introduction/executive-summary" className="block">
              <Card className="h-full hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200">
                    A concise overview of the Dream Weaver project and its core innovations.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/introduction/project-overview" className="block">
              <Card className="h-full hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle>Project Pillars</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200">
                    Explore the six foundational pillars that make up the DreamWeaver ecosystem.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/introduction/target-audience-detailed" className="block">
              <Card className="h-full hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle>Target Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200">
                    Discover who DreamWeaver is designed for and how it serves different audience segments.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-background/80 backdrop-blur-sm text-foreground flex-grow relative z-10">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
          <main className="flex-1" ref={firstSectionRef}>
            <ExecutiveSummary />
            <Vision />
            <ProblemOpportunity />
            <TargetAudience />
            <DreamWeaverConcept />
            <AIPoweredEvolution />
            <BlockchainSignificance />
            <EmergenceAsFeature />
          </main>
        </div>
      </div>
    </div>
  )
}
