import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-border/50 border-b bg-secondary/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-3xl">🎄</span>
            <span className="font-bold text-2xl tracking-wider transition-colors group-hover:text-accent md:text-3xl">
              AdventJS
              <span className="text-accent">Solutions</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 text-lg">
            <span className="hidden text-muted-foreground sm:inline">by</span>
            <Link
              href="https://github.com/ivan2214"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">ivan2214</span>
            </Link>
            <Link
              href="https://twitter.com/ivan2214"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
