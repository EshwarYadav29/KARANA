import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Wrench, Code, Layout, Cpu, Activity, Truck, Laptop } from "lucide-react"

export const metadata = {
  title: "Our Services",
  description: "Engineering, software, creative, and manufacturing services.",
}

const iconMap: Record<string, React.ReactNode> = {
  ENGINEERING: <Wrench className="h-5 w-5 text-indigo-400" />,
  SOFTWARE: <Code className="h-5 w-5 text-indigo-400" />,
  CREATIVE: <Layout className="h-5 w-5 text-indigo-400" />,
  MANUFACTURING: <Activity className="h-5 w-5 text-indigo-400" />,
  HARDWARE: <Cpu className="h-5 w-5 text-indigo-400" />,
  STRATEGY: <Laptop className="h-5 w-5 text-indigo-400" />,
  LOGISTICS: <Truck className="h-5 w-5 text-indigo-400" />,
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground">
          From initial concept to final production, we offer end-to-end solutions for your toughest challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`}>
            <Card className="h-full hover:border-indigo-500/50 transition-colors bg-card/50 backdrop-blur-sm group flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-indigo-500/10 rounded-lg">
                    {iconMap[service.category] || <Wrench className="h-5 w-5 text-indigo-400" />}
                  </div>
                  <Badge variant="outline" className="bg-background/50">
                    {service.category.replace("_", " ")}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-indigo-400 transition-colors">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-base text-muted-foreground">
                  {service.shortDesc}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">From ${service.startingAt}</span>
                <span className="text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Request Service <ArrowRight className="h-3 w-3" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
