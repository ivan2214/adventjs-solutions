import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, VT323 } from "next/font/google";
import type React from "react";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Mis Soluciones AdventJS 2024 | ivan2214",
  description:
    "Colección de mis soluciones a los 25 retos de programación de AdventJS 2024. Retos navideños resueltos con JavaScript y TypeScript por ivan2214.",
  keywords: [
    "AdventJS",
    "JavaScript",
    "TypeScript",
    "retos de programación",
    "advent of code",
    "ivan2214",
    "soluciones",
    "navidad",
    "código",
  ],
  authors: [{ name: "ivan2214", url: "https://github.com/ivan2214" }],
  creator: "ivan2214",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://adventjs-solutions.vercel.app",
    siteName: "AdventJS Soluciones - ivan2214",
    title: "Mis Soluciones AdventJS 2024 | ivan2214",
    description:
      "Colección de mis soluciones a los 25 retos de programación de AdventJS 2024. Retos navideños resueltos con JavaScript y TypeScript.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "AdventJS Soluciones por ivan2214",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mis Soluciones AdventJS 2024 | ivan2214",
    description:
      "Colección de mis soluciones a los 25 retos de programación de AdventJS 2024.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#6b1c23",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${vt323.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
