export default function ClosingSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 bg-jun-black">
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 65%)' }}
        />
      </div>

      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }}
      />

      <div className="relative z-10 container-max max-w-3xl text-center">
        <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6">
          La decisión
        </p>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
          Tu proyecto no necesita verse como todos
        </h2>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-10 gradient-text">
          Necesita una estrategia que lo haga avanzar mejor
        </h2>

        <div className="space-y-4 mb-10 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-white/55 leading-relaxed">
            El mercado está saturado de presencia digital sin dirección. Proyectos que están
            en línea pero no convierten. Marcas que tienen contenido pero no posicionamiento.
            Campañas que gastan pero no generan resultado.
          </p>
          <p className="text-base sm:text-lg text-white/55 leading-relaxed">
            En JUN creemos que tu proyecto merece más: una presencia digital construida con
            propósito, estrategia, claridad y ejecución. Merece crecer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contacto"
            className="w-full sm:w-auto cta-primary text-base px-9 py-4"
          >
            Solicita tu diagnóstico estratégico
          </a>
          <a
            href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustaría%20recibir%20más%20detalles%20para%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/15 text-white/80 rounded-2xl font-semibold text-base transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5 active:scale-95"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
