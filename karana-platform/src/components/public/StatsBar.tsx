"use client"
import { motion } from "motion/react"

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "14", label: "Core Services" },
  { value: "48hr", label: "Average Response" },
  { value: "100%", label: "Satisfaction Rate" },
]

export function StatsBar() {
  return (
    <section className="py-20 border-y border-border/50 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
