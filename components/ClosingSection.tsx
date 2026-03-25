export default function ClosingSection() {
  return (
    <section className="bg-jun-dark text-white section-padding">
      <div className="container-max max-w-3xl">
        <h2 className="heading-2 text-center mb-8">
          Tu proyecto no necesita verse como todos
        </h2>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-jun-sand mb-12">
          Necesita una estrategia que lo haga avanzar mejor
        </h2>

        <p className="text-lg text-white/80 leading-relaxed text-center mb-12">
          El mercado está saturado de presencia digital sin dirección. Proyectos que están en línea pero no convierten. Marcas que tienen contenido pero no posicionamiento. Campañas que gastan pero no generan resultado.
        </p>

        <p className="text-lg text-white/80 leading-relaxed text-center mb-12">
          En JUN creemos que tu proyecto merece más. Merece una presencia digital construida con propósito. Merece estrategia, claridad y ejecución. Merece crecer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="cta-primary">
            Solicita tu diagnóstico estratégico
          </button>
          <a
            href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustaría%20recibir%20más%20detalles%20para%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
