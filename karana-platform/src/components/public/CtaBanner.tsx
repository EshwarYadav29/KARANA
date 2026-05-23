import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to build something amazing?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start your project today and get a comprehensive quote within 48 hours.
        </p>
        <Link href="/services" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700")}>
          Get Started Today
        </Link>
      </div>
    </section>
  )
}
