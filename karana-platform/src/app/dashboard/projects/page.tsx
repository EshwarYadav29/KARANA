import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default async function ProjectsPage() {
  const session = await auth()
  
  const projects = await prisma.project.findMany({
    where: { clientId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { service: true },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING_REVIEW": return "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20"
      case "QUOTED": return "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20"
      case "AWAITING_PAYMENT": return "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20"
      case "IN_PROGRESS": return "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20"
      case "DELIVERED": return "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20"
      case "COMPLETED": return "bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20"
      case "CANCELLED":
      case "REJECTED": return "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
      default: return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
        <Link href="/services" className={cn(buttonVariants(), "bg-indigo-600 hover:bg-indigo-700")}>
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <Card className="bg-card/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              You don't have any projects yet.
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-border/50 hover:border-indigo-500/30">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{project.projectNumber}</span>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{project.service.name}</span>
                      <span>•</span>
                      <span>Created {formatDate(project.createdAt)}</span>
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-8 text-sm">
                    {project.quotedAmount && (
                      <div className="hidden md:block text-right">
                        <div className="text-muted-foreground mb-1">Amount</div>
                        <div className="font-medium">{formatCurrency(project.quotedAmount)}</div>
                      </div>
                    )}
                    <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
