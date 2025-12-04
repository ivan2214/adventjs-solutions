import { challenges } from "@/lib/challenges";
import { ChallengeCard } from "./challenge-card";

export function ChallengesGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center font-bold text-3xl tracking-wider md:text-4xl">
          {"<"}RETOS{"/>"}
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 md:gap-4 lg:grid-cols-6 xl:grid-cols-7">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.day} challenge={challenge} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-success/20" />
            <span>Fácil</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-pending/20" />
            <span>Medio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-destructive/20" />
            <span>Difícil</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span>Resuelto</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span>Pendiente</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, Lock } from "lucide-react";
