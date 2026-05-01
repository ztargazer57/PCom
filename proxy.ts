// proxy.ts
import { auth } from "@/lib/auth" // Adjust path if your config is elsewhere
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {

  // 2. Check the path
  const { nextUrl } = request
  const session = request.cookies.get("authjs.session-token")?.value || null
  const isDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isAuthPage = nextUrl.pathname.startsWith("/auth")

  // 3. Redirect logic
  if (isDashboard && !session) {
    // Not logged in -> Redirect to login
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  if (isAuthPage && session) {
    // Logged in -> Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // 4. Allow the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
