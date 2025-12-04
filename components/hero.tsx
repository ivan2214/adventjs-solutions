export function Hero() {
  const solvedCount = 5; // Update this as you solve more
  const totalChallenges = 25;

  return (
    <section className="py-12 md:py-20 text-center relative overflow-hidden">
      {/* Decorative snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wider text-balance">
          RETOS DE
          <br />
          <span className="text-accent">CÓDIGO</span>
          <br />
          NAVIDEÑOS
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {solvedCount} de {totalChallenges} retos completados
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg">
            <span className="text-2xl">🎯</span>
            <span className="text-lg">JavaScript</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg">
            <span className="text-2xl">📘</span>
            <span className="text-lg">TypeScript</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="bg-secondary rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-success h-full transition-all duration-500"
              style={{ width: `${(solvedCount / totalChallenges) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round((solvedCount / totalChallenges) * 100)}% completado
          </p>
        </div>
      </div>
    </section>
  );
}
