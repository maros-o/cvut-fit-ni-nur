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
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center h-dvh bg-black`}
      >
        <SettingsProvider>
          <main className="flex flex-col max-w-md w-full h-full  font-[family-name:var(--font-geist-sans)] bg-background">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}
