import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ChallengesGrid } from "@/components/challenges-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pixel-pattern">
      <Header />
      <main className="flex-1">
        <Hero />
        <ChallengesGrid />
      </main>
      <Footer />
    </div>
  )
}
