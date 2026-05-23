"use client"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "KARANA delivered our IoT prototype weeks ahead of schedule. The engineering quality is unmatched.",
    author: "Sarah J.",
    role: "Founder, TechStart",
  },
  {
    quote: "They took our rough sketch and turned it into a production-ready CAD model. Highly recommended.",
    author: "Michael T.",
    role: "Lead Engineer, BuildCo",
  },
  {
    quote: "The web app they built is blazingly fast and looks beautiful. A true premium service.",
    author: "Elena R.",
    role: "CEO, DigitalWave",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
