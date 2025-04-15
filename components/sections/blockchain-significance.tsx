import Section from "@/components/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlockchainSignificance() {
  return (
    <Section id="blockchain-significance" title="Blockchain Significance">
      <Card>
        <CardHeader>
          <CardTitle>The Role of Blockchain in Dream Weaver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-200">
            Blockchain technology is not merely an add-on to Dream Weaver—it's a fundamental component that enables many
            of the project's core innovations. By leveraging the Polygon blockchain, we create a foundation for true
            ownership, verifiable scarcity, and decentralized governance.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-6 mb-2">True Digital Ownership</h3>
          <p className="text-slate-200">
            In Dream Weaver, players truly own their digital assets. DreamSoul NFTs, Wisps, and other in-game items
            exist on the blockchain, giving players complete control over their assets. This enables:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-200">
            <li>The ability to trade or sell assets on secondary markets</li>
            <li>Persistence of assets even if the main game servers were to go offline</li>
            <li>Verifiable scarcity and authenticity of all digital items</li>
            <li>Interoperability potential with other blockchain projects and platforms</li>
          </ul>
        </CardContent>
      </Card>
    </Section>
  )
}
