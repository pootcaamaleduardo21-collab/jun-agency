export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Entendemos tu mercado, competencia, objetivos y dónde estás hoy en presencia digital.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Dirección estratégica',
      description: 'Definimos la estrategia clara, los mensajes, el posicionamiento y el roadmap.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Producción y lanzamiento',
      description: 'Creamos contenido, ejecutamos campañas y montamos tu presencia digital alineada.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Optimización continua',
      description: 'Medimos, analizamos y optimizamos para que cada paso avance el crecimiento.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="como-trabajamos" className="bg-jun-dark section-padding border-b border-jun-border">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            El proceso
          </p>
          <h2 className="heading-2 text-white mb-4">Cómo trabajamos</h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Una forma clara de trabajar, desde el diagnóstico hasta la ejecución
          </p>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white flex-shrink-0 z-10"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 my-1" style={{ background: 'linear-gradient(to bottom, #8b5cf6, transparent)' }} />
                )}
              </div>
              <div
                className="flex-1 bg-jun-surface border border-jun-border rounded-2xl p-5 mb-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-[10px] font-bold tracking-widest text-jun-sand uppercase mb-1 block">
                  PASO {step.number}
                </span>
                <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-jun-surface border border-jun-border rounded-2xl p-6 hover:border-jun-sand/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-5xl font-black text-white/6 mb-4 leading-none select-none">
                {step.number}
              </div>
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-white mb-4"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <svg className="w-5 h-5 text-jun-sand/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-0">
          <a href="#contacto" className="cta-primary">
            Solicita tu diagnóstico estratégico
          </a>
        </div>
      </div>
    </section>
  )
}
