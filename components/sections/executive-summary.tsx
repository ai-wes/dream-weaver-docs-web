import Section from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function ExecutiveSummary() {
  return (
    <Section id="executive-summary" title="Executive Summary">
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Core Innovation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            This learning process is structured within a dynamic topological knowledge graph (the DreamWeaver Graph),
            representing the interconnectedness of dreams, symbols, users, and AI-generated concepts. User engagement is
            fundamental: submitted dreams directly fuel the evolution of their DreamSoul, a unique and evolving ERC721
            NFT representing their digital identity within the DreamVerse.
          </p>

          <p className="text-slate-200">
            Crucially, DreamWeaver leverages Polygon not just for efficient asset management but for a novel use case:
            providing an immutable, transparent ledger for the AI's evolution. Key developmental milestones of the
            DreamWeaver Entity are cryptographically hashed and anchored on-chain via dedicated smart contracts,
            offering unprecedented verifiability for AI research and user trust.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
