export default function ProblemSection() {
  const problems = [
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      text: 'Publicas contenido pero no sabes si está generando prospectos o solo consumo sin intención',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      text: 'Tu presencia digital no refleja el nivel real de tu proyecto, propiedad o servicio',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
      text: 'Inviertes en publicidad sin claridad de qué plataforma usar ni cómo medir el retorno real',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      text: 'La competencia aparece primero en redes aunque tu propuesta de valor sea más sólida',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>,
      text: 'No tienes contenido visual profesional que respalde lo que vendes o quien eres como marca',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      text: 'Cada mes empiezas desde cero porque no hay una estrategia de contenido con continuidad',
    },
  ]

  return (
    <section className="bg-jun-dark section-padding border-b border-jun-border">
      <div className="container-max">
        <div className="mb-10 sm:mb-14">
          <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            ¿Te identificas?
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-tight">
            Lo que frena a proyectos como el tuyo
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-jun-surface border border-jun-border hover:border-jun-sand/35 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-2xl flex items-center justify-center text-jun-sand"
                style={{ background: 'rgba(139,92,246,0.12)' }}>
                {problem.icon}
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed pt-0.5">
                {problem.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
