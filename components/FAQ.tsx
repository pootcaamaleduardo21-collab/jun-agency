'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Trabajan solo con proyectos de Riviera Maya?',
      answer:
        'Nos especializamos en real estate y turismo en Riviera Maya, pero trabajamos con proyectos de cualquier ubicación que necesite una estrategia digital sólida. Nuestro expertise territorial es una ventaja, pero nuestra metodología es aplicable a cualquier mercado.',
    },
    {
      question: '¿Qué tipo de servicios puede incluir JUN?',
      answer:
        'Ofrecemos tres pilares principales: estrategia y crecimiento digital (planeación, campañas, embudos de conversión), producción visual y contenido (fotografía, video, recorridos 360°), y posicionamiento de marca (mensajes, identidad visual, estructura comercial). Las combinaciones dependen de tus necesidades.',
    },
    {
      question: '¿Pueden trabajar con proyectos desde cero o en etapa de lanzamiento?',
      answer:
        'Sí, trabajamos desde conceptos en fase inicial hasta proyectos ya lanzados que necesitan reposicionarse. De hecho, trabajar desde cero es una oportunidad para construir una presencia digital sólida desde el inicio, sin tener que desaprender prácticas pasadas.',
    },
    {
      question: '¿Ofrecen solo contenido o también estrategia?',
      answer:
        'Siempre comenzamos con estrategia. El contenido sin dirección es solo ruido. Nuestro enfoque es: diagnóstico profundo → plan estratégico claro → ejecución de contenido alineada → optimización continua.',
    },
    {
      question: '¿Cómo sé si mi proyecto encaja con JUN?',
      answer:
        'Si tu proyecto busca diferenciarse en un mercado competitivo, si necesitas mejor comunicación de tu valor, o si ya tienes presencia digital pero sientes que no genera resultados, encajas perfectamente. El mejor primer paso es solicitar un diagnóstico estratégico.',
    },
  ];

  return (
    <section className="section section-dark">
      <div className="container max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Preguntas frecuentes
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mac-window overflow-hidden hover:border-white/40 transition-all duration-300"
            >
              {/* Mac Header */}
              <div className="mac-header">
                <div className="mac-dot mac-dot-red" />
                <div className="mac-dot mac-dot-yellow" />
                <div className="mac-dot mac-dot-green" />
              </div>

              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-start gap-4 hover:bg-white/10 transition-colors duration-300 bg-white/5 group"
              >
                <h3 className="text-base md:text-lg font-bold leading-relaxed max-w-2xl">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 mt-1">
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-white/60"
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
                  </motion.svg>
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 bg-white/5 px-6 md:px-8 py-6 md:py-8"
                  >
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center pt-12 md:pt-16"
        >
          <p className="text-gray-400 mb-6">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href="https://wa.me/9851089671?text=Tengo%20una%20pregunta%20sobre%20los%20servicios%20de%20JUN"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Pregunta directamente por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
