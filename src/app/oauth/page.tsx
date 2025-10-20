"use client";
import { setToken } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // A) jei backend'as siunčia ?token=...
    let token = sp.get("token") || null;

    // B) jei backend'as siunčia #access_token=...
    if (!token && typeof window !== "undefined") {
      const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
      token = new URLSearchParams(hash).get("access_token");
    }

    if (!token) {
      router.replace("/login?error=no_token");
      return;
    }

    dispatch(setToken(token));
    document.cookie = `token=${token}; path=/; SameSite=Lax`;
    localStorage.setItem("accessToken", token);

    // švarus perėjimas į programą
    router.replace("/");
  }, [dispatch, router, sp]);

  return <p className="p-6">Jungiamasi...</p>;
}
