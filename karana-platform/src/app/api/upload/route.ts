import { auth } from "@/lib/auth"
import { getUploadUrl } from "@/lib/r2"
import { NextResponse } from "next/server"
import { z } from "zod"

const uploadSchema = z.object({
  filename: z.string(),
  mimeType: z.string(),
  projectId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = uploadSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { filename, mimeType, projectId } = parsed.data
    
    // Validate project access here (omitted for brevity, sprint 4 detail)

    const key = `projects/${projectId}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    const uploadUrl = await getUploadUrl(key, mimeType)

    return NextResponse.json({ uploadUrl, key }, { status: 200 })
  } catch (error) {
    console.error("[POST /api/upload]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
