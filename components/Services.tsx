'use client';
import { useState, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const SERVICES = [
  {
    id: '01',
    title: 'Estrategia y crecimiento digital',
    summary: 'Dirección clara para que tu inversión genere resultados reales.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 20l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    items: [
      { title: 'Planeación estratégica', desc: 'Definimos objetivos, audiencia y canales con base en tu mercado.' },
      { title: 'Campañas publicitarias', desc: 'Meta Ads, Google Ads y estrategias orientadas a conversión real.' },
      { title: 'Embudos de conversión', desc: 'Flujos diseñados para guiar al prospecto hacia la decisión.' },
      { title: 'Optimización continua', desc: 'Análisis semanal y ajustes basados en datos reales.' },
      { title: 'Seguimiento de resultados', desc: 'Reportes claros con métricas que importan.' },
    ],
  },
  {
    id: '02',
    title: 'Producción visual y contenido',
    summary: 'Contenido que comunica el valor real de tu proyecto.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    items: [
      { title: 'Levantamiento de contenido', desc: 'Sesiones de foto y video planificadas para tu proyecto.' },
      { title: 'Creación de contenido', desc: 'Piezas diseñadas para cada etapa del proceso de compra.' },
      { title: 'Dirección visual', desc: 'Lenguaje visual coherente con la identidad de tu marca.' },
      { title: 'Recorridos virtuales 360°', desc: 'Experiencia inmersiva para proyectos inmobiliarios y turísticos.' },
      { title: 'Enfoque inmersivo y comercial', desc: 'Contenido que vende, no solo que decora redes sociales.' },
    ],
  },
  {
    id: '03',
    title: 'Posicionamiento y comunicación',
    summary: 'Construimos cómo te perciben y cómo te eligen.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    items: [
      { title: 'Mensajes estratégicos', desc: 'Copy y narrativa que comunican con claridad tu propuesta de valor.' },
      { title: 'Estructura comercial', desc: 'Argumentos de venta y materiales para tu equipo comercial.' },
      { title: 'Presencia digital integral', desc: 'Sitio web, redes y perfiles optimizados para generar confianza.' },
      { title: 'Piezas para percepción', desc: 'Materiales que elevan cómo te ve tu audiencia objetivo.' },
      { title: 'Narrativa de marca', desc: 'Historia, tono y posicionamiento diferenciado en el mercado.' },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="bg-[#080808] py-24 px-6 md:px-12"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 reveal">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Lo que hacemos
          </p>
          <h2 id="services-heading" className="text-4xl md:text-5xl max-w-2xl" style={{ fontWeight: 700 }}>
            Servicios orientados a posicionamiento y conversión estratégica
          </h2>
        </div>

        {/* Tab selector */}
        <div
          className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden reveal"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-controls={`service-panel-${i}`}
              id={`service-tab-${i}`}
              className={`flex-1 px-6 py-5 flex items-center gap-4 text-left transition-all duration-300 border-b md:border-b-0 md:border-r ${
                active === i
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className={`flex-shrink-0 ${active === i ? 'text-black' : ''}`} style={active === i ? {} : { color: 'var(--sand)' }}>
                {s.icon}
              </span>
              <div>
                <div
                  className={`text-xs tracking-widest uppercase mb-1 ${active === i ? 'text-black/40' : 'text-white/30'}`}
                  style={{ fontWeight: 700 }}
                >
                  {s.id}
                </div>
                <div className="text-sm leading-snug" style={{ fontWeight: 700 }}>{s.title}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          className="rounded-b-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)', borderTop: 0 }}
        >
          <div
            className="bg-[#0e0e0e] p-8 md:p-12"
            role="tabpanel"
            id={`service-panel-${active}`}
            aria-labelledby={`service-tab-${active}`}
          >
            <p className="text-white/50 mb-10 text-lg">{SERVICES[active].summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {SERVICES[active].items.map((item, i) => (
                <div
                  key={i}
                  className="py-6 pr-8 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--sand)' }}
                      aria-hidden="true"
                    />
                    <h4 className="text-sm" style={{ fontWeight: 700 }}>{item.title}</h4>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed pl-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end reveal">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 text-sm hover:gap-4 transition-all duration-300"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Conoce qué necesita tu proyecto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
