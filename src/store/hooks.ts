// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/** Hookas su tipais dispečui */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Hookas su tipais selector’iams */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
