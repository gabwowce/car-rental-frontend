import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the authentication state structure.
 */
interface AuthState {
  /** The JWT token for authenticated API access. Null if not logged in. */
  token: string | null;
}

/**
 * Initial state with no token.
 */
const initialState: AuthState = {
  token: null,
};

/**
 * Authentication slice managing JWT token storage and removal.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets or clears the authentication token.
     *
     * @param state - Current auth state
     * @param action - Token string or null
     *
     * - Saves token to localStorage for persistence
     * - Removes token from localStorage if null
     */
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    /**
     * Logs out the user by clearing the token.
     *
     * - Removes token from Redux state and localStorage
     */
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// Export reducer actions
export const { setToken, logout } = authSlice.actions;

/**
 * Reducer for authentication slice.
 */
export default authSlice.reducer;
