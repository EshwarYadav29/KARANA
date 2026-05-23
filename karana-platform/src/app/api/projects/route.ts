import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { projectRequestSchema } from "@/lib/validators"
import { generateProjectNumber } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = projectRequestSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        projectNumber: generateProjectNumber(),
        clientId: session.user.id,
        status: "PENDING_REVIEW",
      },
    })

    // TODO: Send admin notification email via Resend (Sprint 2)

    return NextResponse.json({ projectId: project.id }, { status: 201 })
  } catch (error) {
    console.error("[POST /api/projects]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
