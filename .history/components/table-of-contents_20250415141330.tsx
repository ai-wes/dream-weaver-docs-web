"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Define section types to help with visual hierarchy
interface Section {
  id: string
  title: string
  isMainSection?: boolean
  subsections?: { id: string; title: string }[]
}

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-10% 0px -90% 0px" },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Organized sections with hierarchy based on app/page.tsx
  const sections: Section[] = [
    { id: "executive-summary", title: "Executive Summary", isMainSection: true },
    { id: "vision", title: "The Vision", isMainSection: true },
    { id: "problem-opportunity", title: "Problem & Opportunity", isMainSection: true },
    { id: "target-audience", title: "Target Audience", isMainSection: true },
    { id: "dream-weaver-concept", title: "The Dream Weaver Concept", isMainSection: true },
    { id: "ai-powered-evolution", title: "AI-Powered Evolution", isMainSection: true },
    { id: "blockchain-significance", title: "Blockchain Significance", isMainSection: true },
    { id: "emergence-as-feature", title: "Emergence as a Feature", isMainSection: true },
  ]

  return (
    <nav className="sticky top-4 self-start p-4 bg-slate-900/50 backdrop-blur-md rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-blue-300">Contents</h3>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id} className={section.isMainSection ? "mt-2" : ""}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-xs transition-colors pl-2 border-l-2 w-full text-left",
                activeSection === section.id
                  ? "text-blue-300 border-blue-500"
                  : "text-slate-300 hover:text-blue-200 border-transparent",
                section.isMainSection && "font-medium",
              )}
            >
              {section.title}
            </button>

            {section.subsections && section.subsections.length > 0 && (
              <ul className="mt-1 ml-3 space-y-1 border-l border-slate-700">
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <button
                      onClick={() => scrollToSection(subsection.id)}
                      className={cn(
                        "text-xs transition-colors pl-2 border-l-2 w-full text-left py-1",
                        activeSection === subsection.id
                          ? "text-blue-300 border-blue-500"
                          : "text-slate-400 hover:text-blue-200 border-transparent",
                      )}
                    >
                      {subsection.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
