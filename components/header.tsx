import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-secondary/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🎄</span>
            <span className="text-2xl md:text-3xl font-bold tracking-wider group-hover:text-accent transition-colors">
              AdventJS
              <span className="text-accent">Solutions</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 text-lg">
            <span className="hidden sm:inline text-muted-foreground">by</span>
            <Link
              href="https://github.com/ivan2214"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">ivan2214</span>
            </Link>
            <Link
              href="https://twitter.com/ivan2214"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
