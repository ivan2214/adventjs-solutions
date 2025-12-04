"use client";

import { Check, Copy, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import type { Challenge } from "@/lib/challenges";
import { DialogContent } from "./ui/dialog";

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({
  challenge,
  isOpen,
  onClose,
}: ChallengeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (challenge.solution) {
      await navigator.clipboard.writeText(challenge.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const difficultyColors = {
    Fácil: "text-success",
    Medio: "text-pending",
    Difícil: "text-red-400",
  };

  return (
    <DialogContent
      
      
    >

      {/* Modal */}
      <div
        className="relative bg-card border-2 border-border rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{challenge.emoji}</span>
              <span className="text-sm bg-secondary px-3 py-1 rounded">
                Día {challenge.day}
              </span>
              <span
                className={`text-sm ${difficultyColors[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {challenge.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {challenge.description && (
            <p className="text-lg text-muted-foreground mb-6">
              {challenge.description}
            </p>
          )}

          {challenge.solution && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-accent">Mi Solución</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "¡Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
              <pre className="bg-secondary/50 border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">
                  {challenge.solution}
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-secondary/30">
          <a
            href={`https://adventjs.dev/es/challenges/2024/${challenge.day}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-colors"
          >
            Ver reto en AdventJS
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </DialogContent>
  );
}
