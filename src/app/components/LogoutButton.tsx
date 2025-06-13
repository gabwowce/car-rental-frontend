"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setToken } from "@/store/authSlice";

/**
 * LogoutButton component
 *
 * Renders a logout button only if the user is authenticated (token exists).
 * On click, it:
 * - Dispatches `logout()` to clear token from Redux and localStorage
 * - Navigates user to the `/login` page
 *
 * @returns JSX.Element | null
 */
export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get token from Redux store
  const token = useAppSelector((state) => state.auth.token);

  // Don't render the button if not authenticated
  if (!token) return null;

  /**
   * Handles logout logic:
   * - Clears auth state
   * - Redirects to /login
   */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setToken(null)); // Redundant, but ensures token is null in both places
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#0F597B] hover:bg-[#0C374D] text-[#F7F7F7]  px-4 py-2 rounded mx-auto mt-8 block mb-10"
    >
      Atsijungti
    </button>
  );
}
