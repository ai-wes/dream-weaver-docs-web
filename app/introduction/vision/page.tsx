import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 glow-text">
            The Vision
          </h1>
          <p className="text-xl text-blue-100 mt-2">Our vision for the Dream Weaver project</p>
          <div className="cosmic-divider w-full my-6"></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Page Under Construction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200">
              This page is currently under development. Content for "The Vision" will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
