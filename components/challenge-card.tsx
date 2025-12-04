"use client";

import { Check, Clock, Copy, ExternalLink, Lock } from "lucide-react";
import { useState } from "react";
import type { Challenge } from "@/lib/challenges";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (challenge.solution) {
      await navigator.clipboard.writeText(challenge.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const difficultyColors = {
    Fácil: "bg-success/20 text-success",
    Medio: "bg-pending/20 text-pending",
    Difícil: "bg-destructive/20 text-red-400",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => challenge.solved && setIsOpen(true)}
          disabled={!challenge.solved}
          className={`group relative aspect-square rounded-lg border-2 p-3 text-left transition-all duration-300 md:p-4 ${
            challenge.solved
              ? "card-glow cursor-pointer border-border bg-card hover:scale-105 hover:border-accent hover:bg-card-hover"
              : "cursor-not-allowed border-border/30 bg-secondary/50 opacity-60"
          }
        `}
        >
          <picture className="absolute inset-0 bg-center bg-cover">
            <img
              alt="Challenge 1 Background"
              className="absolute inset-0 h-full w-full object-cover"
              src={challenge.image}
            />
          </picture>
          {/* Day number */}
          <span className="absolute top-2 left-3 font-bold text-3xl text-foreground/80 md:text-4xl">
            {challenge.day}
          </span>

          {/* Difficulty badge */}
          <span
            className={`absolute top-2 right-2 rounded px-2 py-0.5 text-xs ${difficultyColors[challenge.difficulty]}`}
          >
            {challenge.difficulty}
          </span>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {challenge.solved ? (
              <Check className="h-8 w-8 text-success" />
            ) : (
              <Lock className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          {/* Status indicator */}
          <div className="absolute right-2 bottom-2">
            {challenge.solved ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <Clock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Title on hover */}
          {challenge.solved && (
            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-linear-to-t from-background/90 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="truncate text-center text-xs md:text-sm">
                {challenge.title}
              </p>
            </div>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-full overflow-hidden overflow-y-auto rounded-xl border-2 border-border bg-card shadow-2xl">
        {/* Header */}
        <DialogHeader className="flex items-start justify-between border-border border-b pb-2">
          <div className="flex flex-col items-start gap-3">
            <h2 className="font-bold text-2xl md:text-3xl">
              {challenge.title}
            </h2>
            <div className="flex items-center gap-3">
              <span className="rounded bg-secondary px-3 py-1 text-sm">
                Día {challenge.day}
              </span>
              <span
                className={`text-sm ${difficultyColors[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div>
          <h3 className="font-bold text-accent text-xl">Descripción</h3>
          {challenge.descriptions.length > 0 && (
            <div className="prose prose-p:text-pretty prose-p:text-muted-foreground text-base">
              {challenge.descriptions.map((description, index) => (
                <p key={index}>{description}</p>
              ))}
            </div>
          )}

          {challenge.solution && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-accent text-xl">Mi Solución</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm transition-colors hover:bg-secondary/80"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "¡Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
              <pre className="max-w-md overflow-x-auto rounded-lg border border-border bg-secondary/50 p-4">
                <code className="font-mono text-foreground text-sm">
                  {challenge.solution}
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="border-border border-t bg-secondary/30 p-4">
          <a
            href={`https://adventjs.dev/es/challenges/2025/${challenge.day}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Ver reto en AdventJS
            <ExternalLink className="h-4 w-4" />
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
