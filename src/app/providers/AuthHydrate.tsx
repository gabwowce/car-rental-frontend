"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/authSlice";

/**
 * AuthHydrate – invisible utility component to restore the auth token from `localStorage` on page refresh.
 *
 * Responsibilities:
 * - On mount, reads the `token` from localStorage (if available)
 * - Dispatches the token to Redux via `setToken()` to re-authenticate the session
 *
 * This component renders nothing (returns `null`) and runs only once per mount via `useEffect`.
 *
 * Typically placed at the root layout or inside the ClientProvider tree.
 *
 * @returns {null}
 */
export default function AuthHydrate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 👉 po refresh perskaitom tokeną iš localStorage
    const t = localStorage.getItem("token");
    if (t) dispatch(setToken(t));
  }, []);

  return null; // čia nieko nerodom – tik sukeliam efektą
}
