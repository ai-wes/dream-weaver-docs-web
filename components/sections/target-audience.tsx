import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TargetAudience() {
  return (
    <Section id="target-audience" title="Target Audience">
      <Card>
        <CardHeader>
          <CardTitle>Primary Audience Segments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Dream Weaver is designed to appeal to several distinct audience segments, each with their own motivations
            and interests:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Blockchain Enthusiasts & NFT Collectors</h3>
              <p className="text-slate-200">
                Early adopters who understand the value of digital ownership and are looking for innovative NFT projects
                with long-term utility and growth potential. They value the uniqueness of their digital assets and the
                ability to participate in emerging ecosystems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Gamers Seeking Novel Experiences</h3>
              <p className="text-slate-200">
                Players who are tired of traditional gaming experiences and are looking for something that offers
                greater agency, creativity, and unpredictability. They value games where their actions have meaningful
                impact on the world and narrative.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">AI & Technology Enthusiasts</h3>
              <p className="text-slate-200">
                Individuals fascinated by the potential of artificial intelligence and emerging technologies. They're
                drawn to Dream Weaver's innovative use of AI for narrative generation, NFT evolution, and collective
                experience creation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Creative Community Builders</h3>
              <p className="text-slate-200">
                People who enjoy being part of communities where they can contribute to something larger than
                themselves. They value the collaborative aspects of Dream Weaver and the opportunity to shape the
                collective narrative and world.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
