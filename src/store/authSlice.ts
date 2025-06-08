/**
 * authSlice.ts
 *
 * Manages authentication state, specifically the user's access token.
 * This slice is responsible for setting, storing, and clearing the JWT token.
 *
 * ---
 * ## State Structure:
 * ```ts
 * interface AuthState {
 *   token: string | null;
 * }
 * ```
 * - `token`: The JWT token used to authorize API requests. Stored in both
 *   Redux state and `localStorage` for persistence across sessions.
 *
 * ---
 * ## Initial State:
 * ```ts
 * const initialState: AuthState = {
 *   token: null,
 * };
 * ```
 *
 * ---
 * ## Reducers:
 *
 * ### `setToken(token: string | null)`
 * - Updates the Redux state with the new token.
 * - Also synchronizes it with `localStorage`.
 * - If `null` is passed, it removes the token from `localStorage`.
 * - Used during login or token refresh.
 *
 * ### `logout()`
 * - Clears the token from both Redux state and `localStorage`.
 * - Typically used when a user logs out or the token expires.
 *
 * ---
 * ## Example Usage:
 * ```ts
 * dispatch(setToken("your.jwt.token")); // login
 * dispatch(logout()); // logout
 * ```
 *
 * ---
 * ## Integration:
 * - This slice should be added to your root reducer.
 * - Components can access the token with `useSelector((state) => state.auth.token)`
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
