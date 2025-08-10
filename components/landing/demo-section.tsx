import { Card, CardContent } from "@/components/ui/card";

export function DemoSection() {
  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-4">
            <span className="mr-2">📱</span>
            Screenshots & Demo
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See JobVoro in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A clean, intuitive interface that makes job tracking effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold">Dashboard Overview</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Quick Stats & Overview</h4>
                <p className="text-sm text-muted-foreground">
                  See your job hunt progress at a glance with summary cards and
                  recent activity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">📋</span>
                  </div>
                  <h3 className="font-semibold">Job Cards</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Organized Job Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Each job application gets its own card with status, notes, and
                  timeline.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-violet-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold">Timeline View</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Visual Progress</h4>
                <p className="text-sm text-muted-foreground">
                  Track your application journey from applied to offer with
                  visual timelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
