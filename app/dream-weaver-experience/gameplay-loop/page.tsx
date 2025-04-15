import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GameplayLoopPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            Gameplay Loop Overview
          </h1>
          <p className="text-xl text-blue-100 mt-2">The core gameplay loop of Dream Weaver</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Core Gameplay Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dream Submission & Interpretation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exploration & Discovery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progression & Evolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
