import { Card, CardContent } from "@/components/ui/card";
import { Bell, BarChart3, FileText, Eye, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Auto-reminders for follow-ups",
    description:
      "Never miss an important follow-up or interview again with smart notifications.",
  },
  {
    icon: BarChart3,
    title: "Timeline to track every step",
    description:
      "Visual progress tracking from application to offer with detailed timelines.",
  },
  {
    icon: FileText,
    title: "Private notes for each job",
    description:
      "Keep detailed notes, contacts, and insights for every application.",
  },
  {
    icon: Eye,
    title: "Visual progress tracker",
    description:
      "See your job hunt progress at a glance with intuitive dashboards.",
  },
  {
    icon: Calendar,
    title: "Interview scheduling",
    description:
      "Keep track of all your interviews and important dates in one place.",
  },
  {
    icon: Shield,
    title: "Complete privacy",
    description:
      "Your data stays private with stealth mode and secure encryption.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 px-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-4">
            <span className="mr-2">✨</span>
            Why JobVoro Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for the modern job seeker who values
            privacy and organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <feature.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
