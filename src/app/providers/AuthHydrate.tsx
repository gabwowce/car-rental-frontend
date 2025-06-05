"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/authSlice";

export default function AuthHydrate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 👉 po refresh perskaitom tokeną iš localStorage
    const t = localStorage.getItem("token");
    if (t) dispatch(setToken(t));
  }, []);

  return null; // čia nieko nerodom – tik sukeliam efektą
}
