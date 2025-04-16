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
    // Check if the current pathname starts with the base path of the section
    return pathname.startsWith(path)
  }

  // Helper function to create menu items, reducing repetition
  const createMenuItem = (href: string, title: string) => (
    <SidebarMenuItem key={href}>
      {/* Check exact path for active button state */}
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  // Helper function to create sub-menu items (if needed, otherwise can be removed)
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
        <Collapsible defaultOpen={isActive("/project-overview")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              0. Project Overview
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/project-overview/intro", "0.1 Intro")}
                {createMenuItem("/project-overview/ecosystem", "0.2 Ecosystem Review")}
                {createMenuItem("/project-overview/audience", "0.3 Audience")}
                {createMenuItem("/project-overview/why", "Why DreamWeaver?")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 1. The DreamWeaver --- */}
        <Collapsible defaultOpen={isActive("/dream-weaver-ai")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              1. The DreamWeaver
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/dream-weaver-ai/graph-overview", "1.1a Graph Overview")}
                {createMenuItem("/dream-weaver-ai/graph-deepdive", "1.1b Graph Deepdive")}
                {createMenuItem("/dream-weaver-ai/dream-oracle", "1.2 Dream Oracle")}
                {createMenuItem("/dream-weaver-ai/nodes-ownership", "1.3 Nodes & Ownership")}
                {createMenuItem("/dream-weaver-ai/milestones", "Milestones")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 2. Dream Soul & Lucid Core --- */}
        <Collapsible defaultOpen={isActive("/dreamsoul")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              2. Dream Soul & Lucid Core
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/dreamsoul/overview", "2.0 Overview")}
                {createMenuItem("/dreamsoul/identity", "2.1 Living Identity")}
                {createMenuItem("/dreamsoul/ai-entity", "2.2 AI Entity")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 3. Immersive Gameplay --- */}
        <Collapsible defaultOpen={isActive("/gameplay")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              3. Immersive Gameplay
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/gameplay/loop", "4.1 Core Loop & Progression")}
                {createMenuItem("/gameplay/wisps", "4.2 Wisps")}
                {createMenuItem("/gameplay/runes", "4.3 Dream Runes")}
                {createMenuItem("/gameplay/combat", "4.4 Combat System")}
                {createMenuItem("/gameplay/ar", "4.5 AR Integration")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 4. Blockchain & Polygon --- */}
        <Collapsible defaultOpen={isActive("/blockchain")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              4. Blockchain & Polygon
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/blockchain/overview", "Overview")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 5. Architecture Deepdive --- */}
        <Collapsible defaultOpen={isActive("/architecture")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              5. Architecture Deepdive
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/architecture/ai-systems", "AI Systems")}
                {createMenuItem("/architecture/example-flow", "Example Flow")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 6. Roadmap & Team --- */}
        <Collapsible defaultOpen={isActive("/roadmap")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              6. Roadmap & Team
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/roadmap/team", "6.0 Team")}
                {createMenuItem("/roadmap/detailed", "6.1 Roadmap")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

        <SidebarSeparator />

        {/* --- 7. Appendices --- */}
        <Collapsible defaultOpen={isActive("/appendices")} className="group/collapsible">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="sidebar-collapsible-trigger text-blue-300">
              7. Appendices
              <ChevronDown className="chevron-rotate" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {createMenuItem("/appendices/diagrams", "Architecture Diagrams")}
                {createMenuItem("/appendices/contracts", "Contracts")}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>

      </SidebarContent>
    </Sidebar>
  )
}
