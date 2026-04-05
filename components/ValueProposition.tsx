export default function ValueProposition() {
  return (
    <section className="bg-jun-black section-padding relative overflow-hidden">
      {/* Subtle gradient blob */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
      />

      <div className="container-max max-w-4xl relative z-10">
        {/* Label */}
        <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 text-center">
          Nuestra filosofía
        </p>

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            No hacemos solo marketing
          </h2>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight gradient-text">
            Construimos una presencia digital con intención
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <p className="text-base sm:text-lg leading-relaxed text-white/60 text-center sm:text-left">
            En JUN unimos estrategia, producción de contenido y ejecución digital para
            ayudar a proyectos y marcas a posicionarse mejor en un mercado competitivo.
            No creemos en soluciones genéricas ni en presencia sin propósito.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-white/60 text-center sm:text-left">
            Cada proyecto merece una presencia digital que comunique con claridad,
            que genere confianza y que esté diseñada para convertir. Eso es lo que hacemos.
          </p>
        </div>

        {/* Manifesto quote */}
        <div className="relative p-6 sm:p-8 border border-jun-border rounded-2xl bg-jun-surface/50">
          <div className="text-5xl text-jun-sand/20 font-black leading-none mb-3 select-none">&ldquo;</div>
          <p className="text-center text-lg sm:text-xl font-bold text-white/90 italic">
            Más que presencia: dirección, percepción y crecimiento digital.
          </p>
        </div>
      </div>
    </section>
  )
}
