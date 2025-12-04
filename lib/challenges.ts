import challengesData from "./challenges.json";

export interface Challenge {
  day: number;
  title: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  solved: boolean;
  solution?: string;
  descriptions: string[];
  image?: string;
}

export const challenges: Challenge[] = challengesData as Challenge[];
