import { HeroSection } from "@/components/public/HeroSection"
import { ServicesOverview } from "@/components/public/ServicesOverview"
import { ProcessTimeline } from "@/components/public/ProcessTimeline"
import { StatsBar } from "@/components/public/StatsBar"
import { TestimonialsSection } from "@/components/public/TestimonialsSection"
import { CtaBanner } from "@/components/public/CtaBanner"
import { prisma } from "@/lib/prisma"

export default async function LandingPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesOverview services={services} />
      <ProcessTimeline />
      <StatsBar />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  )
}
