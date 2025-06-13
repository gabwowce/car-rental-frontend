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
import Image from "next/image";

const image = require("@/assets/autorentLOGO.png");
const image2 = require("@/assets/var1.png");
const image3 = require("@/assets/var2.png");
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
    <div className="flex min-h-screen bg-[#0E0B1F] overflow-hidden relative">
      {token && <Sidebar />}

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex justify-center items-center z-0 opacity-3">
        <Image
          src={image}
          alt="Watermark"
          width={1200}
          height={1200}
          className=" select-none"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] z-0 opacity-55">
        <Image src={image2} alt="Watermark" width={600} height={600} />
      </div>

      <div className="pointer-events-none absolute top-[-100px] left-[-100px] z-0 opacity-35">
        <Image src={image2} alt="Watermark" width={600} height={600} />
      </div>
      <main className="flex-1 bg-[#0E0B1F] p-6">{children}</main>
    </div>
  );
}
