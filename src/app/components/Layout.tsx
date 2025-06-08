/**
 * Layout.tsx
 *
 * App-wide layout wrapper that conditionally displays the sidebar when a user is authenticated.
 * Used to wrap all page content and apply global layout structure.
 *
 * ---
 * ## Props:
 *
 * ### `children: React.ReactNode`
 * - The content to display inside the main area of the layout.
 *
 * ---
 * ## Functionality:
 * - Retrieves JWT token from Redux state (`auth.token`)
 * - If a token is present, it renders the `<Sidebar />` on the left
 * - All children content is displayed inside a `<main>` container
 *
 * ---
 * ## Usage:
 *
 * This component is usually used in `app/layout.tsx`:
 *
 * ```tsx
 * <Layout>
 *   <Dashboard />
 * </Layout>
 * ```
 *
 * ---
 * ## Tailwind Layout:
 * - Flexbox layout with full screen height
 * - Sidebar on the left (conditionally rendered)
 * - Main content area with gray background and padding
 */

"use client";

import { useAppSelector } from "@/store/hooks";
import Sidebar from "./Sidebar";

/**
 * Main layout wrapper that optionally includes a sidebar.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to display in the main area.
 * @returns {JSX.Element}
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <div className="flex min-h-screen">
      {token && <Sidebar />}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
