'use client';
import { useState, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const FAQS = [
  {
    q: '¿Trabajan solo con proyectos de la Riviera Maya?',
    a: 'No exclusivamente. Aunque somos especialistas en el mercado de la Riviera Maya, trabajamos con proyectos de otros destinos que tengan características similares: mercado competitivo, audiencia sofisticada y necesidad de diferenciarse.',
  },
  {
    q: '¿Qué tipo de servicios puede incluir JUN?',
    a: 'Estrategia digital, campañas publicitarias, creación y producción de contenido, posicionamiento de marca, recorridos virtuales 360° y optimización continua. Los servicios se adaptan a lo que tu proyecto necesita en este momento.',
  },
  {
    q: '¿Pueden trabajar con proyectos desde cero o en etapa de lanzamiento?',
    a: 'Sí. Muchos de nuestros clientes nos contactan cuando están desarrollando su proyecto. Nos encanta ayudar a posicionar desde el inicio: es cuando más impacto tiene una estrategia bien construida.',
  },
  {
    q: '¿Ofrecen solo contenido o también estrategia?',
    a: 'Siempre estrategia primero. Creemos que el contenido sin dirección estratégica es ruido. Cada proyecto arranca con un diagnóstico, y el contenido se alinea a esa dirección para generar resultados reales.',
  },
  {
    q: '¿Cómo sé si mi proyecto encaja con JUN?',
    a: 'Si tu proyecto tiene calidad, visión de crecimiento y necesitas mejorar tu presencia digital, probablemente sí encajas. Lo mejor es que solicites un diagnóstico estratégico sin compromiso: ahí lo vemos juntos.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0e0e0e] py-24 px-6 md:px-12"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left */}
          <div className="reveal">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              Preguntas frecuentes
            </p>
            <h2 id="faq-heading" className="text-4xl mb-6" style={{ fontWeight: 700, lineHeight: 1.1 }}>
              Lo que suelen preguntar
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Si tienes una pregunta diferente, escríbenos directamente.
            </p>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN%2C%20tengo%20una%20pregunta%20sobre%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:gap-4 transition-all duration-300"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              Escribir por WhatsApp
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 space-y-0 reveal reveal-delay-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border-b"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full py-7 flex items-start justify-between gap-6 text-left group"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span
                    className="text-base group-hover:text-[var(--sand)] transition-colors leading-snug"
                    style={{ fontWeight: 700 }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 text-lg transition-transform duration-300"
                    style={{
                      color: 'var(--sand)',
                      transform: open === i ? 'rotate(45deg)' : 'none',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {open === i && (
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className="pb-7 pr-10"
                  >
                    <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
