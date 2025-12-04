import { Github, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border/50 border-t bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>por</span>
            <Link
              href="https://github.com/ivan2214"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors hover:text-accent"
            >
              ivan2214
            </Link>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>Inspirado en</span>
            <Link
              href="https://adventjs.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              AdventJS
            </Link>
            <span>por</span>
            <Link
              href="https://midu.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              midudev
            </Link>
          </div>

          <Link
            href="https://github.com/ivan2214/adventjs-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 transition-colors hover:bg-card-hover"
          >
            <Github className="h-4 w-4" />
            <span>Ver código fuente</span>
          </Link>
        </div>

        <p className="mt-6 text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} ivan2214. Todos los retos son propiedad
          de AdventJS.
        </p>
      </div>
    </footer>
  );
}
