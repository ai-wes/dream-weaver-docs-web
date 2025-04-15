import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function DreamWeaverConcept() {
  return (
    <Section id="dream-weaver-concept" title="The Dream Weaver Concept">
      <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-8">
        <Image src="/images/dream-portal.png" alt="Dream Weaver Concept" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Living Dream Metaverse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            DreamWeaver is pioneering the first living dream metaverse, an AI-powered ecosystem where human
            subconsciousness shapes a dynamic, evolving digital world. Unlike traditional static virtual environments,
            DreamWeaver places an Emergent AI Core (the DreamWeaver Entity) at its heart. This central intelligence
            learns, adapts, and evolves directly from the collective dream narratives and emotional data submitted by
            users.
          </p>

          <p className="text-slate-200">
            This learning process is structured within a dynamic topological knowledge graph (the DreamWeaver Graph),
            representing the interconnectedness of dreams, symbols, users, and AI-generated concepts. User engagement is
            fundamental: submitted dreams directly fuel the evolution of their DreamSoul, a unique and evolving ERC721
            NFT representing their digital identity within the DreamVerse.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Blockchain Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Crucially, DreamWeaver leverages Polygon not just for efficient asset management but for a novel use case:
            providing an immutable, transparent ledger for the AI's evolution. Key developmental milestones of the
            DreamWeaver Entity are cryptographically hashed and anchored on-chain via dedicated smart contracts,
            offering unprecedented verifiability for AI research and fostering user trust.
          </p>

          <p className="text-slate-200">
            The core system, demonstrating the AI processing loop, knowledge graph interaction, and on-chain milestone
            anchoring, is currently operational and deployed on the Polygon Amoy testnet, validating the technical
            feasibility of our hybrid architecture.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
