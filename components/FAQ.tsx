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
      question: '¿Pueden trabajar con proyectos desde cero o en etapa de lanzamiento?',
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
    <section id="faq" className="bg-jun-dark section-padding border-t border-jun-border">
      <div className="container-max max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="heading-2 text-white">Preguntas frecuentes</h2>
        </div>

        <div className="space-y-3" id="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/40 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between bg-jun-surface hover:bg-jun-black/40 transition-colors duration-300"
              >
                <h3 className="font-semibold text-white/90 text-left pr-4 text-sm sm:text-base">
                  {faq.question}
                </h3>
                <svg
                  className={`w-4 h-4 text-jun-sand flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-5 py-4 bg-jun-black/30 border-t border-jun-border">
                  <p className="text-white/60 leading-relaxed text-sm sm:text-base">
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
