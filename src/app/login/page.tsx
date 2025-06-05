// LoginPage.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/carRentalApi";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async () => {
    // gausi { access_token: string, ... }
    const res = await login({
      loginRequest: { el_pastas: email, slaptazodis: password },
    }).unwrap();

    // išsaugom tokeną
    dispatch(setToken(res.access_token));
    localStorage.setItem("token", res.access_token); // kad išliktų po refresh

    router.push("/");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Prisijungimas</h1>
        <input
          type="email"
          placeholder="El. paštas"
          className="border w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          className="border w-full p-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Jungiamasi..." : "Prisijungti"}
        </button>
        {isError && (
          <p className="text-red-500 text-sm mt-2">Nepavyko prisijungti</p>
        )}
      </div>
    </div>
  );
}
