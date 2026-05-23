import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight, FolderKanban, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default async function DashboardOverview() {
  const session = await auth()
  
  const projects = await prisma.project.findMany({
    where: { clientId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { service: true },
  })

  const stats = {
    total: await prisma.project.count({ where: { clientId: session!.user.id } }),
    active: await prisma.project.count({ 
      where: { 
        clientId: session!.user.id,
        status: { in: ["IN_PROGRESS", "AWAITING_PAYMENT", "REVISION_REQUESTED"] }
      } 
    }),
    completed: await prisma.project.count({ 
      where: { 
        clientId: session!.user.id,
        status: "COMPLETED" 
      } 
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}</h2>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-400">Active</CardTitle>
            <Clock className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Recent Projects</h3>
          <Link href="/dashboard/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-card/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FolderKanban className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h4 className="text-lg font-semibold mb-2">No projects yet</h4>
              <p className="text-muted-foreground mb-6 max-w-sm">
                You don't have any active projects. Start a new request to get an engineered solution.
              </p>
              <Link href="/services" className={cn(buttonVariants(), "bg-indigo-600 hover:bg-indigo-700")}>
                Start a Project
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-muted-foreground font-mono">{project.projectNumber}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground uppercase font-medium tracking-wider">
                      {project.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  <CardDescription>{project.service.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/projects/${project.id}`} className={cn(buttonVariants({ variant: "secondary" }), "w-full")}>
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
