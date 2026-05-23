"use client"
import Link from "next/link"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Wrench, Code, Layout, Cpu, Activity, Truck, Laptop } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  ENGINEERING: <Wrench className="h-5 w-5 text-indigo-400" />,
  SOFTWARE: <Code className="h-5 w-5 text-indigo-400" />,
  CREATIVE: <Layout className="h-5 w-5 text-indigo-400" />,
  MANUFACTURING: <Activity className="h-5 w-5 text-indigo-400" />,
  HARDWARE: <Cpu className="h-5 w-5 text-indigo-400" />,
  STRATEGY: <Laptop className="h-5 w-5 text-indigo-400" />,
  LOGISTICS: <Truck className="h-5 w-5 text-indigo-400" />,
}

export function ServicesOverview({ services }: { services: any[] }) {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-[600px]">
              Comprehensive solutions from initial concept to final production.
            </p>
          </div>
          <Link href="/services" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/services/${service.slug}`}>
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
                    <CardDescription className="text-base text-muted-foreground line-clamp-2">
                      {service.shortDesc}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/50 flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">From ${service.startingAt}</span>
                    <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
