// hooks/useAuthToken.ts

import { useState, useEffect } from "react";

/**
 * `useAuthToken` is a custom React hook that retrieves the authentication token
 * from `localStorage` and stores it in local component state.
 *
 * It is typically used to access the JWT token for authenticated requests
 * or conditional rendering based on user login state.
 *
 * ## Example usage:
 * ```tsx
 * const token = useAuthToken();
 * if (!token) return <LoginPage />;
 * ```
 *
 * @returns {string | null} The access token stored in `localStorage`, or `null` if not found.
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  return token;
}
