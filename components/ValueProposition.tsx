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

        {/* Comparison grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
          {/* Generic agency */}
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">Agencia genérica</p>
            <ul className="space-y-3">
              {[
                'Publica por publicar sin estrategia detrás',
                'Entrega contenido sin medir su impacto',
                'Aplica la misma fórmula a todos los clientes',
                'Reportes que no dicen nada accionable',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                  <span className="text-red-400/60 mt-0.5 shrink-0">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>
          {/* JUN */}
          <div className="p-5 rounded-2xl border border-violet-500/25 bg-violet-500/5">
            <p className="text-jun-sand text-xs font-bold uppercase tracking-widest mb-4">En JUN</p>
            <ul className="space-y-3">
              {[
                'Cada acción responde a un objetivo claro',
                'Contenido con propósito: comunicar, posicionar y convertir',
                'Estrategia diseñada para tu mercado específico',
                'Reporte mensual claro con próximos pasos',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span className="text-jun-lime mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Manifesto quote */}
        <div className="relative p-6 sm:p-8 border border-jun-border rounded-2xl bg-jun-surface/50">
          <div className="text-5xl text-jun-sand/20 font-black leading-none mb-3 select-none">&ldquo;</div>
          <p className="text-center text-lg sm:text-xl font-bold text-white/90 italic">
            No buscamos clientes que quieran solo contenido. Buscamos proyectos que quieran crecer.
          </p>
        </div>
      </div>
    </section>
  )
}
