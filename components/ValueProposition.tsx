'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

export default function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const pillars = [
    {
      label: 'Estrategia',
      title: 'Dirección antes que ejecución',
      desc: 'Cada acción parte de un diagnóstico real. Sin dirección clara, el marketing no construye — solo gasta.',
    },
    {
      label: 'Producción',
      title: 'Contenido que comunica valor',
      desc: 'Producimos con intención visual y comercial. Cada pieza comunica el nivel real de tu proyecto o marca.',
    },
    {
      label: 'Posicionamiento',
      title: 'Percepción que genera preferencia',
      desc: 'Construimos cómo te ven. En mercados competitivos, quién te conoce primero y mejor es quien crece.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0e0e0e] py-32 px-6 md:px-12"
      aria-labelledby="value-prop-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Big statement */}
        <div className="max-w-5xl mb-24 reveal">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-8"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Nuestra filosofía
          </p>
          <h2
            id="value-prop-heading"
            className="text-5xl md:text-6xl xl:text-7xl mb-10"
            style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            No hacemos solo marketing.{' '}
            <span className="text-white/30">
              Construimos una presencia digital con intención.
            </span>
          </h2>
          <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
            JUN une estrategia, producción de contenido y ejecución digital para ayudar a
            proyectos a posicionarse mejor en un mercado exigente. En la Riviera Maya, diferenciarse
            no es opcional.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/7">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`bg-[#0e0e0e] px-10 py-12 group hover:bg-white/4 transition-colors reveal reveal-delay-${i + 1}`}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--sand)', fontWeight: 700 }}
              >
                {p.label}
              </p>
              <h3 className="text-xl mb-4" style={{ fontWeight: 700 }}>{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div className="mt-24 pt-12 border-t border-white/8 reveal">
          <blockquote
            className="text-2xl md:text-3xl text-white/65 max-w-3xl leading-relaxed"
            style={{ fontWeight: 700 }}
          >
            &ldquo;Más que presencia:{' '}
            <span className="text-white">dirección, percepción y crecimiento digital</span>{' '}
            para proyectos que lo merecen.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
