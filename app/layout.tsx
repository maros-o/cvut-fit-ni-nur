import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SettingsProvider } from "./_contexts/SettingsContext";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center h-dvh`}
      >
        <SettingsProvider>
          <main className="max-w-md w-full h-full outline outline-1 outline-gray-200 font-[family-name:var(--font-geist-sans)]">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}
