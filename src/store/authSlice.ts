// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
