export default function TrustStrip() {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: 'Estrategia con dirección clara',
      description: 'Definimos el camino preciso para tu crecimiento digital',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Comunicación con intención',
      description: 'Cada mensaje está diseñado para convertir',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Producción visual alineada',
      description: 'Contenido que refleja el valor de tu proyecto',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Enfoque orientado a percepción',
      description: 'Elevamos cómo el mercado te ve',
    },
  ]

  return (
    <section className="bg-jun-dark py-16 sm:py-20 border-y border-jun-border">
      <div className="container-max">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            Nuestros pilares
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Pensado para proyectos que necesitan{' '}
            <span className="gradient-text">algo más</span>{' '}
            que solo presencia digital
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
