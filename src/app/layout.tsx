import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/app/components/Layout";
import ClientProvider from "@/app/components/ClientProvider";
import "leaflet/dist/leaflet.css";
import AuthHydrate from "./providers/AuthHydrate";
import AuthGuard from "./guards/AuthGuard";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * RootLayout – global layout for the entire application.
 *
 * Responsibilities:
 * - Loads global fonts (Geist Sans & Mono via Google Fonts)
 * - Applies base CSS styles (Tailwind, Leaflet, custom)
 * - Wraps all pages with:
 *   - `<ClientProvider>` – Redux & other context providers
 *   - `<AuthHydrate>` – Restores auth token on hydration
 *   - `<AuthGuard>` – Protects routes from unauthenticated access
 *   - `<Layout>` – Provides app shell (e.g., sidebar)
 *
 * @param children - Nested React page components
 * @returns HTML structure including <html> and <body>
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <AuthHydrate />
          <AuthGuard>
            <Layout>{children}</Layout>
          </AuthGuard>
        </ClientProvider>
      </body>
    </html>
  );
}
