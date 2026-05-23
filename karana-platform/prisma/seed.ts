import { PrismaClient, ServiceCategory } from "@prisma/client"

const prisma = new PrismaClient()

const services = [
  { slug: "cad-design",              name: "CAD Design",              category: ServiceCategory.ENGINEERING,    shortDesc: "Precision 3D models and engineering drawings.", startingAt: 299, turnaround: "5–10 days", longDesc: "Detailed engineering and CAD design services. From conceptual 3D models to production-ready manufacturing drawings." },
  { slug: "simulation",              name: "Simulation",              category: ServiceCategory.ENGINEERING,    shortDesc: "FEA, CFD, and multi-physics simulations.", startingAt: 399, turnaround: "7–14 days", longDesc: "Advanced engineering simulations to validate and optimize your designs." },
  { slug: "animation",               name: "Animation",               category: ServiceCategory.CREATIVE,       shortDesc: "3D product and technical animations.", startingAt: 499, turnaround: "7–14 days", longDesc: "Stunning 3D animations that explain your product." },
  { slug: "3d-printing",             name: "3D Printing",             category: ServiceCategory.MANUFACTURING,  shortDesc: "Rapid prototyping and end-use parts.", startingAt: 149, turnaround: "3–7 days", longDesc: "Industrial grade 3D printing in various materials." },
  { slug: "iot-projects",            name: "IoT Projects",            category: ServiceCategory.HARDWARE,       shortDesc: "Connected devices from concept to deployment.", startingAt: 799, turnaround: "14–30 days", longDesc: "End-to-end IoT solutions." },
  { slug: "hardware-projects",       name: "Hardware Projects",       category: ServiceCategory.HARDWARE,       shortDesc: "PCB design, embedded systems, and prototyping.", startingAt: 599, turnaround: "14–21 days", longDesc: "Custom hardware engineering." },
  { slug: "ml-modeling",             name: "ML Modeling",             category: ServiceCategory.SOFTWARE,       shortDesc: "Custom machine learning models and pipelines.", startingAt: 999, turnaround: "14–30 days", longDesc: "AI and machine learning integration." },
  { slug: "website-development",     name: "Website Development",     category: ServiceCategory.SOFTWARE,       shortDesc: "Fast, modern websites and web applications.", startingAt: 499, turnaround: "7–21 days", longDesc: "High performance web development." },
  { slug: "app-development",         name: "App Development",         category: ServiceCategory.SOFTWARE,       shortDesc: "iOS and Android apps built to production standard.", startingAt: 1499, turnaround: "21–45 days", longDesc: "Native and cross-platform mobile apps." },
  { slug: "market-analysis",         name: "Market Analysis",         category: ServiceCategory.STRATEGY,       shortDesc: "Data-driven market research and business modeling.", startingAt: 399, turnaround: "5–10 days", longDesc: "Comprehensive market research and strategy." },
  { slug: "custom-product-design",   name: "Custom Product Design",   category: ServiceCategory.MANUFACTURING,  shortDesc: "End-to-end product design and manufacturing.", startingAt: 999, turnaround: "21–45 days", longDesc: "Take your idea from sketch to mass production." },
  { slug: "creative-ads",            name: "Creative Ads",            category: ServiceCategory.CREATIVE,       shortDesc: "High-impact advertisements and brand content.", startingAt: 299, turnaround: "5–10 days", longDesc: "Creative campaigns that convert." },
  { slug: "video-editing",           name: "Video Editing",           category: ServiceCategory.CREATIVE,       shortDesc: "Professional post-production and motion graphics.", startingAt: 199, turnaround: "3–7 days", longDesc: "High quality video editing services." },
  { slug: "material-supply",         name: "Material Supply",         category: ServiceCategory.LOGISTICS,      shortDesc: "Sourcing and procurement for your project.", startingAt: 99,  turnaround: "Varies", longDesc: "Reliable material sourcing." },
]

async function main() {
  console.log("🌱 Seeding services...")
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: { ...s, isActive: true, sortOrder: services.indexOf(s) },
    })
  }
  console.log(`✅ Seeded ${services.length} services.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
