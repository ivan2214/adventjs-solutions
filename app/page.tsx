import { ChallengesGrid } from "@/components/challenges-grid";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="pixel-pattern flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ChallengesGrid />
      </main>
      <Footer />
    </div>
  );
}
