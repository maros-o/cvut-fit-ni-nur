import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <nav className="flex flex-col gap-6 p-2 w-full max-w-xs">
        <Button asChild>
          <Link href="/test/seats">Začít test</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/settings">Nastavení</Link>
        </Button>
      </nav>
    </div>
  );
}
