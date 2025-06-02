import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if the route is admin-related
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session and not on login page, redirect to login
    if (!session && req.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // If session exists and on login page, redirect to dashboard
    if (session && req.nextUrl.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
