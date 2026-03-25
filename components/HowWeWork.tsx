'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Analizamos tu proyecto, mercado actual y oportunidades reales de crecimiento en la Riviera Maya.',
    detail: '2-3 días',
  },
  {
    n: '02',
    title: 'Dirección estratégica',
    desc: 'Diseñamos una estrategia clara: canales, mensajes, audiencia y objetivos medibles.',
    detail: '1 semana',
  },
  {
    n: '03',
    title: 'Producción y lanzamiento',
    desc: 'Ejecutamos, producimos contenido y activamos tu presencia digital con intención.',
    detail: 'Sem. 2-4',
  },
  {
    n: '04',
    title: 'Optimización continua',
    desc: 'Medimos resultados, ajustamos y escalamos lo que funciona para crecer mes a mes.',
    detail: 'Continuo',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="como-trabajamos"
      className="bg-[#0e0e0e] py-24 px-6 md:px-12"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Nuestro proceso
          </p>
          <h2 id="process-heading" className="text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            Una forma clara de trabajar,
            <br />
            desde el diagnóstico hasta la ejecución.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`relative p-8 md:p-10 border-b md:border-b-0 md:border-r hover:bg-white/4 transition-colors duration-300 group reveal reveal-delay-${i + 1}`}
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div
                className="text-5xl mb-6 leading-none select-none"
                style={{ fontWeight: 700, color: 'rgba(255,255,255,0.07)' }}
              >
                {s.n}
              </div>
              <div className="w-8 h-px mb-6" style={{ background: 'var(--sand)' }} aria-hidden="true" />
              <h3
                className="text-xl mb-3 group-hover:text-[var(--sand)] transition-colors"
                style={{ fontWeight: 700 }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">{s.desc}</p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600,
                }}
              >
                {s.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <a
            href="#formulario"
            id="process-cta"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm rounded-lg transition-all duration-300 hover:bg-[var(--sand)]"
            style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
          >
            Solicita tu diagnóstico estratégico
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
