import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DreamRunePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            Dream Rune System
          </h1>
          <p className="text-xl text-blue-100 mt-2">How Dream Runes enhance gameplay and progression</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rune Types & Effects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acquisition & Creation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage & Energy Mechanics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rune Combinations & Synergies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
