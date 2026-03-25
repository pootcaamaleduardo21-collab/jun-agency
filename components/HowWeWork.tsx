export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Entendemos tu mercado, competencia, objetivos y dónde estás hoy en presencia digital.',
    },
    {
      number: '02',
      title: 'Dirección estratégica',
      description: 'Definimos la estrategia clara, los mensajes, el posicionamiento y el roadmap de ejecución.',
    },
    {
      number: '03',
      title: 'Producción y lanzamiento',
      description: 'Creamos contenido, ejecutamos campañas y montamos tu presencia digital alineada a la estrategia.',
    },
    {
      number: '04',
      title: 'Optimización continua',
      description: 'Medimos, analizamos y optimizamos para asegurar que cada paso avance el crecimiento.',
    },
  ]

  return (
    <section className="bg-jun-warm section-padding">
      <div className="container-max">
        <h2 className="heading-2 text-center text-jun-black mb-4">Cómo trabajamos</h2>
        <p className="text-center text-jun-accent text-lg mb-16 max-w-2xl mx-auto">
          Una forma clara de trabajar, desde el diagnóstico hasta la ejecución
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-8 bg-white rounded-sm border border-jun-accent/10 hover:border-jun-sand transition-all duration-300"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className="text-4xl font-bold text-jun-sand/40 mb-4">{step.number}</div>
              <h3 className="heading-3 text-jun-black mb-3">{step.title}</h3>
              <p className="text-jun-black/70">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-jun-sand/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="cta-primary">
            Solicita tu diagnóstico estratégico
          </button>
        </div>
      </div>
    </section>
  )
}
