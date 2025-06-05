"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.token);
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/login";

  useEffect(() => {
    // nėra tokeno ir ne login – mėtame į /login
    if (!token && !isLogin) router.replace("/login");
    // yra tokenas, bet vartotojas vis dar /login – mėtame į /
    if (token && isLogin) router.replace("/");
  }, [token, pathname]);

  // kol vyksta redirect – nieko nerodom
  if (!token && !isLogin) return null;
  return <>{children}</>;
}
