export default function ForWho() {
  const categories = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: 'Real Estate',
      title: 'Desarrollos inmobiliarios y proyectos de inversión',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Equipos Comerciales',
      title: 'Brokers, equipos comerciales y firmas del sector',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      label: 'Arquitectura & Diseño',
      title: 'Arquitectos, despachos e interiorismo',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Hospitalidad',
      title: 'Hoteles, hospedaje y conceptos turísticos',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      label: 'Experiencias & Lifestyle',
      title: 'Restaurantes, beach clubs y marcas de experiencia',
    },
  ]

  return (
    <section className="bg-jun-black section-padding">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            ¿Es para ti?
          </p>
          <h2 className="heading-2 text-white mb-4">Para quién es JUN</h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Trabajamos con proyectos, espacios y marcas que necesitan una presencia digital más estratégica
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] p-5 sm:p-6 bg-jun-surface border border-jun-border rounded-2xl hover:border-jun-sand/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="text-white/50 mb-3 group-hover:text-jun-sand transition-colors duration-300">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold tracking-widest text-jun-accent uppercase mb-1 block">
                {cat.label}
              </span>
              <p className="text-sm sm:text-base text-white font-medium leading-snug">
                {cat.title}
              </p>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className="max-w-2xl mx-auto relative p-6 sm:p-8 bg-jun-surface border border-jun-border rounded-2xl text-center overflow-hidden">
          {/* Gradient line top */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }}
          />
          <p className="text-white/80 text-base sm:text-lg font-medium leading-relaxed mb-5">
            Si tu proyecto necesita comunicar mejor, diferenciarse o convertir con más claridad,
            tenemos algo que contarte.
          </p>
          <a href="#contacto" className="cta-primary text-sm sm:text-base">
            Hablemos de tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
