"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * AuthGuard – a route-based client-side authentication guard.
 *
 * This component checks for the presence of an auth token
 * and redirects the user accordingly:
 *
 * - If the user is **unauthenticated** and trying to access any
 *   page **except `/login`**, they are redirected to `/login`.
 * - If the user **has a token** but is visiting `/login`, they
 *   are redirected to the home page (`/`).
 *
 * While redirecting, the component renders nothing to prevent
 * flickering.
 *
 * @param children React children to render when authentication passes
 * @returns {JSX.Element | null} Authenticated content or null during redirect
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.token);
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/login";

  useEffect(() => {
    if (!token && !isLogin) router.replace("/login");

    if (token && isLogin) router.replace("/");
  }, [token, pathname]);

  if (!token && !isLogin) return null;

  return <>{children}</>;
}
