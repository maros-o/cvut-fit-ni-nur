"use client";

import { useEffect } from "react";
import { TestSessionProvider } from "../_contexts/TestSessionContext";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return <TestSessionProvider>{children}</TestSessionProvider>;
}
