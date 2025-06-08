/**
 * middleware.ts
 *
 * This middleware enforces authentication for all routes in the application,
 * except for public assets and the login page.
 *
 * ---
 * ## Behavior:
 * - Reads the `token` cookie from the incoming request.
 * - If the request is for `/login`, it allows access without checks.
 * - If no token is found and the user is accessing a protected route,
 *   they are redirected to `/login`.
 * - Otherwise, the request is allowed to continue.
 *
 * ---
 * ## Matcher Configuration:
 * ```ts
 * matcher: ["/((?!_next|favicon.ico|api).*)"]
 * ```
 * This pattern:
 * - Applies the middleware to all routes **except**:
 *   - Next.js internal assets (`/_next/...`)
 *   - Static files like `favicon.ico`
 *   - API routes (`/api/...`)
 *
 * ---
 * ## Example:
 * - `/dashboard` → requires token
 * - `/cars` → requires token
 * - `/login` → always allowed
 * - `/_next/static/...` → always allowed
 *
 * ---
 * ## Related:
 * Make sure the token is set via cookie in the login handler:
 * ```ts
 * document.cookie = `token=${token}; path=/;`;
 * ```
 */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/login")) return NextResponse.next();
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // viskas, išskyrus public
};
