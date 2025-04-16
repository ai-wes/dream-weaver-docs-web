"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Define new interfaces for the documentation structure
interface DocLink {
  href: string
  title: string
}

interface DocSection {
  sectionTitle: string
  // basePath: string // Base path for checking active section - might need adjustment
  links: DocLink[]
}

// Define the documentation structure based on docs-sidebar.tsx
const docSections: DocSection[] = [
  {
    sectionTitle: "0. Project Overview",
    // basePath: "/docs/project-overview",
    links: [
      { href: "/docs/project-overview/project-overview-and-intro", title: "0.1 Intro" },
      { href: "/docs/project-overview/highlevel-ecosystem-review", title: "0.2 Ecosystem Review" },
      { href: "/docs/project-overview/who-is-it-for", title: "0.3 Audience" },
      { href: "/docs/project-overview/why-dreamweaver", title: "Why DreamWeaver?" },
    ],
  },
  {
    sectionTitle: "1. The DreamWeaver",
    // basePath: "/docs/the-dreamweaver",
    links: [
      { href: "/docs/the-dreamweaver/dreamweaver-graph-overview", title: "1.1a Graph Overview" },
      { href: "/docs/the-dreamweaver/dreamweaver-graph-deepdive", title: "1.1b Graph Deepdive" },
      { href: "/docs/the-dreamweaver/dream-oracle", title: "1.2 Dream Oracle" },
      { href: "/docs/the-dreamweaver/dreamessencenodes-pocket-dimensions-and-ownership", title: "1.3 Nodes & Ownership" },
      { href: "/docs/the-dreamweaver/dreamweaver-milestones", title: "Milestones" },
    ],
  },
  {
    sectionTitle: "2. Dream Soul & Lucid Core",
    // basePath: "/docs/the-dream-soul-lucid-core",
    links: [
        { href: "/docs/the-dream-soul-lucid-core/dream-soul", title: "2.0 Overview"},
        { href: "/docs/the-dream-soul-lucid-core/dreamsoul-living-identity", title: "2.1 Living Identity"},
        { href: "/docs/the-dream-soul-lucid-core/dreamsoul-ai-entity", title: "2.2 AI Entity"},
    ],
  },
  {
    sectionTitle: "3. Immersive Gameplay",
    // basePath: "/docs/immersive-narrative-gameplay",
     links: [
        { href: "/docs/immersive-narrative-gameplay/core-loop-and-progression", title: "4.1 Core Loop & Progression"},
        { href: "/docs/immersive-narrative-gameplay/wisps", title: "4.2 Wisps"},
        { href: "/docs/immersive-narrative-gameplay/dream-runes", title: "4.3 Dream Runes"},
        { href: "/docs/immersive-narrative-gameplay/combat-system", title: "4.4 Combat System"},
        { href: "/docs/immersive-narrative-gameplay/augmented-reality-integration", title: "4.5 AR Integration"},
    ],
  },
  {
    sectionTitle: "4. Blockchain & Polygon",
    // basePath: "/docs/immutability-polygon-integration",
    links: [
      { href: "/docs/immutability-polygon-integration/blockchain", title: "Overview"},
    ]
  },
   {
    sectionTitle: "5. Architecture Deepdive",
    // basePath: "/docs/architecture-and-blueprint-deepdive",
    links: [
      { href: "/docs/architecture-and-blueprint-deepdive/ai-systems-and-integrations", title: "AI Systems"},
      { href: "/docs/architecture-and-blueprint-deepdive/example-flow", title: "Example Flow"},
    ],
  },
  {
    sectionTitle: "6. Roadmap & Team",
    // basePath: "/docs/roadmap",
    links: [
      { href: "/docs/roadmap/the-team", title: "6.0 Team"},
      { href: "/docs/roadmap/detailed-roadmap-and-milestones", title: "6.1 Roadmap"},
    ],
  },
  {
    sectionTitle: "7. Appendices",
    // basePath: "/docs/appendices",
    links: [
      { href: "/docs/appendices/overall-architecture-diagrams", title: "Architecture Diagrams"},
      { href: "/docs/appendices/contracts", title: "Contracts"}, // Assuming links to directory index
      { href: "/docs/appendices/code-examples", title: "Code Examples"}, // Assuming links to directory index
    ]
  }
];


const TableOfContents = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky top-4 self-start p-4 bg-slate-900/50 backdrop-blur-md rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-blue-300">Documentation</h3>
      <ul className="space-y-2">
        {docSections.map((section) => (
          <li key={section.sectionTitle}>
            <span className="text-sm font-medium text-blue-200 block mb-1">
              {section.sectionTitle}
            </span>
            <ul className="space-y-1 ml-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xs transition-colors pl-2 border-l-2 w-full text-left block",
                      pathname === link.href
                        ? "text-blue-300 border-blue-500"
                        : "text-slate-300 hover:text-blue-200 border-transparent",
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
