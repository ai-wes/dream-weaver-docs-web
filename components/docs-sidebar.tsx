"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function DocsSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar className="sidebar" collapsible="icon">
      <SidebarContent>
        {/* Introduction Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Introduction</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/executive-summary")}>
                  <Link href="/introduction/executive-summary">Executive Summary</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/project-overview")}>
                  <Link href="/introduction/project-overview">Project Overview</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/vision")}>
                  <Link href="/introduction/vision">The Vision</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/problem-opportunity")}>
                  <Link href="/introduction/problem-opportunity">Problem & Opportunity</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/target-audience")}>
                  <Link href="/introduction/target-audience">Target Audience</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/introduction/target-audience-detailed")}>
                  <Link href="/introduction/target-audience-detailed">Who Is DreamWeaver For?</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Core Innovation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Core Innovation: AI x Blockchain</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/core-innovation/dream-weaver-concept")}>
                  <Link href="/core-innovation/dream-weaver-concept">The Dream Weaver Concept</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/core-innovation/ai-powered-evolution")}>
                  <Link href="/core-innovation/ai-powered-evolution">AI-Powered Evolution</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/core-innovation/blockchain-significance")}>
                  <Link href="/core-innovation/blockchain-significance">Blockchain Significance</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/core-innovation/emergence-as-feature")}>
                  <Link href="/core-innovation/emergence-as-feature">Emergence as a Feature</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Dream Weaver Experience Section */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              The Dream Weaver Experience
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dream-weaver-experience/gameplay-loop")}>
                    <Link href="/dream-weaver-experience/gameplay-loop">Gameplay Loop Overview</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        Core Gameplay Mechanics
                        <ChevronDown className="chevron-rotate" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive("/dream-weaver-experience/core-mechanics/dream-realms")}
                          >
                            <Link href="/dream-weaver-experience/core-mechanics/dream-realms">
                              Exploring Dream Realms & Nodes
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive("/dream-weaver-experience/core-mechanics/wisp-capturing")}
                          >
                            <Link href="/dream-weaver-experience/core-mechanics/wisp-capturing">
                              Wisp Capturing & AR Integration
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive("/dream-weaver-experience/core-mechanics/battle-system")}
                          >
                            <Link href="/dream-weaver-experience/core-mechanics/battle-system">
                              Battle System Fundamentals
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive("/dream-weaver-experience/core-mechanics/dream-rune")}
                          >
                            <Link href="/dream-weaver-experience/core-mechanics/dream-rune">Dream Rune System</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dream-weaver-experience/player-progression")}>
                    <Link href="/dream-weaver-experience/player-progression">Player Progression</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dream-weaver-experience/social-creative")}>
                    <Link href="/dream-weaver-experience/social-creative">Social & Creative Aspects</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
                The Engine: AI & Narrative Systems
                <ChevronDown className="chevron-rotate" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          The Dream Oracle
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dream-oracle/role")}>
                              <Link href="/engine/dream-oracle/role">Role: Dream Interpretation & Personalization</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dream-oracle/ai-workflow")}>
                              <Link href="/engine/dream-oracle/ai-workflow">Conceptual AI Workflow</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dream-oracle/impact")}>
                              <Link href="/engine/dream-oracle/impact">Impact on NFTs & Gameplay</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          The Dreamweaver Graph
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dreamweaver-graph/role")}>
                              <Link href="/engine/dreamweaver-graph/role">Role: Mapping Collective Consciousness</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dreamweaver-graph/structure")}>
                              <Link href="/engine/dreamweaver-graph/structure">Knowledge Graph Structure</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/engine/dreamweaver-graph/dynamics")}>
                              <Link href="/engine/dreamweaver-graph/dynamics">
                                Real-time Dynamics & Narrative Influence
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/engine/dwidea")}>
                      <Link href="/engine/dwidea">DWIDEA (AI Marketing/Narrative Agents)</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
                The Foundation: DreamSoul NFT & Identity
                <ChevronDown className="chevron-rotate" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/foundation/lucid-core")}>
                      <Link href="/foundation/lucid-core">The Lucid Core</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          The DreamSoul NFT
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/foundation/dreamsoul/evolving-identity")}
                            >
                              <Link href="/foundation/dreamsoul/evolving-identity">An Evolving Digital Identity</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/foundation/dreamsoul/dynamic-metadata")}>
                              <Link href="/foundation/dreamsoul/dynamic-metadata">Dynamic Metadata Explained</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/foundation/dreamsoul/visual-evolution")}>
                              <Link href="/foundation/dreamsoul/visual-evolution">Visual Evolution Process</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          Upgrade & Evolution Mechanics
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/foundation/upgrade/fragment-fusion")}>
                              <Link href="/foundation/upgrade/fragment-fusion">Fragment Fusion System</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/foundation/upgrade/time-token")}>
                              <Link href="/foundation/upgrade/time-token">Time Token Utility</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/foundation/upgrade/progression-paths")}>
                              <Link href="/foundation/upgrade/progression-paths">Challenges & Progression Paths</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/foundation/marketplace")}>
                      <Link href="/foundation/marketplace">Marketplace Overview</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
                Ecosystem & Sustainability
                <ChevronDown className="chevron-rotate" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          Tokenomics
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/tokenomics/dream-token")}
                            >
                              <Link href="/ecosystem-sustainability/tokenomics/dream-token">$DREAM Token</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/tokenomics/fragments")}
                            >
                              <Link href="/ecosystem-sustainability/tokenomics/fragments">Fragments of Lucidity</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/tokenomics/time-tokens")}
                            >
                              <Link href="/ecosystem-sustainability/tokenomics/time-tokens">Time Tokens</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/tokenomics/value-flow")}
                            >
                              <Link href="/ecosystem-sustainability/tokenomics/value-flow">
                                Value Flow & Economic Model
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/tokenomics/sustainability")}
                            >
                              <Link href="/ecosystem-sustainability/tokenomics/sustainability">
                                Sustainability Plan
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          Polygon Alignment & Benefits
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/polygon/why-polygon")}
                            >
                              <Link href="/ecosystem-sustainability/polygon/why-polygon">Why Polygon?</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/polygon/technical-integration")}
                            >
                              <Link href="/ecosystem-sustainability/polygon/technical-integration">
                                Technical Integration Details
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive("/ecosystem-sustainability/polygon/contribution")}
                            >
                              <Link href="/ecosystem-sustainability/polygon/contribution">
                                Contribution to the Polygon Ecosystem
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/ecosystem-sustainability/governance")}>
                      <Link href="/ecosystem-sustainability/governance">Governance Model</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
                Execution Plan
                <ChevronDown className="chevron-rotate" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/execution-plan/team")}>
                      <Link href="/execution-plan/team">The Team</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          Project Roadmap & Milestones
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/roadmap/phase-1")}>
                              <Link href="/execution-plan/roadmap/phase-1">Phase 1: Genesis</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/roadmap/phase-2")}>
                              <Link href="/execution-plan/roadmap/phase-2">Phase 2: Expansion</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/roadmap/phase-3")}>
                              <Link href="/execution-plan/roadmap/phase-3">Phase 3: Evolution</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/roadmap/future-vision")}>
                              <Link href="/execution-plan/roadmap/future-vision">Future Vision</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          Budget & Resource Allocation
                          <ChevronDown className="chevron-rotate" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/budget/total-request")}>
                              <Link href="/execution-plan/budget/total-request">Total Grant Request Amount</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/budget/breakdown")}>
                              <Link href="/execution-plan/budget/breakdown">Detailed Breakdown</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/execution-plan/budget/justification")}>
                              <Link href="/execution-plan/budget/justification">Justification of Funds</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Impact & Measurement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/impact-measurement/success-metrics")}>
                  <Link href="/impact-measurement/success-metrics">Success Metrics</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/impact-measurement/potential-impact")}>
                  <Link href="/impact-measurement/potential-impact">Potential Impact</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Supporting Materials</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/supporting-materials/whitepaper")}>
                  <Link href="/supporting-materials/whitepaper">Link to Whitepaper</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/supporting-materials/landing-page")}>
                  <Link href="/supporting-materials/landing-page">Link to Landing Page</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/supporting-materials/demo")}>
                  <Link href="/supporting-materials/demo">Link to Demo / Prototype</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/supporting-materials/technical-docs")}>
                  <Link href="/supporting-materials/technical-docs">Link to Technical Documentation</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/supporting-materials/pitch-deck")}>
                  <Link href="/supporting-materials/pitch-deck">Link to Pitch Deck</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Contact & Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/contact-community/partnership-inquiries")}>
                  <Link href="/contact-community/partnership-inquiries">Partnership Inquiries</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/contact-community/join-community")}>
                  <Link href="/contact-community/join-community">Join Discord / Twitter / Telegram</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
