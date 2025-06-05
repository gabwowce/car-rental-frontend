// components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/authSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useAppSelector((state) => state.auth.token);
  if (!token) return null; // neprisijungęs – mygtuko nerodome

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#155DFC] hover:bg-[#0E44C3] text-white px-4 py-2 rounded mx-auto mt-8 block mb-10"
    >
      Atsijungti
    </button>
  );
}
