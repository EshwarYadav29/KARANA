import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validators"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role: "CLIENT" },
    })

    return Response.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err) {
    console.error("[register]", err)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
