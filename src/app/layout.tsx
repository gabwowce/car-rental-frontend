// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/app/components/Layout";
import ClientProvider from "../app/components/ClientProvider"; // <- ką tik sukurtas
import 'leaflet/dist/leaflet.css'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider>
          <Layout>{children}</Layout>
        </ClientProvider>
      </body>
    </html>
  );
}
