import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TargetAudienceDetailedPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            Who Is DreamWeaver For?
          </h1>
          <p className="text-xl text-blue-100 mt-2">A detailed look at DreamWeaver's target audiences</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <p className="text-slate-200">
          DreamWeaver is designed to serve a diverse set of interconnected audiences, each with unique needs and
          interests:
        </p>

        {/* End Users */}
        <Card>
          <CardHeader>
            <CardTitle>1. End Users: The Dreamers & Players</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Who</h3>
            <p className="text-slate-200">
              Individuals interested in self-exploration, unique gaming experiences, digital collectibles, metaverse
              interaction, and cutting-edge technology (AI, AR, Web3). This includes casual users intrigued by dream
              interpretation, dedicated gamers seeking novel mechanics, and NFT enthusiasts looking for dynamic,
              utility-driven assets.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">What</h3>
            <p className="text-slate-200">A deeply personalized and engaging experience unlike any other platform:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Connection with their subconscious through dream submissions</li>
              <li>Ownership of a living digital identity (DreamSoul NFT) that evolves with usage</li>
              <li>Unique gameplay loops involving Dream Wisps, Runes, and AR interactions</li>
              <li>Exploration of a dynamic, ever-changing DreamVerse shaped by collective input</li>
              <li>Ownership and customization of personal metaverse spaces (Pocket Dimensions)</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Why</h3>
            <p className="text-slate-200">
              Users seeking truly personalized, meaningful digital experiences will find value in a platform where their
              subconscious contributions directly shape both their individual journey and the collective environment.
              The merger of personal growth, entertainment, and digital ownership offers a uniquely compelling
              proposition.
            </p>
          </CardContent>
        </Card>

        {/* Developers & Creators */}
        <Card>
          <CardHeader>
            <CardTitle>2. Developers & Creators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Who</h3>
            <p className="text-slate-200">
              Web3 developers, game designers, artists, narrative writers, and tool builders interested in contributing
              to or building upon a novel, dynamic platform.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">What</h3>
            <p className="text-slate-200">A rich, evolving foundation for creation:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>APIs/SDKs for interacting with the DreamWeaver Graph, AI Oracle, or game mechanics</li>
              <li>Opportunities to create new experiences, tools, or narratives within the DreamVerse</li>
              <li>A platform for experimenting with dynamic NFTs and emergent game design</li>
              <li>Access to a unique ecosystem blending AI, blockchain, and immersive technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Why</h3>
            <p className="text-slate-200">
              Developers gain access to a platform that bridges multiple cutting-edge technologies, offering fertile
              ground for innovation. The combination of user-generated content, AI interpretation, and blockchain
              verification creates opportunities for novel applications and experiences that wouldn't be possible in
              traditional development environments.
            </p>
          </CardContent>
        </Card>

        {/* Research & Academic Communities */}
        <Card>
          <CardHeader>
            <CardTitle>3. Research & Academic Communities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Who</h3>
            <p className="text-slate-200">
              Researchers and institutions focused on emergent AI, human-AI interaction, collective intelligence,
              symbolic analysis, cognitive science, psychology, and novel blockchain applications.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">What</h3>
            <p className="text-slate-200">A unique, large-scale research platform:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>
                Access to an unprecedented dataset linking subjective dream input to AI behavior and verifiable on-chain
                events
              </li>
              <li>A testbed for studying emergent AI in a complex, interactive environment</li>
              <li>Tools for analyzing collective subconscious patterns and symbolic trends</li>
              <li>A novel case study for verifiable AI evolution using blockchain technology</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Why</h3>
            <p className="text-slate-200">
              DreamWeaver offers researchers a rare opportunity to study emergent AI behavior in a rich, interactive
              environment with real users. The platform generates valuable data about human subconscious expression,
              collective intelligence patterns, and how verifiable blockchain records can enhance AI transparency and
              trust.
            </p>
          </CardContent>
        </Card>

        {/* The Broader Web3 & Polygon Ecosystem */}
        <Card>
          <CardHeader>
            <CardTitle>4. The Broader Web3 & Polygon Ecosystem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Who</h3>
            <p className="text-slate-200">
              Other projects, platforms, and users within the Polygon network and the wider Web3 space.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">What</h3>
            <p className="text-slate-200">A flagship example of advanced blockchain applications:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Advanced AI integration on the blockchain</li>
              <li>Truly dynamic and evolving NFTs</li>
              <li>Meaningful metaverse implementation beyond simple land sales</li>
              <li>Innovative use of scaling solutions for complex applications</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Why</h3>
            <p className="text-slate-200">
              DreamWeaver demonstrates the potential of blockchain technology beyond financial applications, showcasing
              how decentralized systems can support complex, AI-driven experiences that evolve based on user input. This
              expands the perceived capabilities of Web3 platforms and encourages further innovation.
            </p>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <CardTitle>Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-200">
              DreamWeaver's multi-audience appeal creates a rich ecosystem where end-users, developers, researchers, and
              the broader Web3 community can interact and benefit from each other's contributions. By serving diverse
              needs through a unified platform, DreamWeaver aims to pioneer new forms of digital interaction that blend
              technology with human creativity and subconscious expression.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
