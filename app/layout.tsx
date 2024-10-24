import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SettingsProvider } from "./_contexts/SettingsContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CinePaint",
  description: "cinema reservation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="min-h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center bg-[#201c1c]`}
      >
        <SettingsProvider>
          <main className="flex flex-col max-w-md w-full min-h-dvh font-[family-name:var(--font-geist-sans)] bg-background">
            {children}
          </main>
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  );
}
