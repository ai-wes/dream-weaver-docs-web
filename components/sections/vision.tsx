import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Vision() {
  return (
    <Section id="vision" title="The Vision">
      <Card>
        <CardHeader>
          <CardTitle>Our Vision for Dream Weaver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Dream Weaver envisions a digital ecosystem where the boundaries between creator and consumer blur, where
            artificial intelligence and human creativity collaborate to build evolving narratives, and where blockchain
            technology ensures true ownership and value for digital assets.
          </p>

          <p className="text-slate-200">
            We see a future where games are not just played but co-created, where digital identities evolve alongside
            their owners, and where emergent storytelling creates unique experiences that could never be pre-programmed.
          </p>

          <p className="text-slate-200">
            Our vision extends beyond entertainment—we aim to create a platform that explores the potential of
            collective consciousness in digital spaces, pushing the boundaries of what's possible when AI, blockchain,
            and human creativity converge.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
