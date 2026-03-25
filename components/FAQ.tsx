'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: '¿Trabajan solo con proyectos de la Riviera Maya?',
      answer:
        'No. Aunque nos especializamos en el mercado de la Riviera Maya y entendemos profundamente sus dinámicas, trabajamos con proyectos de otras regiones que necesitan estrategia digital clara y conversión. Lo importante es que tengas una visión clara y estés dispuesto a invertir en crecer digitalmente de forma inteligente.',
    },
    {
      question: '¿Qué tipo de servicios puede incluir JUN?',
      answer:
        'Trabajamos en tres pilares: estrategia y crecimiento digital (planeación, campañas, embudos de conversión, optimización), producción visual y contenido (creación, dirección visual, recorridos 360°), y posicionamiento de marca (mensajes, estructura comercial, presencia digital). Armamos un plan personalizado según las necesidades de tu proyecto.',
    },
    {
      question:
        '¿Pueden trabajar con proyectos desde cero o en etapa de lanzamiento?',
      answer:
        'Sí, absolutamente. De hecho, nos encanta trabajar desde cero porque podemos construir todo con dirección clara desde el inicio. Desde el posicionamiento hasta la estructura comercial, la identidad visual y las campañas de lanzamiento. Proyectos nuevos, en lanzamiento o que necesitan reposicionarse encuentran en JUN el aliado ideal.',
    },
    {
      question: '¿Ofrecen solo contenido o también estrategia?',
      answer:
        'Ofrecemos ambos. Pero primero viene la estrategia. Sin dirección clara, el contenido es solo ruido. Lo que hacemos es diseñar una estrategia completa, después producir contenido alineado a esa estrategia, y finalmente ejecutar con claridad. La estrategia es el fundamento. El contenido es la herramienta.',
    },
    {
      question: '¿Cómo sé si mi proyecto encaja con JUN?',
      answer:
        'Si tu proyecto necesita comunicar mejor, diferenciarse en un mercado competitivo o convertir con más intención, encajas. Si estás dispuesto a trabajar en estrategia real (no solo en hacer cosas), encajas. Si buscas un socio digital que entienda tu mercado y piense a largo plazo, encajas. La mejor forma de saberlo es hablando. Solicita tu diagnóstico estratégico.',
    },
  ]

  return (
    <section className="bg-jun-light section-padding">
      <div className="container-max max-w-2xl">
        <h2 className="heading-2 text-center text-jun-black mb-12">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-jun-accent/10 rounded-sm overflow-hidden hover:border-jun-sand transition-all duration-300"
              style={{
                animation: `fade-in-up 0.6s ease-out ${index * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-jun-warm transition-colors duration-300"
              >
                <h3 className="font-semibold text-jun-black text-left pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-jun-sand flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-jun-warm border-t border-jun-accent/10">
                  <p className="text-jun-black/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
