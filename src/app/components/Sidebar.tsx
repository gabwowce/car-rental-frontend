"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import LogoutButton from "./LogoutButton";

/**
 * Navigation menu items for the sidebar.
 * Each item contains a `label` (display text) and `href` (route path).
 */
const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Automobiliai", href: "/cars" },
  { label: "Rezervacijos", href: "/reservations" },
  { label: "Užsakymai", href: "/orders" },
  { label: "Klientai", href: "/clients" },
  { label: "Pagalbos užklausos", href: "/support" },
  { label: "Sąskaitos", href: "/invoices" },
  { label: "Profilis", href: "/profile" },
];

/**
 * Sidebar component for main application layout.
 *
 * Renders navigation links with active route highlighting and a logout button.
 * Also includes a footer with branding and current year.
 *
 * @returns JSX.Element
 */
export default function Sidebar() {
  // Current pathname from Next.js navigation
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen px-4 py-6">
      {/* Logo or brand heading */}
      <h2 className="text-2xl font-bold mb-8 text-center">AutoRent</h2>

      {/* Navigation menu with active route highlighting */}
      <nav className="flex flex-col gap-6 flex-1 justify-between">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "block px-4 py-2 rounded hover:bg-gray-800 transition-colors",
                  pathname === item.href && "bg-gray-800 font-semibold"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout button at the bottom of the nav */}
        <LogoutButton />
      </nav>

      {/* Footer with year and copyright */}
      <footer className="mt-auto text-center text-sm text-gray-400 pt-6 border-t border-gray-700">
        © {new Date().getFullYear()} AutoRent
      </footer>
    </aside>
  );
}
