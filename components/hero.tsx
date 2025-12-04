export function Hero() {
  const solvedCount = 5; // Update this as you solve more
  const totalChallenges = 25;

  return (
    <section className="relative overflow-hidden py-12 text-center md:py-20">
      {/* Decorative snowflakes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i.toString()}
            className="snowflake absolute text-foreground/20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 15}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <h1 className="mb-4 text-balance font-bold text-5xl tracking-wider md:text-7xl lg:text-8xl">
          RETOS DE
          <br />
          <span className="text-accent">CÓDIGO</span>
          <br />
          NAVIDEÑOS
        </h1>

        <p className="mb-8 text-muted-foreground text-xl md:text-2xl">
          {solvedCount} de {totalChallenges} retos completados
        </p>

        <div className="mb-8 flex justify-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2">
            <span className="text-2xl">🎯</span>
            <span className="text-lg">JavaScript</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2">
            <span className="text-2xl">📘</span>
            <span className="text-lg">TypeScript</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-md">
          <div className="h-4 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
              style={{ width: `${(solvedCount / totalChallenges) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-muted-foreground text-sm">
            {Math.round((solvedCount / totalChallenges) * 100)}% completado
          </p>
        </div>
      </div>
    </section>
  );
}
