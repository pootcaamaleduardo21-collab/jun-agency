export default function ProblemSection() {
  const problems = [
    'Una estrategia clara para que tu inversión en marketing tenga dirección',
    'Contenido pensado para generar confianza, no solo presencia',
    'Campañas orientadas a atraer prospectos con mejor intención',
    'Una identidad digital más sólida para diferenciarte en el mercado',
    'Mejor estructura comercial para que el proceso de venta avance con más claridad',
    'Una comunicación alineada con el valor real de tu proyecto o marca',
  ]

  return (
    <section className="bg-jun-light section-padding">
      <div className="container-max">
        <h2 className="heading-2 text-jun-black mb-12">
          Lo que suele frenar el crecimiento digital de un proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-sm bg-white border border-jun-accent/10 hover:border-jun-sand transition-all duration-300"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-jun-sand/20">
                  <svg className="h-5 w-5 text-jun-sand" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-jun-black/80">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
