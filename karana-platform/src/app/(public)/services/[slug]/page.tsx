import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } })
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } })
  if (!service) return {}

  return {
    title: service.seoTitle || service.name,
    description: service.seoDesc || service.shortDesc,
    openGraph: {
      title: service.name,
      description: service.shortDesc,
      type: "website",
    },
    alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/services/${params.slug}` },
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } })
  if (!service) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    provider: { "@type": "Organization", name: "KARANA" },
    description: service.longDesc,
    areaServed: "Worldwide",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6">{service.category.replace("_", " ")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{service.name}</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {service.shortDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href={`/request/${service.slug}`} className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700")}>
              Request This Service
            </Link>
            <div className="flex flex-col justify-center text-sm text-muted-foreground">
              <span>Starting at <strong>${service.startingAt}</strong></span>
              <span>Turnaround: {service.turnaround}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About this service</h2>
            <div className="text-lg whitespace-pre-wrap text-muted-foreground mb-12">
              {service.longDesc}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
