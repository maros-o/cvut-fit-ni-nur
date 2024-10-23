import { TestSessionProvider } from "../_contexts/TestSessionContext";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TestSessionProvider>{children}</TestSessionProvider>;
}
