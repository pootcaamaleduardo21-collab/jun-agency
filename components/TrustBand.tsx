'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const ITEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 22L10.5 13.5 16 18l5-7.5 5.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Estrategia con dirección clara',
    desc: 'Cada decisión parte de un diagnóstico real, no de suposiciones.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="16" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20.5 16v3m0 3v.01M20.5 19h3m-3 0h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Comunicación con intención',
    desc: 'Mensajes diseñados para conectar con tu audiencia real.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 18l5-7 5.5 4.5 4.5-6 6 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="4" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Producción visual de calidad',
    desc: 'Contenido alineado al valor real de tu proyecto o marca.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Enfoque en percepción y conversión',
    desc: 'Cada pieza tiene un objetivo: mejorar cómo te ven y cómo te eligen.',
  },
];

export default function TrustBand() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0e0e0e] border-y"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-16 reveal">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Por qué JUN
          </p>
          <h2
            id="trust-heading"
            className="text-4xl md:text-5xl max-w-2xl"
            style={{ fontWeight: 700 }}
          >
            Pensado para proyectos que exigen algo más que presencia digital.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`bg-[#0e0e0e] p-8 group hover:bg-white/4 transition-colors duration-300 cursor-default reveal reveal-delay-${i + 1}`}
            >
              <div
                className="mb-6 inline-block transition-transform group-hover:scale-110 duration-300"
                style={{ color: 'var(--sand)' }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg mb-3" style={{ fontWeight: 700 }}>{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
