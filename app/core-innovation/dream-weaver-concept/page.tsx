import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function DreamWeaverConceptPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            The Dream Weaver Concept
          </h1>
          <p className="text-xl text-blue-100 mt-2">Blending AI, blockchain, and human subconsciousness</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

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
              users, moving beyond predefined scripts to generate truly emergent world behaviors and narratives.
            </p>

            <p className="text-slate-200">
              This learning process is structured within a dynamic topological knowledge graph (the DreamWeaver Graph),
              representing the interconnectedness of dreams, symbols, users, and AI-generated concepts. The graph itself
              is not static but constantly evolving as new dreams are submitted, new connections are formed, and the AI
              develops new insights.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement & Digital Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              User engagement is fundamental to DreamWeaver. Submitted dreams directly fuel the evolution of their
              DreamSoul, a unique and evolving ERC721 NFT representing their digital identity within the DreamVerse. As
              users contribute more dreams and interact with the ecosystem, their DreamSoul evolves visually and
              functionally, reflecting their journey.
            </p>

            <p className="text-slate-200">
              Furthermore, users can claim Dream Nodes, derived from dream interpretations, and develop them into
              personalized metaverse "Pocket Dimensions." These spaces become extensions of the user's subconscious,
              offering unique environments for exploration and social interaction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              Crucially, DreamWeaver leverages Polygon not just for efficient asset management but for a novel use case:
              providing an immutable, transparent ledger for the AI's evolution. Key developmental milestones of the
              DreamWeaver Entity are cryptographically hashed and anchored on-chain via dedicated smart contracts
              (DreamWeaverGraph, DreamWeaverJournal), offering unprecedented verifiability for AI research and fostering
              user trust.
            </p>

            <p className="text-slate-200">
              This core anchoring mechanism is reliant on Polygon's low-cost, high-throughput environment, making it
              possible to create a verifiable record of AI development that would be prohibitively expensive on other
              chains.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              The core system, demonstrating the AI processing loop, knowledge graph interaction, and on-chain milestone
              anchoring via smart contracts, is currently operational and deployed on the Polygon Amoy testnet. This
              validates the technical feasibility of our hybrid architecture combining off-chain AI processing with
              on-chain verification.
            </p>

            <p className="text-slate-200">
              Our development roadmap focuses on scaling the AI capabilities, implementing the core gameplay loops
              (including Wisp collection, battle mechanics, and node exploration), and transitioning from a functional
              prototype to a robust, mainnet-ready platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
