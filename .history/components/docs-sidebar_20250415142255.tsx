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
    // Allow matching parent paths for collapsible sections
    return pathname === path || pathname.startsWith(path + "/")
  }

  // Helper function to create menu items, reducing repetition
  const createMenuItem = (href: string, title: string) => (
    <SidebarMenuItem key={href}>
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  // Helper function to create sub-menu items
  const createSubMenuItem = (href: string, title: string) => (
    <SidebarMenuSubItem key={href}>
      <SidebarMenuSubButton asChild isActive={pathname === href}>
        <Link href={href}>{title}</Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )

  return (
    <Sidebar className="sidebar" collapsible="icon">
      <SidebarContent>
        {/* --- 0. Project Overview --- */}
        <Collapsible defaultOpen={isActive("/docs/project-overview")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              0. Project Overview
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/project-overview/project-overview-and-intro", "0.1 Intro")}
                {createMenuItem("/docs/project-overview/highlevel-ecosystem-review", "0.2 Ecosystem Review")}
                {createMenuItem("/docs/project-overview/who-is-it-for", "0.3 Audience")}
                {createMenuItem("/docs/project-overview/why-dreamweaver", "Why DreamWeaver?")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 1. The DreamWeaver --- */}
        <Collapsible defaultOpen={isActive("/docs/the-dreamweaver")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              1. The DreamWeaver
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/the-dreamweaver/dreamweaver-graph-overview", "1.1a Graph Overview")}
                {createMenuItem("/docs/the-dreamweaver/dreamweaver-graph-deepdive", "1.1b Graph Deepdive")}
                {createMenuItem("/docs/the-dreamweaver/dream-oracle", "1.2 Dream Oracle")}
                {createMenuItem("/docs/the-dreamweaver/dreamessencenodes-pocket-dimensions-and-ownership", "1.3 Nodes & Ownership")}
                {/* Consider adding AR node link if distinct: /docs/the-dreamweaver/ar-dream-nodes */}
                {createMenuItem("/docs/the-dreamweaver/dreamweaver-milestones", "Milestones")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 2. The Dream Soul & Lucid Core --- */}
        <Collapsible defaultOpen={isActive("/docs/the-dream-soul-lucid-core")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              2. Dream Soul & Lucid Core
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/the-dream-soul-lucid-core/dream-soul", "2.0 Overview")}
                {createMenuItem("/docs/the-dream-soul-lucid-core/dreamsoul-living-identity", "2.1 Living Identity")}
                {createMenuItem("/docs/the-dream-soul-lucid-core/dreamsoul-ai-entity", "2.2 AI Entity")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 3. Immersive Narrative Gameplay --- */}
        <Collapsible defaultOpen={isActive("/docs/immersive-narrative-gameplay")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              3. Immersive Gameplay
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/immersive-narrative-gameplay/core-loop-and-progression", "4.1 Core Loop & Progression")}
                {createMenuItem("/docs/immersive-narrative-gameplay/wisps", "4.2 Wisps")}
                {/* Consider adding wisps_the_wilds link if distinct: /docs/immersive-narrative-gameplay/wisps-the-wilds-the-weaver */}
                {createMenuItem("/docs/immersive-narrative-gameplay/dream-runes", "4.3 Dream Runes")}
                {createMenuItem("/docs/immersive-narrative-gameplay/combat-system", "4.4 Combat System")}
                {createMenuItem("/docs/immersive-narrative-gameplay/augmented-reality-integration", "4.5 AR Integration")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 4. Immutability Polygon Integration --- */}
        <Collapsible defaultOpen={isActive("/docs/immutability-polygon-integration")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              4. Blockchain & Polygon
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/immutability-polygon-integration/blockchain", "Overview")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 5. Architecture and BluePrint Deepdive --- */}
        <Collapsible defaultOpen={isActive("/docs/architecture-and-blueprint-deepdive")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              5. Architecture Deepdive
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/architecture-and-blueprint-deepdive/ai-systems-and-integrations", "AI Systems")}
                {createMenuItem("/docs/architecture-and-blueprint-deepdive/example-flow", "Example Flow")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 6. Roadmap --- */}
        <Collapsible defaultOpen={isActive("/docs/roadmap")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              6. Roadmap & Team
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/roadmap/the-team", "6.0 Team")}
                {createMenuItem("/docs/roadmap/detailed-roadmap-and-milestones", "6.1 Roadmap")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 7. Appendices --- */}
        <Collapsible defaultOpen={isActive("/docs/appendices")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              7. Appendices
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/docs/appendices/overall-architecture-diagrams", "Architecture Diagrams")}
                {createMenuItem("/docs/appendices/contracts", "Contracts")}
                {createMenuItem("/docs/appendices/code-examples", "Code Examples")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

      </SidebarContent>
    </Sidebar>
  )
}
