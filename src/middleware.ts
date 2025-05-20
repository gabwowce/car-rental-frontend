import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Leisk prieigą prie login puslapio
  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  const protectedPaths = [
    "/cars",
    "/clients",
    "/orders",
    "/reservations",
    "/support",
    "/invoices",
    "/profile",
    "/" // saugomas root kelias
  ];

  const pathIsProtected = protectedPaths.some((path) =>
    path === "/" ? request.nextUrl.pathname === "/" : request.nextUrl.pathname.startsWith(path)
  );

  if (pathIsProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cars/:path*",
    "/clients/:path*",
    "/orders/:path*",
    "/reservations/:path*",
    "/support/:path*",
    "/invoices/:path*",
    "/profile/:path*",
    "/" // jei reikia saugoti root
  ],
};
