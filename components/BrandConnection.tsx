export default function BrandConnection() {
  const facts = [
    { label: 'Real Estate', desc: 'Desarrollos & brokers' },
    { label: 'Turismo',     desc: 'Hoteles & experiencias' },
    { label: 'Lifestyle',   desc: 'Restaurantes & marcas' },
  ]

  return (
    <section className="bg-jun-dark section-padding relative overflow-hidden border-y border-jun-border">
      {/* Gradient accent line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }}
      />

      {/* Blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-max max-w-4xl relative z-10">
        {/* Label */}
        <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 text-center">
          Nuestro contexto
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center mb-8 leading-tight">
          Inspirados por una región que exige{' '}
          <span className="gradient-text">marcas mejor construidas</span>
        </h2>

        <div className="space-y-5 max-w-3xl mx-auto mb-12">
          <p className="text-base sm:text-lg text-white/60 leading-relaxed text-center">
            Riviera Maya no es solo un destino geográfico. Es un mercado exigente donde conviven
            proyectos de lujo, inversión real estate, experiencias turísticas y marcas que compiten
            por atención y percepción. Aquí, la diferencia la hace una presencia digital clara,
            estratégica y alineada con el valor real del proyecto.
          </p>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed text-center">
            Trabajamos desde la comprensión profunda de este mercado: sus dinámicas, sus clientes,
            sus competencias y las oportunidades únicas que abre el crecimiento digital bien ejecutado.
          </p>
        </div>

        {/* Sector tags */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {facts.map((f, i) => (
            <div
              key={i}
              className="text-center p-4 sm:p-5 bg-jun-surface border border-jun-border rounded-2xl hover:border-jun-sand/40 transition-colors duration-300"
            >
              <div className="font-bold text-jun-sand text-sm sm:text-base mb-1">{f.label}</div>
              <div className="text-white/40 text-xs sm:text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient accent line — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, transparent)' }}
      />
    </section>
  )
}
