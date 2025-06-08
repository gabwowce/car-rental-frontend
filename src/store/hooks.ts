// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Typed dispatch hook for Redux.
 *
 * Use this instead of `useDispatch()` to get proper typings for async thunks and actions.
 *
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(fetchOrders());
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook for Redux state access.
 *
 * Use this instead of `useSelector()` to ensure type safety with RootState.
 *
 * @example
 * const token = useAppSelector((state) => state.auth.token);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
