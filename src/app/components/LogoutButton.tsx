"use client";

import { logout as logoutAction, setToken } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((s) => s.auth.token);
  const [loading, setLoading] = useState(false);

  if (!token) return null;

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1) BE logout (išvalys Google sesiją/atšauks tokeną, jei implementuota)
      await fetch(`${API}/api/v1/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {
        /* tyliai ignoruojam tinklo klaidą */
      });

      // 2) FE išvalymas
      dispatch(logoutAction());
      dispatch(setToken(null as unknown as string)); // jei setToken tipas string
      deleteCookie("token");
      deleteCookie("session"); // Starlette SessionMiddleware slapukas
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("accessToken");
      }

      // 3) Redirect į login
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-[#0F597B] hover:bg-[#0C374D] disabled:opacity-60 text-[#F7F7F7] px-4 py-2 rounded mx-auto mt-8 block mb-10"
      aria-busy={loading}
    >
      {loading ? "Atsijungiama..." : "Atsijungti"}
    </button>
  );
}
