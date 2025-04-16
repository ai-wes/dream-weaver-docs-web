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
    // Use correct hrefs based on app/ directory structure
    links: [
      { href: "/project-overview/intro", title: "0.1 Intro" },
      { href: "/project-overview/ecosystem", title: "0.2 Ecosystem Review" },
      { href: "/project-overview/audience", title: "0.3 Audience" },
      { href: "/project-overview/why", title: "Why DreamWeaver?" },
    ],
  },
  {
    sectionTitle: "1. The DreamWeaver",
    links: [
      { href: "/dream-weaver-ai/graph-overview", title: "1.1a Graph Overview" },
      { href: "/dream-weaver-ai/graph-deepdive", title: "1.1b Graph Deepdive" },
      { href: "/dream-weaver-ai/dream-oracle", title: "1.2 Dream Oracle" },
      { href: "/dream-weaver-ai/nodes-ownership", title: "1.3 Nodes & Ownership" },
      { href: "/dream-weaver-ai/milestones", title: "Milestones" },
    ],
  },
  {
    sectionTitle: "2. Dream Soul & Lucid Core",
    links: [
        { href: "/dreamsoul/overview", title: "2.0 Overview"},
        { href: "/dreamsoul/identity", title: "2.1 Living Identity"},
        { href: "/dreamsoul/ai-entity", title: "2.2 AI Entity"},
    ],
  },
  {
    sectionTitle: "3. Immersive Gameplay",
     links: [
        { href: "/gameplay/loop", title: "4.1 Core Loop & Progression"},
        { href: "/gameplay/wisps", title: "4.2 Wisps"},
        { href: "/gameplay/runes", title: "4.3 Dream Runes"},
        { href: "/gameplay/combat", title: "4.4 Combat System"},
        { href: "/gameplay/ar", title: "4.5 AR Integration"},
    ],
  },
  {
    sectionTitle: "4. Blockchain & Polygon",
    links: [
      { href: "/blockchain/overview", title: "Overview"},
    ]
  },
   {
    sectionTitle: "5. Architecture Deepdive",
    links: [
      { href: "/architecture/ai-systems", title: "AI Systems"},
      { href: "/architecture/example-flow", title: "Example Flow"},
    ],
  },
  {
    sectionTitle: "6. Roadmap & Team",
    links: [
      { href: "/roadmap/team", title: "6.0 Team"},
      { href: "/roadmap/detailed", title: "6.1 Roadmap"},
    ],
  },
  {
    sectionTitle: "7. Appendices",
    links: [
      { href: "/appendices/diagrams", title: "Architecture Diagrams"},
      { href: "/appendices/contracts", title: "Contracts"},
      // Code examples link omitted
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
