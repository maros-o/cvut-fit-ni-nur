import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <nav className="flex flex-col gap-6 p-2 w-full max-w-xs">
        <Button className="bg-green-600 border h-12" asChild>
          <Link href="/test">Začít test</Link>
        </Button>

        <Button variant="secondary" className="border h-12" asChild>
          <Link href="/settings">Nastavení</Link>
        </Button>
      </nav>
    </div>
  );
}
