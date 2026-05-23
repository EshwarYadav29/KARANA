"use client"
import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"

const steps = [
  { title: "Idea", description: "Bring us your concept, sketch, or problem statement." },
  { title: "Design", description: "We engineer and design a custom solution." },
  { title: "Quote", description: "You review the design and transparent pricing." },
  { title: "Build", description: "We manufacture or code your product." },
  { title: "Deliver", description: "You receive the final polished deliverable." },
]

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A streamlined process from concept to completion.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-background border-2 border-indigo-500/50 flex items-center justify-center relative z-10">
                  <span className="text-lg font-bold text-indigo-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
