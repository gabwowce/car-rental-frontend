"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";

type ClientProviderProps = {
  children: React.ReactNode;
};

/**
 * `ClientProvider` – A wrapper component that makes the Redux store available throughout the app.
 *
 * @param children - The nested components that will have access to the Redux store
 *
 * @example
 * ```tsx
 * <ClientProvider>
 *   <App />
 * </ClientProvider>
 * ```
 *
 * @remarks
 * - This should be used at the root of the app (e.g., in `app/layout.tsx`)
 * - It wraps the app with Redux `<Provider>` and injects the configured `store`
 * - Must be used in client components (hence `"use client"`)
 */
export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
