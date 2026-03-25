export default function TrustStrip() {
  const items = [
    {
      title: 'Estrategia con dirección clara',
      description: 'Definimos el camino preciso para tu crecimiento digital',
    },
    {
      title: 'Comunicación con intención',
      description: 'Cada mensaje está diseñado para convertir',
    },
    {
      title: 'Producción visual alineada',
      description: 'Contenido que refleja el valor de tu proyecto',
    },
    {
      title: 'Enfoque orientado a percepción',
      description: 'Elevamos cómo el mercado te ve',
    },
  ]

  return (
    <section className="bg-jun-warm section-padding">
      <div className="container-max">
        <h2 className="heading-2 text-center text-jun-black mb-16">
          Pensado para proyectos que necesitan algo más que solo presencia digital
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-sm border border-jun-accent/10 hover:border-jun-sand transition-all duration-300 hover:shadow-sm"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <h3 className="font-bold text-jun-black mb-2">{item.title}</h3>
              <p className="text-sm text-jun-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
