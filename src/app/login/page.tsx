// LoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/carRentalApi";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/authSlice";

/**
 * LoginPage – basic login screen for employee authentication.
 *
 * Features:
 * - Captures user credentials (email + password)
 * - Sends login request via RTK Query `useLoginMutation`
 * - On success:
 *   - Saves token to Redux store and `document.cookie`
 *   - Redirects to the dashboard (`/`)
 * - Displays loading state and error feedback if login fails
 *
 * Used in combination with:
 * - Redux auth slice (`setToken`)
 * - Auth middleware on the frontend to protect routes
 *
 * @returns {JSX.Element} A centered login form with basic styling and logic
 */
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  /** Email input state */
  const [email, setEmail] = useState("");

  /** Password input state */
  const [password, setPassword] = useState("");

  /** RTK Query login mutation */
  const [login, { isLoading, isError }] = useLoginMutation();

  /**
   * Handles the login flow:
   * - Sends credentials to API
   * - Stores token in Redux and cookies
   * - Redirects to homepage
   */
  const handleLogin = async () => {
    const res = await login({
      loginRequest: { el_pastas: email, slaptazodis: password },
    }).unwrap();

    dispatch(setToken(res.access_token));

    // 🔵 Set token as cookie for possible server-side access
    document.cookie = `token=${res.access_token}; path=/;`;

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0E0B1F]">
      <div className="w-full max-w-md p-8 bg-[#0E1525] text-[#707070] rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#F7F7F7]">
          Prisijungimas
        </h1>

        {/* Email field */}
        <input
          type="email"
          placeholder="El. paštas"
          className="border w-full p-2 mb-4 text-[#F7F7F7]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field */}
        <input
          type="password"
          placeholder="Slaptažodis"
          className="border w-full p-2 mb-6 text-[#F7F7F7]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button
          className="bg-[#0F597B] text-[#F7F7F7]  w-full py-2 rounded hover:bg-[#0C374D] transition"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Jungiamasi..." : "Prisijungti"}
        </button>

        {/* Error message */}
        {isError && (
          <p className="text-red-500 text-sm mt-2">Nepavyko prisijungti</p>
        )}
      </div>
    </div>
  );
}
