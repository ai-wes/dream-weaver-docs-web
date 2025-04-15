import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function ExecutiveSummaryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 font-cinzel">
            Executive Summary
          </h1>
          <p className="text-xl text-blue-100 mt-2">A concise overview of the Dream Weaver project</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-8">
          <Image src="/images/dream-realm.png" alt="Dream Weaver Concept" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Dream Weaver: The Living Dream Metaverse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              DreamWeaver is pioneering the first living dream metaverse, an AI-powered ecosystem where human
              subconsciousness shapes a dynamic, evolving digital world anchored verifiably on the Polygon blockchain.
              Traditional virtual environments offer static experiences; DreamWeaver introduces a paradigm shift by
              placing an Emergent AI Core (the DreamWeaver Entity) at its heart.
            </p>

            <p className="text-slate-200">
              This central intelligence learns, adapts, and evolves directly from the collective dream narratives and
              emotional data submitted by users, moving beyond predefined scripts to generate truly emergent world
              behaviors and narratives.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Innovation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              This learning process is structured within a dynamic topological knowledge graph (the DreamWeaver Graph),
              representing the interconnectedness of dreams, symbols, users, and AI-generated concepts. User engagement
              is fundamental: submitted dreams directly fuel the evolution of their DreamSoul, a unique and evolving
              ERC721 NFT representing their digital identity within the DreamVerse.
            </p>

            <p className="text-slate-200">
              Furthermore, users can claim Dream Nodes, derived from dream interpretations, and develop them into
              personalized metaverse "Pocket Dimensions."
            </p>

            <p className="text-slate-200">
              Crucially, DreamWeaver leverages Polygon not just for efficient asset management but for a novel use case:
              providing an immutable, transparent ledger for the AI's evolution. Key developmental milestones of the
              DreamWeaver Entity are cryptographically hashed and anchored on-chain via dedicated smart contracts
              (DreamWeaverGraph, DreamWeaverJournal), offering unprecedented verifiability for AI research and user
              trust. This core anchoring mechanism is reliant on Polygon's low-cost, high-throughput environment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Status & Grant Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              The core system, demonstrating the AI processing loop, knowledge graph interaction, and on-chain milestone
              anchoring via smart contracts, is currently operational and deployed on the Polygon Amoy testnet. This
              validates the technical feasibility of our hybrid architecture.
            </p>

            <p className="text-slate-200">
              Securing this grant will enable us to scale our development team, optimize the AI models (GNN/DRL),
              implement the core gameplay loops outlined in our roadmap (including Wisp collection and battle mechanics
              and node exploration), and transition from a functional prototype to a robust, mainnet-ready platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value Proposition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              DreamWeaver offers a novel platform merging personal discovery through dream interpretation, collective
              storytelling shaped by an emergent AI, subconscious exploration within user-owned spaces, and
              groundbreaking research into verifiable AI evolution, all built on the scalable and efficient foundation
              of Polygon.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn More</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              For a more detailed understanding of the DreamWeaver project, please explore:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-200">
              <li>
                <Link href="/introduction/project-overview" className="text-blue-300 hover:text-blue-200 underline">
                  Project Overview: The Six Pillars of DreamWeaver
                </Link>
              </li>
              <li>
                <Link
                  href="/introduction/target-audience-detailed"
                  className="text-blue-300 hover:text-blue-200 underline"
                >
                  Who Is DreamWeaver For? Detailed Audience Analysis
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
