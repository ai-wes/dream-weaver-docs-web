import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIPoweredEvolution() {
  return (
    <Section id="ai-powered-evolution" title="AI-Powered Evolution">
      <Card>
        <CardHeader>
          <CardTitle>How AI Drives Evolution in Dream Weaver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            At the core of Dream Weaver's innovation is its use of artificial intelligence to drive the evolution of
            both individual assets and the collective experience. Unlike traditional games where progression follows
            predetermined paths, Dream Weaver uses AI to create truly dynamic and responsive systems.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-6 mb-2">The Dream Oracle AI System</h3>
          <p className="text-slate-200">
            The Dream Oracle is our proprietary AI system that analyzes player actions, preferences, and patterns to
            personalize experiences and drive evolution. It functions across multiple layers:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-200">
            <li>
              <strong className="text-pink-300">Pattern Recognition:</strong> Identifying meaningful patterns in how
              players interact with the game world and with each other.
            </li>
            <li>
              <strong className="text-pink-300">Narrative Generation:</strong> Creating personalized story elements and
              world events based on player history and community trends.
            </li>
            <li>
              <strong className="text-pink-300">Asset Evolution:</strong> Determining how NFTs should evolve based on
              their owner's actions, creating unique progression paths.
            </li>
            <li>
              <strong className="text-pink-300">Community Dynamics:</strong> Mapping relationships between players and
              using this data to influence world events and challenges.
            </li>
          </ul>
        </CardContent>
      </Card>
    </Section>
  )
}
