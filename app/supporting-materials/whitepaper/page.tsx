import { Card } from "@/components/ui/card"

export default function WhitepaperPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="cosmic-card p-8">
        <div className="whitepaper">
          <h1 className="text-4xl font-cinzel font-bold tracking-wider text-white mb-6 uppercase text-center">
            DreamWeaver Litepaper
          </h1>
          <p className="text-center text-blue-300 mb-8">(Draft V1.0)</p>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              DreamWeaver is pioneering the first living dream metaverse, an AI-powered ecosystem built on Polygon where
              human subconsciousness shapes a dynamic, evolving digital world. Unlike traditional static virtual
              environments, DreamWeaver places an Emergent AI Core (the DreamWeaver Entity) at its heart. This central
              intelligence learns, adapts, and evolves directly from the collective dream narratives and emotional data
              submitted by users, moving beyond predefined scripts to generate truly emergent world behaviors and
              narratives.
            </p>
            <p>
              This project addresses the limitations of current digital experiences – the lack of genuine dynamism in
              metaverses and the opacity of AI development. DreamWeaver offers a paradigm shift by creating an
              environment that is constantly shaped by its inhabitants and an AI whose growth is transparently
              documented.
            </p>
            <p>
              Crucially, DreamWeaver leverages Polygon not just for efficient NFT management but for a novel
              application: providing an immutable, transparent ledger for the AI's evolution. Key developmental
              milestones of the DreamWeaver Entity are cryptographically hashed and anchored on-chain via dedicated,
              verified smart contracts (DreamWeaverGraph.sol, DreamWeaverJournal.sol on Amoy testnet), offering
              unprecedented verifiability for AI research and fostering user trust.
            </p>
            <p>
              A functional core prototype demonstrating the AI processing loop, knowledge graph interaction, and
              on-chain milestone anchoring is currently operational and deployed on the Polygon Amoy testnet, validating
              the technical feasibility of our hybrid architecture. This Litepaper outlines the vision, technology, and
              roadmap for DreamWeaver.
            </p>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 1: The DreamWeaver Ecosystem</h2>
            <p>DreamWeaver's architecture is built upon several interconnected pillars:</p>

            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>The Emergent AI Core (DreamWeaver Entity):</strong> More than an NPC, the Entity is the nascent
                "life force" of the DreamVerse. It learns from user dreams, emotions, and interactions, stored within
                its knowledge graph. Its behavior, understanding, and capabilities evolve organically over time based on
                this input, creating a co-creative loop between users and the AI. Key components include Python
                orchestration, Neo4j (Knowledge Graph), MongoDB Atlas (Vector Search), PyTorch Geometric (GNN for
                insights), and a DRL agent for decision-making. The on-chain anchoring of its evolution provides a
                unique platform for researching emergent AI behavior.
              </li>
              <li>
                <strong>Evolving User Identity (DreamSoul):</strong> Represented by an ERC721 NFT, the DreamSoul is a
                user's dynamic digital identity. It evolves visually and functionally as users submit dreams, which are
                processed by the Dream Oracle into "Dream Essences" linked via on-chain metadata. Higher DreamSoul
                levels unlock capabilities and potential governance rights within the ecosystem.
              </li>
              <li>
                <strong>Immersive Gameplay & Narrative Integration:</strong> Gameplay is not separate but the primary
                interface for interacting with the AI and the DreamVerse. Users submit dreams, receive interpretations
                (generating Dream Runes), explore nodes on the DreamWeaver Graph, and engage with entities like Dream
                Wisps. Success relies on understanding AI cues and leveraging personalized elements derived from one's
                own subconscious input.
              </li>
              <li>
                <strong>Blockchain Foundation & Immutability (Polygon):</strong> Polygon provides the critical
                foundation for trust and verification. Beyond standard NFT ownership (DreamSouls, Dream Nodes, Wisps),
                its primary role is verifiable AI evolution tracking. By anchoring AI state hashes and journal entries
                on-chain (DreamWeaverGraph.sol, DreamWeaverJournal.sol), we create a transparent, auditable record of
                the AI's development, leveraging Polygon's scalability, low fees, and EVM compatibility. Our core
                contracts utilize the UUPS upgradeability pattern and are deployed on the Amoy testnet.
              </li>
              <li>
                <strong>Technical Architecture:</strong> DreamWeaver employs a hybrid architecture:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Off-Chain: Python backend (Flask/FastAPI), Neo4j, MongoDB Atlas Vector Search, PyTorch/PyTorch
                    Geometric (GNN/DRL), Sentence-Transformers, OpenAI API.
                  </li>
                  <li>
                    On-Chain (Polygon): Upgradeable Solidity smart contracts (UUPS) for NFTs, AI anchoring, utility
                    tokens, and future governance.
                  </li>
                  <li>Frontend: Modern JavaScript framework with Web3 libraries and 3D visualization capabilities.</li>
                </ul>
              </li>
              <li>
                <strong>Future Horizons:</strong> Long-term plans include enabling users to develop Dream Nodes into
                customizable "Pocket Dimensions" and exploring deeper physical world integrations via AR and companion
                apps (e.g., intelligent dream journaling).
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 2: The DreamWeaver AI System</h2>
            <p>The intelligence of DreamWeaver resides in a sophisticated AI system:</p>

            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li>
                <strong>The DreamWeaver Graph (The AI's Mind):</strong> This is not a static database but a dynamic
                Neo4j knowledge graph representing the AI's evolving memory and understanding.
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Nodes:</strong> Represent entities like Dreams, Symbols, Users, AI-generated Hypotheses,
                    Lore, Events, Wisps, Realms, and Evolution Milestones. Nodes store properties and often semantic
                    vector embeddings.
                  </li>
                  <li>
                    <strong>Strings (Relationships):</strong> Act like adaptable synapses (e.g., CONTAINS_SYMBOL,
                    SUPPORTED_BY) connecting nodes, with weights adjusted by the AI based on relevance and time (edge
                    fading).
                  </li>
                  <li>
                    <strong>Dynamics:</strong> The graph constantly changes through user input (dream processing), AI
                    actions (lore generation, hypothesis testing based on GNN insights and DRL decisions), and
                    maintenance (pruning, fading).
                  </li>
                  <li>
                    <strong>Verifiable Evolution Link:</strong> Critical AI evolution milestones trigger the anchoring
                    process: milestone data is hashed, the hash is sent to DreamWeaverGraph.sol on Polygon, and the
                    resulting transaction hash is stored in an EvolutionEvent node within the Neo4j graph, creating a
                    verifiable link between the off-chain state and the on-chain record.
                  </li>
                </ul>
              </li>
              <li>
                <strong>The Dream Oracle (The Interpreter):</strong> This AI component analyzes user-submitted dream
                narratives using NLP and symbolic interpretation frameworks.
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Function:</strong> Extracts symbols, themes, and emotional resonance.
                  </li>
                  <li>
                    <strong>Output:</strong> Generates personalized "Dream Essences" – data structures containing
                    symbolic metadata, realm affinity, potentially AI-generated visuals (via models like Stable
                    Diffusion), and resonance scores.
                  </li>
                  <li>
                    <strong>Integration:</strong> Dream Essences fuel DreamSoul evolution and provide new data points
                    (nodes/relationships) for the DreamWeaver Graph, influencing the AI Entity's learning cycle.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 3: Digital Identity & Ownership</h2>
            <p>DreamWeaver empowers users with meaningful digital identity and ownership:</p>

            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li>
                <strong>DreamSoul (Living Identity):</strong> As detailed in Chapter 1, the DreamSoul ERC721 NFT is the
                core identity, evolving based on user participation and Dream Essence collection. Its dynamic nature,
                driven by AI interpretation and on-chain updates, distinguishes it from static digital collectibles.
              </li>
              <li>
                <strong>Dream Nodes & Pocket Dimensions:</strong> Dreams can manifest as ownable territory within the
                DreamVerse.
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Minting:</strong> Dream interpretation by the Oracle generates coordinates on the
                    DreamWeaver Graph, allowing the user to mint a unique Dream Node NFT (e.g.,
                    DreamEssenceNodeUpgradeable.sol).
                  </li>
                  <li>
                    <strong>Evolution:</strong> Users can invest resources (like Dream Coins, Time Tokens) to upgrade
                    their static Dream Node into a fully customizable, interactive metaverse space – a "Pocket
                    Dimension."
                  </li>
                  <li>
                    <strong>Ownership & Utility:</strong> Provides true ownership of personalized virtual space,
                    potential for social hubs, resource generation, and integration into the wider interconnected
                    DreamVerse narrative and economy.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Augmented Reality (AR) Integration:</strong> Future plans include using contracts like
                DreamNFTExtensionAR.sol to link AR metadata (3D models, interaction logic) to Dream Essence Nodes,
                allowing users to visualize and interact with aspects of their DreamVerse in the physical world.
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 4: Gameplay Mechanics (Overview)</h2>
            <p>
              While the initial grant focuses on core infrastructure and AI refinement, the long-term vision includes
              immersive gameplay:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Lucid Core:</strong> The player's primary ERC721 identity token, acting as a gateway and housing
                unit for Dream Wisps.
              </li>
              <li>
                <strong>Dream Wisps:</strong> Collectible companion entities (NFTs, e.g., DreamWispNFT.sol) with
                elemental affinities, used for exploration, puzzle-solving, and combat. Their behavior can be influenced
                by bonding levels and alignment with the player's DreamSoul.
              </li>
              <li>
                <strong>Dream Runes:</strong> Generated from dreams, these consumable or rechargeable items provide
                buffs, unlock pathways, and reveal narrative fragments. Their energy mechanics tie into strategy and
                potential tokenomics (DreamCoin.sol, TimeToken.sol).
              </li>
              <li>
                <strong>Combat System:</strong> Planned as a strategic Rock-Paper-Scissors system enhanced by Wisp
                elemental affinities and Rune usage.
              </li>
              <li>
                <strong>AR Interactions:</strong> Future gameplay includes interacting with and "feeding" Wisps in AR to
                boost bonding and manage energy.
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 5: Polygon Integration & Smart Contracts</h2>
            <p>Polygon is the bedrock of DreamWeaver's verifiability and decentralized components:</p>

            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Why Polygon:</strong> Chosen for its scalability, low transaction fees, EVM compatibility,
                robust developer tooling, and strong community support.
              </li>
              <li>
                <strong>Core Innovation - Verifiable AI:</strong> The primary use case is anchoring AI evolution
                milestones (DreamWeaverGraph.sol) and journal entries (DreamWeaverJournal.sol) on-chain. This provides
                an immutable, publicly auditable record of the AI's development, fostering trust and enabling research.
              </li>
              <li>
                <strong>Deployed & Verified Contracts (Amoy Testnet):</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>DreamWeaverGraph.sol: Anchors AI state hashes.</li>
                  <li>DreamWeaverJournal.sol: Stores AI journal entries linked to evolution levels.</li>
                  <li>LucidCore.sol: Represents the core user identity NFT needed for interaction.</li>
                  <li>DreamEssenceNodeUpgradeable.sol: Manages the minting/metadata of Dream Node NFTs.</li>
                  <li>
                    DreamNFT.sol / DreamNFTUpgradeSystem.sol / FragmentOfLucidity.sol / TimeToken.sol: Manage DreamSoul
                    evolution mechanics.
                  </li>
                  <li>DreamCoin.sol: In-ecosystem utility token.</li>
                  <li>DreamWispNFT.sol: Contract for companion NFTs.</li>
                  <li>DreamGovernance.sol: Planned contract for future decentralized governance.</li>
                  <li>DreamNFTExtensionAR.sol: Planned contract for AR metadata.</li>
                </ul>
              </li>
              <li>
                <strong>Technical Features:</strong> Contracts utilize the UUPS upgradeability pattern for future
                enhancements. Secure oracle services interact with the contracts to bridge off-chain AI data.
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 6: Technical Architecture</h2>
            <p>
              DreamWeaver utilizes a hybrid architecture combining robust off-chain processing with secure on-chain
              verification:
            </p>

            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li>
                <strong>Off-Chain Stack:</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Backend: Python (Flask/FastAPI) orchestrating AI logic and API interactions.</li>
                  <li>Knowledge Graph: Neo4j database storing the dynamic DreamWeaver Graph.</li>
                  <li>
                    Vector Database: MongoDB Atlas with Vector Search for semantic similarity and embedding
                    storage/retrieval.
                  </li>
                  <li>
                    AI Models: PyTorch/PyTorch Geometric for GNN (Insight Engine), custom DRL implementation (Emergent
                    Decision Agent), Sentence-Transformers for embeddings, OpenAI API for specific NLP tasks (e.g.,
                    Oracle interpretation, Journal generation).
                  </li>
                </ul>
              </li>
              <li>
                <strong>On-Chain Stack (Polygon):</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Smart Contracts: Solidity-based, upgradeable (UUPS) contracts managing NFTs, AI state anchoring,
                    utility tokens, and governance.
                  </li>
                  <li>
                    Storage: IPFS for storing larger metadata assets (images, potential future 3D models) linked from
                    NFTs.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Frontend:</strong> Modern JavaScript framework (e.g., React, Vue) using Web3 libraries
                (ethers.js/web3.js) for wallet interaction and potentially Three.js for 3D visualization of the graph or
                metaverse elements.
              </li>
              <li>
                <strong>Integration:</strong> Secure API gateway manages communication. An oracle service (part of the
                backend) handles authorized interactions with smart contracts based on AI events.
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 7: Roadmap & Team</h2>
            <p>
              <strong>Roadmap:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Phase 1 (Completed):</strong> Concept, architecture design, initial contracts, prototype plan.
              </li>
              <li>
                <strong>Phase 2 (Current - Grant Focus - 6 Months):</strong> Focus on refining the functional Amoy
                prototype, scaling infrastructure, optimizing AI models, polishing the UI/UX, designing core gameplay
                mechanics (Wisp/Rune foundations), preparing for smart contract audits, and developing a mainnet
                strategy. This phase leverages the founder's expertise and targeted contract support funded by the
                grant.
              </li>
              <li>
                <strong>Phase 3 (Future):</strong> Full gameplay implementation (Wisp/Rune loops, combat, node
                exploration), mainnet launch preparation, closed alpha/beta testing. Requires core team expansion.
              </li>
              <li>
                <strong>Phase 4 (Long-Term):</strong> Mainnet launch, ecosystem growth, AR feature development,
                decentralized governance implementation, marketplace integration, advanced AI capabilities, research
                publication.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Team:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Current:</strong> Led by Wes Lagarde (Founder/Lead Developer), who bootstrapped the project and
                developed the functional prototype, demonstrating core technical execution.
              </li>
              <li>
                <strong>Grant Strategy (Option C):</strong> Grant funding will support the founder's continued full-time
                technical leadership and enable the engagement of specialized contract developers for key Phase 2
                milestones (UI/UX, Backend Optimization, Audit Prep), ensuring focused progress and capital efficiency.
                Future funding rounds will target building a full-time core team.
              </li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Chapter 8: Target Audience & Value Proposition</h2>
            <p>DreamWeaver appeals to a diverse audience:</p>

            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>End Users:</strong> Seeking personalized, meaningful digital experiences, novel gaming
                mechanics, dynamic NFTs, and tools for self-discovery through dreams.
              </li>
              <li>
                <strong>Developers & Creators:</strong> Attracted to a unique platform blending AI, blockchain, and
                immersive tech, offering APIs/SDKs for building within a living ecosystem.
              </li>
              <li>
                <strong>Research Communities:</strong> Leveraging DreamWeaver as a large-scale, verifiable testbed for
                studying emergent AI, collective intelligence, and human-AI interaction.
              </li>
              <li>
                <strong>Polygon & Web3 Ecosystem:</strong> Benefiting from a flagship application showcasing advanced AI
                integration, dynamic NFTs, and innovative use of Polygon for verifiable AI.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Unique Value Proposition:</strong> DreamWeaver is not just another metaverse or AI tool. It is:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The first living dream metaverse shaped by collective subconsciousness.</li>
              <li>A platform featuring an emergent AI that learns and evolves, unlike static scripted AI.</li>
              <li>Pioneering verifiable AI evolution anchored on the Polygon blockchain.</li>
              <li>Offering truly dynamic, evolving NFTs (DreamSouls) tied to user participation.</li>
              <li>A potential research network for mapping subconscious patterns on an unprecedented scale.</li>
            </ul>
          </div>

          <div className="chapter">
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              DreamWeaver represents a bold step towards the future of interactive digital experiences. By fusing
              emergent AI with the transparency and immutability of the Polygon blockchain, we are creating more than
              just a game or metaverse; we are building a living ecosystem that learns, grows, and reflects the
              collective imagination of its users. Our functional prototype on Polygon Amoy validates the core technical
              premise. With community support and grant funding, we aim to refine this foundation, implement engaging
              gameplay, and realize the full potential of a verifiable, evolving digital dreamworld built on Polygon.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
