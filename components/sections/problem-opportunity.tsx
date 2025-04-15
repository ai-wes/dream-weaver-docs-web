import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProblemOpportunity() {
  return (
    <Section id="problem-opportunity" title="Problem & Opportunity">
      <Card>
        <CardHeader>
          <CardTitle>The Problem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            The current landscape of blockchain gaming and NFTs faces several challenges that limit their mainstream
            adoption and long-term sustainability:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-200">
            <li>
              <strong className="text-blue-300">Static NFTs:</strong> Most NFTs remain unchanged after minting, offering
              limited ongoing value or engagement for owners.
            </li>
            <li>
              <strong className="text-blue-300">Disconnected Experiences:</strong> Many blockchain games fail to create
              meaningful connections between players, assets, and the broader ecosystem.
            </li>
            <li>
              <strong className="text-blue-300">Predetermined Narratives:</strong> Traditional games offer stories and
              experiences that are largely predetermined by developers, limiting player agency and creativity.
            </li>
            <li>
              <strong className="text-blue-300">Technical Barriers:</strong> Complex blockchain interactions and high
              gas fees create significant barriers to entry for mainstream users.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>The Opportunity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Dream Weaver addresses these challenges by creating a new paradigm for blockchain gaming and digital
            ownership:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-200">
            <li>
              <strong className="text-pink-300">Evolving Digital Assets:</strong> NFTs that grow and change based on
              player actions, creating ongoing engagement and value.
            </li>
            <li>
              <strong className="text-pink-300">Collective Narrative:</strong> A shared story that emerges from the
              combined actions of all players, creating a truly unique and unpredictable experience.
            </li>
            <li>
              <strong className="text-pink-300">AI-Enhanced Creativity:</strong> Artificial intelligence that amplifies
              human creativity rather than replacing it, enabling new forms of expression and interaction.
            </li>
            <li>
              <strong className="text-pink-300">Accessible Blockchain:</strong> Built on Polygon to ensure low fees and
              high performance, making the experience accessible to mainstream users.
            </li>
          </ul>
        </CardContent>
      </Card>
    </Section>
  )
}
