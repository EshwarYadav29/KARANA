"use client"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl mx-auto text-balance">
              From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Reality.</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Not a freelance marketplace. Not a portfolio. A managed innovation studio — where clients bring rough ideas and get back engineered, designed, built solutions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/services" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700")}>
              Start a Project
            </Link>
            <Link href="/services" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-base")}>
              View Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
