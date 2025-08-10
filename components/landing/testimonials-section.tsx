import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "JobVoro helped me land my dream job. The organization features are incredible!",
    author: "Sarah M.",
    role: "Software Engineer",
  },
  {
    quote:
      "Finally, a job tracker that respects my privacy. The stealth mode is perfect.",
    author: "Mike R.",
    role: "Product Manager",
  },
  {
    quote:
      "I went from chaos to organized in minutes. This tool is a game-changer.",
    author: "Jessica L.",
    role: "UX Designer",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30 px-16">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-4">
            <span className="mr-2">💬</span>
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Loved by Job Seekers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users say about their experience with JobVoro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
