import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isAdmin = nextUrl.pathname.startsWith("/admin")
  const isAuthPage = nextUrl.pathname.startsWith("/auth")

  if (isAdmin && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/auth/login?callbackUrl=" + nextUrl.pathname, nextUrl)
    )
  }
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
