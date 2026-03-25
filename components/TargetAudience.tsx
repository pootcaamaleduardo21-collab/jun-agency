'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const AUDIENCES = [
  {
    title: 'Desarrollos inmobiliarios y proyectos de inversión',
    desc: 'Fraccionamientos, condominios y proyectos de inversión que necesitan posicionarse mejor en la Riviera Maya.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M9 21V7l6-4v18M9 12h6M14 21v-4h-4v4"/>
      </svg>
    ),
  },
  {
    title: 'Brokers, equipos comerciales y firmas del sector',
    desc: 'Equipos de venta que necesitan posicionar su marca, atraer clientes calificados y mejorar su reputación digital.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Arquitectos, despachos e interiorismo',
    desc: 'Profesionales del diseño que buscan mostrar su trabajo con claridad, atraer clientes y diferenciarse en la Riviera Maya.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Hoteles, hospedaje y conceptos turísticos',
    desc: 'Establecimientos que necesitan ocupación, reputación digital y presencia que capture la experiencia que ofrecen.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20h20M4 20V8l8-5 8 5v12"/>
        <rect x="9" y="14" width="6" height="6"/>
        <path d="M9 10h.01M15 10h.01"/>
      </svg>
    ),
  },
  {
    title: 'Restaurantes, beach clubs y marcas de experiencia',
    desc: 'Negocios que viven de la experiencia y la comunidad. En la Riviera Maya, la percepción define la preferencia.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
];

export default function TargetAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="para-quien"
      className="bg-[#0e0e0e] py-24 px-6 md:px-12"
      aria-labelledby="audience-heading"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 reveal">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Para quién es JUN
          </p>
          <h2 id="audience-heading" className="text-4xl md:text-5xl max-w-2xl" style={{ fontWeight: 700 }}>
            Proyectos, espacios y marcas que necesitan una presencia digital más estratégica.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          {AUDIENCES.map((a, i) => (
            <div
              key={i}
              className={`bg-[#0e0e0e] p-8 md:p-10 group hover:bg-white/4 transition-colors duration-300 cursor-default reveal reveal-delay-${Math.min(i + 1, 5)} ${
                i === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className="mb-5 inline-block transition-transform group-hover:scale-110 duration-300"
                style={{ color: 'var(--sand)' }}
              >
                {a.icon}
              </div>
              <h3
                className="text-xl mb-3 group-hover:text-[var(--sand)] transition-colors leading-snug"
                style={{ fontWeight: 700 }}
              >
                {a.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
