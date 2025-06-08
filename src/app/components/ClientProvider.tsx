/**
 * ClientProvider.tsx
 *
 * A wrapper component that provides the Redux store context to the entire app.
 * It ensures that all child components have access to the global state via `useSelector`, `useDispatch`, etc.
 *
 * ---
 * ## Props:
 *
 * ### `children: React.ReactNode`
 * - The components (typically your entire app) that will be wrapped with the Redux `Provider`.
 *
 * ---
 * ## Functionality:
 *
 * - Imports the Redux store from the configured `store.ts` file.
 * - Wraps its children with `<Provider>` from `react-redux`.
 * - Enables Redux state management across the application.
 *
 * ---
 * ## Usage:
 *
 * This component is used in `app/layout.tsx` like this:
 *
 * ```tsx
 * <ClientProvider>
 *   <YourAppContent />
 * </ClientProvider>
 * ```
 *
 * ---
 * ## Notes:
 *
 * - Must be used in the client-side (hence `"use client";` at the top).
 * - This setup is required for Redux Toolkit to work in Next.js (App Router) apps.
 * - You only need to include `ClientProvider` once at the root level of your app.
 */

"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
