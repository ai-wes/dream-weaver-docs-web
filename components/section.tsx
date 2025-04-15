import type { ReactNode } from "react"

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/20">
        <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 mb-6">
          {title}
        </h2>
        <div className="cosmic-divider w-full mb-8"></div>
        <div className="space-y-6 text-sm">{children}</div>
      </div>
    </section>
  )
}
