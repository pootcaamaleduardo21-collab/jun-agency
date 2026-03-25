'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden py-32 px-6 md:px-12"
      aria-label="Cierre de valor y llamada a la acción"
    >
      {/* Topographic texture echo */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="ctaGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgb(212,175,154)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)"/>
        </svg>
        {/* Ambient halo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212,175,154,0.07) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <p
          className="text-xs tracking-[0.22em] uppercase mb-8"
          style={{ color: 'var(--sand)', fontWeight: 700 }}
        >
          El siguiente paso
        </p>

        <h2
          className="reveal text-5xl md:text-6xl xl:text-7xl mb-8"
          style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          Tu proyecto no necesita verse como todos.
        </h2>

        <p
          className="reveal reveal-delay-1 text-2xl md:text-3xl text-white/35 mb-12"
          style={{ fontWeight: 700 }}
        >
          Necesita una estrategia que lo haga avanzar mejor.
        </p>

        <p className="reveal reveal-delay-2 text-lg text-white/50 max-w-xl mx-auto mb-14 leading-relaxed">
          Si buscas crecimiento digital real, diferenciación clara y resultados medibles en la
          Riviera Maya, empecemos con una conversación.
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#formulario"
            id="closing-cta-diagnostico"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black text-base rounded-lg transition-all duration-300 hover:bg-[var(--sand)]"
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

          <a
            href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles%20para%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            id="closing-cta-whatsapp"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 text-white text-base rounded-lg transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.945 9.945 0 01-4.964-1.32l-.357-.212-3.678.964.981-3.595-.232-.369A9.941 9.941 0 012.06 12.03c0-5.493 4.478-9.971 9.971-9.971s9.971 4.478 9.971 9.971-4.478 9.97-9.973 9.85z"/>
            </svg>
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
