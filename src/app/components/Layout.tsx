"use client";

import { useAppSelector } from "@/store/hooks";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);
  return (
    <div className="flex min-h-screen">
      {token && <Sidebar />}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
