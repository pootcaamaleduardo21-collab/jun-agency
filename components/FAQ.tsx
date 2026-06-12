'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: '¿Cuánto cuesta trabajar con JUN?',
      answer:
        'Tenemos tres planes mensuales: Plan Esencial desde $4,800/mes (posts y reels, ideal si ya tienes material propio), Plan Gestión desde $7,500/mes (Community Manager + producción mensual), y Plan Premium desde $11,000/mes (gestión completa con estrategia y métricas). Los servicios de producción como drone, 360° y fotografía profesional se cotizan por proyecto. Puedes ver todos los detalles y solicitar tu propuesta personalizada en el cotizador.',
    },
    {
      question: '¿Cuándo empiezo a ver resultados?',
      answer:
        'Para campañas de publicidad pagada (Meta, Google, TikTok), los primeros datos llegan en las primeras 2 a 4 semanas. Para contenido orgánico y Community Manager, el crecimiento real de posicionamiento y comunidad se empieza a notar entre el mes 2 y el mes 3. Ser honesto es parte de cómo trabajamos: el marketing digital no es magia inmediata, pero con estrategia y constancia los resultados son sólidos y medibles.',
    },
    {
      question: '¿Qué necesitan de mi parte para arrancar?',
      answer:
        'Una llamada de onboarding de 30–60 minutos para entender tu marca, tu cliente ideal y tus objetivos. Acceso a tus redes sociales (si aplica), tu logo, paleta de colores y cualquier material de marca que tengas. Si no tienes nada de eso todavía, lo construimos juntos. Desde el día 1 trabajamos con lo que hay y vamos avanzando.',
    },
    {
      question: '¿Puedo cancelar si no estoy satisfecho?',
      answer:
        'Sí. El contrato es mensual con aviso previo de 30 días naturales por escrito. No cobramos penalización si el aviso se da con tiempo. Lo que sí aplica es que no hacemos reembolsos del periodo en curso una vez iniciado, porque el trabajo ya está en marcha. Nuestro objetivo es que quieras quedarte, no retenerte con letra chica.',
    },
    {
      question: '¿Trabajan con negocios pequeños o solo con empresas grandes?',
      answer:
        'Trabajamos con ambos. Desde agentes inmobiliarios independientes y restaurantes locales hasta desarrollos inmobiliarios y hoteles boutique. Los planes están diseñados para que cada negocio pague según lo que realmente necesita. Un negocio pequeño con estrategia clara compite perfectamente contra marcas más grandes con presupuesto sin dirección.',
    },
    {
      question: '¿El levantamiento de contenido (fotos, video, drone) lo hacen en cualquier ubicación?',
      answer:
        'El levantamiento lo realizamos dentro de la Riviera Maya — Playa del Carmen, Tulum, Cancún y alrededores — sin costo de traslado adicional. Para ubicaciones fuera de esa zona, cotizamos el traslado por separado. Cada sesión cubre 1 ubicación y hasta 3 horas de captura. Si necesitas varias ubicaciones, lo coordinamos como sesiones independientes.',
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
