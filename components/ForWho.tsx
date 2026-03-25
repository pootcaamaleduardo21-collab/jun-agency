export default function ForWho() {
  const categories = [
    'Desarrollos inmobiliarios y proyectos de inversión',
    'Brokers, equipos comerciales y firmas del sector',
    'Arquitectos, despachos e interiorismo',
    'Hoteles, hospedaje y conceptos turísticos',
    'Restaurantes, beach clubs y marcas orientadas a experiencia',
  ]

  return (
    <section className="bg-jun-warm section-padding">
      <div className="container-max max-w-3xl">
        <h2 className="heading-2 text-center text-jun-black mb-12">
          Para quién es JUN
        </h2>

        <p className="text-lg text-jun-black/80 text-center mb-12">
          Trabajamos con proyectos, espacios y marcas que necesitan una presencia digital más estratégica
        </p>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-sm border border-jun-accent/10 hover:border-jun-sand transition-all duration-300 hover:shadow-sm"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.08}s forwards`,
                opacity: 0,
              }}
            >
              <p className="text-jun-black font-semibold">{category}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white border-2 border-jun-sand rounded-sm">
          <p className="text-center text-jun-black">
            Si tu proyecto necesita comunicar mejor, diferenciarse o convertir con más claridad, tenemos algo que contarte.
          </p>
        </div>
      </div>
    </section>
  )
}
