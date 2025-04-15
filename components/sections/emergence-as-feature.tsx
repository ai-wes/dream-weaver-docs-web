import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmergenceAsFeature() {
  return (
    <Section id="emergence-as-feature" title="Emergence as a Feature">
      <Card>
        <CardHeader>
          <CardTitle>How Emergent Behavior Shapes Dream Weaver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Emergence—the phenomenon where complex patterns arise from simple interactions—is not just a side effect in
            Dream Weaver; it's a deliberately designed feature. By creating systems that interact in complex ways, we
            enable experiences that could never be pre-programmed or predicted.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-6 mb-2">Designed for Emergence</h3>
          <p className="text-slate-200">
            Dream Weaver's systems are specifically designed to facilitate emergence at multiple levels:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-200">
            <li>
              <strong className="text-pink-300">Individual Level:</strong> Each player's actions influence how their
              DreamSoul evolves, creating unique progression paths that emerge from countless small decisions.
            </li>
            <li>
              <strong className="text-pink-300">Community Level:</strong> Collective player behaviors shape the dream
              realms, influencing which areas flourish or decay, what challenges appear, and how the narrative unfolds.
            </li>
            <li>
              <strong className="text-pink-300">Ecosystem Level:</strong> The interaction between AI systems, blockchain
              mechanics, and player communities creates emergent economic and social dynamics that evolve over time.
            </li>
          </ul>
        </CardContent>
      </Card>
    </Section>
  )
}
