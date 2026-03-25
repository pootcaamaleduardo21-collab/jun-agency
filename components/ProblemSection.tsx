'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const PROBLEMS = [
  { n: '01', text: 'Una estrategia clara para que tu inversión en marketing tenga dirección' },
  { n: '02', text: 'Contenido pensado para generar confianza, no solo presencia' },
  { n: '03', text: 'Campañas orientadas a atraer prospectos con mejor intención' },
  { n: '04', text: 'Una identidad digital más sólida para diferenciarte en el mercado' },
  { n: '05', text: 'Mejor estructura comercial para que el proceso de venta avance con claridad' },
  { n: '06', text: 'Una comunicación alineada con el valor real de tu proyecto o marca' },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[#080808] py-24 px-6 md:px-12"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28 reveal">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              El problema real
            </p>
            <h2 id="problem-heading" className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              Lo que suele frenar el crecimiento digital de un proyecto
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              La mayoría de los proyectos en la Riviera Maya tienen potencial. Lo que falla es cómo
              se comunican y cómo se posicionan.
            </p>
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 text-sm hover:gap-4 transition-all duration-300"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              Ver cómo lo resolvemos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right */}
          <div className="space-y-0 reveal reveal-delay-2">
            {PROBLEMS.map((p) => (
              <div
                key={p.n}
                className="group flex items-start gap-6 py-6 border-b transition-colors duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(212,175,154,0.3)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
                }
              >
                <span
                  className="text-xs mt-1 flex-shrink-0 group-hover:text-[var(--sand)] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}
                >
                  {p.n}
                </span>
                <p className="text-white/70 text-base leading-relaxed group-hover:text-white transition-colors">
                  {p.text}
                </p>
                <svg
                  className="w-4 h-4 mt-1 flex-shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-all"
                  style={{ color: 'var(--sand)' }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
