export default function ProblemSection() {
  const problems = [
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
      text: 'Una estrategia clara para que tu inversión en marketing tenga dirección',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      text: 'Contenido pensado para generar confianza, no solo presencia',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
      text: 'Campañas orientadas a atraer prospectos con mejor intención',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
      text: 'Una identidad digital más sólida para diferenciarte en el mercado',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      text: 'Mejor estructura comercial para que el proceso de venta avance con más claridad',
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
      text: 'Una comunicación alineada con el valor real de tu proyecto o marca',
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
            Lo que suele frenar el crecimiento digital de un proyecto
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
