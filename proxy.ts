// proxy.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { nextUrl } = request

  const sessionToken =
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    null

  const isProtectedPage =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/commission") ||
    nextUrl.pathname.startsWith("/site-content") ||
    nextUrl.pathname.startsWith("/profile")

  const isAuthPage = nextUrl.pathname.startsWith("/auth")

  // Redirect Logic
  if (isProtectedPage && !sessionToken) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}
