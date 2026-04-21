export default function TrustStrip() {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Estrategia antes de producir',
      description: 'Definimos el objetivo de cada pieza antes de crearla. No publicamos por publicar.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Levantamiento y producción propios',
      description: 'Salimos a capturar. Foto, video y 360° para que no dependas de material genérico.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: 'Campañas con dato, no intuición',
      description: 'Meta, Google y TikTok con segmentación precisa, optimización continua y resultado medible.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Reporte mensual sin excusas',
      description: 'Cada mes sabes qué se hizo, qué generó resultado y qué ajustamos. Con datos, sin rodeos.',
    },
  ]

  return (
    <section className="bg-jun-dark py-16 sm:py-20 border-y border-jun-border">
      <div className="container-max">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            Así lo hacemos diferente
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Presencia digital que{' '}
            <span className="gradient-text">trabaja para tu proyecto</span>
            , no solo para verse bien
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="group p-5 sm:p-6 bg-jun-surface border border-jun-border rounded-2xl hover:border-jun-sand/40 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gradient icon bg */}
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.15))' }}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-white mb-1.5 text-sm sm:text-base leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/45 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
