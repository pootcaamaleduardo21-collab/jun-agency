export default function Services() {
  const services = [
    {
      badge: '01',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-[#8b5cf6] to-[#06b6d4]',
      title: 'Estrategia y crecimiento digital',
      description: 'Planificamos y ejecutamos con datos y dirección para maximizar tu presencia.',
      items: ['Planeación estratégica', 'Campañas publicitarias', 'Embudos de conversión', 'Optimización', 'Seguimiento de resultados'],
      link: '/ads',
      linkLabel: 'Ver servicio de Ads →',
    },
    {
      badge: '02',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-[#06b6d4] to-[#a3e635]',
      title: 'Producción visual y contenido',
      description: 'Creamos contenido de alto impacto que comunica el valor real de tu proyecto.',
      items: ['Levantamiento de contenido', 'Creación de contenido', 'Dirección visual', 'Recorridos virtuales 360°', 'Enfoque inmersivo y comercial'],
      link: '/audiovisual',
      linkLabel: 'Ver producción audiovisual →',
    },
    {
      badge: '03',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      color: 'from-[#a3e635] to-[#8b5cf6]',
      title: 'Posicionamiento y comunicación',
      description: 'Construimos identidad y comunicación estratégica para diferenciarte.',
      items: ['Mensajes claros', 'Estructura comercial', 'Presencia digital', 'Piezas para reforzar percepción', 'Identidad visual'],
      link: '/community-manager',
      linkLabel: 'Ver Community Manager →',
    },
  ]

  return (
    <section id="servicios" className="bg-jun-black section-padding">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            Lo que hacemos
          </p>
          <h2 className="heading-2 text-white mb-4">Servicios</h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Enfocados en posicionamiento, comunicación y conversión estratégica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative flex flex-col bg-jun-surface border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Gradient top bar */}
              <div className={`h-0.5 w-full bg-gradient-to-r ${service.color}`} />

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="text-white/70 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="text-4xl font-black text-white/8 leading-none select-none">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-white/45 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mt-auto mb-6">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className={`text-xs font-bold mt-1 flex-shrink-0 gradient-text`}>✦</span>
                      <span className="text-sm text-white/65">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={service.link}
                  className="mt-auto text-sm font-semibold text-jun-sand hover:text-jun-accent transition-colors duration-200 flex items-center gap-1"
                >
                  {service.linkLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contacto" className="cta-secondary">
            Conoce qué necesita tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
