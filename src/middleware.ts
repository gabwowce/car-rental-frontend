import { NextRequest, NextResponse } from "next/server";

/**
 * Global middleware for route-based authentication in a Next.js app.
 *
 * Controls access to protected routes by checking for a valid `token` cookie.
 *
 * @param request - The incoming HTTP request from Next.js
 * @returns NextResponse - A response that either allows access or redirects to login
 */
export function middleware(request: NextRequest) {
  // Attempt to retrieve the `token` cookie from the request
  const token = request.cookies.get("token")?.value;

  // Allow access to the login page without authentication
  if (request.nextUrl.pathname.startsWith("/login")) return NextResponse.next();

  // If no token is present, redirect to the login page
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Otherwise, continue to the requested route
  return NextResponse.next();
}

/**
 * Matcher configuration to apply this middleware selectively.
 *
 * Applies to all routes except:
 * - Next.js internals (`/_next/...`)
 * - Static assets like `favicon.ico`
 * - API routes (`/api/...`)
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
