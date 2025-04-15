import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SocialCreativePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text font-cinzel">
            Social & Creative Aspects
          </h1>
          <p className="text-xl text-blue-100 mt-2">Community and creative features in Dream Weaver</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Community Interaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Creative Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared Experiences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collaborative Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
