import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  
  const project = await prisma.project.findUnique({
    where: { 
      id: params.id,
      clientId: session!.user.id 
    },
    include: { 
      service: true,
      files: true,
      milestones: { orderBy: { sortOrder: "asc" } },
      updates: { orderBy: { createdAt: "desc" }, where: { isPublic: true } }
    },
  })

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-muted-foreground">{project.projectNumber}</span>
            <Badge variant="outline" className="bg-secondary">
              {project.status.replace(/_/g, ' ')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-1">{project.service.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-card/50 border border-border/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-muted-foreground mb-1">Description</h4>
                    <p className="whitespace-pre-wrap">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <h4 className="font-medium text-muted-foreground mb-1">Requested Budget</h4>
                      <p>{project.budget ? `$${project.budget}` : 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground mb-1">Timeline</h4>
                      <p>{project.timeline || 'Flexible'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground mb-1">Created</h4>
                      <p>{formatDate(project.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {project.status === "PENDING_REVIEW" && (
                <Card className="bg-yellow-500/5 border-yellow-500/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-medium text-yellow-500 mb-2">Review in Progress</h3>
                    <p className="text-muted-foreground">
                      Our engineering team is reviewing your requirements. We'll provide a comprehensive quote and timeline shortly.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="updates" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center text-muted-foreground">
                  Activity log will appear here once the project starts.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center text-muted-foreground">
                  File manager will be available shortly.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center text-muted-foreground">
                  Real-time chat connects you directly with your engineers.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-sm text-muted-foreground py-4">
                Milestones will be set once the project is quoted.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-sm text-muted-foreground py-4">
                No payments due at this time.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
