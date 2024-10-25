import { ReactNode } from "react";

export const Navbar = ({ children }: { children: ReactNode }) => (
  <nav className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
    {children}
  </nav>
);
