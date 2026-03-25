export default function Services() {
  const services = [
    {
      title: 'Estrategia y crecimiento digital',
      items: [
        'Planeación estratégica',
        'Campañas publicitarias',
        'Embudos de conversión',
        'Optimización',
        'Seguimiento de resultados',
      ],
    },
    {
      title: 'Producción visual y contenido',
      items: [
        'Levantamiento de contenido',
        'Creación de contenido',
        'Dirección visual',
        'Recorridos virtuales 360°',
        'Enfoque inmersivo y comercial',
      ],
    },
    {
      title: 'Posicionamiento y comunicación',
      items: [
        'Mensajes claros',
        'Estructura comercial',
        'Presencia digital',
        'Piezas para reforzar percepción',
        'Identidad visual',
      ],
    },
  ]

  return (
    <section className="bg-jun-light section-padding">
      <div className="container-max">
        <h2 className="heading-2 text-center text-jun-black mb-4">Servicios</h2>
        <p className="text-center text-jun-accent text-lg mb-16 max-w-2xl mx-auto">
          Enfocados en posicionamiento, comunicación y conversión estratégica
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-sm border border-jun-accent/10 hover:border-jun-sand transition-all duration-300 hover:shadow-lg"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <h3 className="heading-3 text-jun-black mb-6">{service.title}</h3>
              <ul className="space-y-3">
                {service.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-jun-sand font-bold">•</span>
                    <span className="text-jun-black/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="cta-secondary">
            Conoce qué necesita tu proyecto
          </button>
        </div>
      </div>
    </section>
  )
}
