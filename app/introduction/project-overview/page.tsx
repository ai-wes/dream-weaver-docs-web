import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            DreamWeaver Project Overview
          </h1>
          <p className="text-xl text-blue-100 mt-2">The foundational pillars of the DreamWeaver ecosystem</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        {/* Pillar 1: The Emergent AI Core */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 1: The Emergent AI Core (DreamWeaver Entity)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Concept</h3>
            <p className="text-slate-200">
              At the absolute heart of DreamWeaver lies the DreamWeaver AI Entity, envisioned not as a conventional game
              NPC or backend script, but as the nascent, evolving "life force" or central intelligence of the digital
              DreamVerse. Analogous to complex, interconnected systems like Pandora's Eywa or a digital Gaia, this AI
              core transcends static programming. Its primary function is to learn and adapt based on the collective
              unconscious of its users, primarily through the analysis of submitted dream narratives(which are converted
              into AR Magic Window Dream Essence Nodes), associated emotional context, and observed in-world
              interactions. It is designed for emergence, meaning its behaviors, "moods," understanding, and even its
              capabilities are intended to develop organically over time as it processes more data, rather than being
              strictly pre-defined.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Innovation</h3>
            <p className="text-slate-200">
              This represents a significant departure from traditional metaverse or game environments which rely on
              pre-scripted events and static lore. DreamWeaver proposes a living ecosystem where the environment's
              narrative, events, and even its fundamental nature are dynamically shaped by the central AI's ongoing
              learning process. Instead of players interacting with a world, they are interacting within an intelligence
              that is, in turn, shaped by them. This co-creative loop is the core innovation. Furthermore, by anchoring
              the AI's key evolutionary milestones on the blockchain (Pillar 3), we create an unprecedented level of
              transparency and research potential into emergent AI behavior within a large-scale interactive system.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Implementation Details</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Core Components</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>
                <strong>Orchestration</strong>: The DreamWeaverEntity Python class serves as the central orchestrator
              </li>
              <li>
                <strong>Knowledge Base</strong>: Neo4j graph database as primary knowledge graph, MongoDB Atlas Vector
                Search for text and emotion embeddings
              </li>
              <li>
                <strong>Learning & Insight</strong>: Graph Attention Network (GAT) in PyTorch/PyTorch Geometric
                (InsightGNN)
              </li>
              <li>
                <strong>Decision Making</strong>: Deep Q-Network (DQN) based DRL agent (EmergentDRLAgent)
              </li>
              <li>
                <strong>State Simulation</strong>: Internal "moods" influencing DRL action selection
              </li>
              <li>
                <strong>Evolution</strong>: Progression through distinct evolution_levels based on metrics
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Research Angle</h3>
            <p className="text-slate-200">
              DreamWeaver serves as a unique, large-scale experiential research platform for studying emergent AI,
              collective consciousness simulation, and the complex interplay between human input and artificial
              intelligence development within a persistent, decentralized environment. The on-chain milestones provide
              verifiable data points for this research.
            </p>
          </CardContent>
        </Card>

        {/* Pillar 2: Evolving User Identity */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 2: Evolving User Identity (DreamSoul)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Concept</h3>
            <p className="text-slate-200">
              DreamSoul serves as a dynamic digital identity within the DreamVerse, evolving through user interaction
              and dream submission.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Integration & Evolution</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Core Features</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>
                <strong>Dream-Fueled Growth</strong>: Dream Essence linking to DreamSoul
              </li>
              <li>
                <strong>Tangible Progression</strong>: Evolution through distinct levels
              </li>
              <li>
                <strong>Capability Unlocks</strong>: Governance rights, exclusive access, enhanced interactions
              </li>
              <li>
                <strong>NFT Implementation</strong>: ERC721-based ownership and provenance
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Implementation Details</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Smart Contracts</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>DreamNFT.sol</li>
              <li>DreamNFTUpgradeSystem.sol</li>
              <li>DreamEssenceNodeUpgradeable.sol</li>
            </ul>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Technical Components</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>On-chain URIs</li>
              <li>IPFS metadata storage</li>
              <li>Dynamic attribute system</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Innovation</h3>
            <p className="text-slate-200">
              Creating dynamic digital identities tied to meaningful user participation within an AI ecosystem.
            </p>
          </CardContent>
        </Card>

        {/* Pillar 3: Immersive Gameplay & Narrative Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 3: Immersive Gameplay & Narrative Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Concept</h3>
            <p className="text-slate-200">
              DreamWeaver's gameplay is intrinsically linked to the AI Core and user's personal contributions. It's not
              a separate layer but a direct interface for interacting with and influencing the evolving DreamVerse and
              its central intelligence.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">User Experience</h3>
            <p className="text-slate-200">This creates a symbiotic narrative where success relies on:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Understanding subtle cues from the AI</li>
              <li>Leveraging personalized Runes/Essences</li>
              <li>Making impactful choices affecting both player standing and world state</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Implementation Details</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Core Loop Components</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Dream Submission (API endpoint {"->"} process_dream)</li>
              <li>Oracle Interpretation (AI/NLP {"->"} Rune/Essence generation)</li>
              <li>Node-based Exploration (NodeManager.py)</li>
              <li>Wisp Combat (BattleManager.py, RPS + Elemental Affinities)</li>
              <li>Puzzle Solving (PuzzleManager.py)</li>
              <li>Lore Discovery</li>
            </ul>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Key Features</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>
                <strong>AI Feedback</strong>: Continuous updates to Knowledge Graph and Vector Store
              </li>
              <li>
                <strong>Personalized Elements</strong>: Dream Runes and Dream Essence
              </li>
              <li>
                <strong>AR Integration</strong>: Planned features for physical-digital interaction
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Innovation</h3>
            <p className="text-slate-200">
              The primary innovation is the direct integration of subjective user input (dreams) into core game
              mechanics and the AI's learning cycle, creating a co-authored, emergent narrative experience.
            </p>
          </CardContent>
        </Card>

        {/* Pillar 4: Blockchain Foundation & Immutability */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 4: Blockchain Foundation & Immutability (Polygon)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Concept</h3>
            <p className="text-slate-200">
              Polygon serves as the immutable foundation of trust and verification for the DreamWeaver ecosystem,
              critical for validating both AI and user digital identity evolution.
            </p>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Value Proposition & Why Polygon</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Key Benefits</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>
                <strong>Verifiable AI Evolution</strong>: On-chain anchoring of AI state and milestones
              </li>
              <li>
                <strong>Transparency & Trust</strong>: Public auditability of AI progress
              </li>
              <li>
                <strong>Asset Ownership</strong>: Secure NFT management
              </li>
              <li>
                <strong>Scalability</strong>: High throughput, low gas fees
              </li>
              <li>
                <strong>EVM Compatibility</strong>: Broad ecosystem interoperability
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Implementation Details</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Smart Contracts</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>DreamWeaverGraph.sol</li>
              <li>DreamWeaverJournal.sol</li>
              <li>DreamNFT.sol</li>
              <li>DreamEssenceNodeUpgradeable.sol</li>
              <li>DreamCoin.sol</li>
              <li>DreamNFTUpgradeSystem.sol</li>
              <li>Future DreamGovernance.sol</li>
            </ul>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Technical Features</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>UUPS upgradeability pattern</li>
              <li>Secure AI Oracle service</li>
              <li>Polygon Amoy testnet deployment</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Innovation</h3>
            <p className="text-slate-200">
              Using Polygon for verifiable tracking of emergent AI evolution, beyond simple asset management.
            </p>
          </CardContent>
        </Card>

        {/* Pillar 5: Technical Architecture & Phased Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 5: Technical Architecture & Phased Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Architecture Details</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Off-Chain Components</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Python backend (Flask/FastAPI)</li>
              <li>Neo4j (Knowledge Graph)</li>
              <li>MongoDB Atlas (Vector Search)</li>
              <li>PyTorch/PyTorch Geometric (GNN/DRL models)</li>
              <li>Sentence-Transformers (Embeddings)</li>
              <li>OpenAI API integration</li>
            </ul>

            <h4 className="text-lg font-medium text-pink-300 mb-1">On-Chain Components (Polygon)</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Upgradeable smart contracts</li>
              <li>NFT management</li>
              <li>Token systems</li>
              <li>Governance framework</li>
            </ul>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Frontend</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Modern JavaScript framework</li>
              <li>Web3 libraries</li>
              <li>3D visualization capabilities</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Phased Rollout (Grant Focus - Phase 1)</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">6-Month Deliverables</h4>
            <ol className="list-decimal pl-6 space-y-1 text-slate-200">
              <li>Foundational AI implementation</li>
              <li>Database integration</li>
              <li>Core contract deployment</li>
              <li>Web3 interface development</li>
              <li>Dream submission API</li>
              <li>On-chain evolution tracking</li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Subsequent Phases</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Full gameplay implementation</li>
              <li>Complete DreamSoul system</li>
              <li>AR feature development</li>
              <li>Governance deployment</li>
              <li>AI scaling</li>
              <li>Mainnet launch</li>
            </ul>
          </CardContent>
        </Card>

        {/* Pillar 6: Future Horizons & Expansion */}
        <Card>
          <CardHeader>
            <CardTitle>Pillar 6: Future Horizons & Expansion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">1. Dream Nodes & Mintable Pocket Dimensions</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Vision</h4>
            <p className="text-slate-200">
              Enable users to transform dreams into ownable virtual spaces within the DreamVerse.
            </p>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Features</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Dream Node NFT minting</li>
              <li>Customizable Pocket Dimensions</li>
              <li>Resource-based upgrading</li>
              <li>Community hub potential</li>
              <li>Dynamic "Resonance" system</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">2. Lucid Core Physical World Integration</h3>
            <h4 className="text-lg font-medium text-pink-300 mb-1">Vision</h4>
            <p className="text-slate-200">
              Bridge digital DreamVerse with real-world experiences through companion applications.
            </p>

            <h4 className="text-lg font-medium text-pink-300 mb-1">Key Features</h4>
            <ul className="list-disc pl-6 space-y-1 text-slate-200">
              <li>Intelligent Dream Journaling</li>
              <li>Sleep & Pattern Tracking</li>
              <li>Mental State Awareness</li>
              <li>Personalized AI Insights</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
