'use client';
import { useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const INFO = [
  { label: 'JUN en maya', value: 'El primero' },
  { label: 'Origen', value: 'La Riviera Maya' },
  { label: 'Especialidad', value: 'Real estate y turismo' },
  { label: 'Enfoque', value: 'Estrategia + Conversión' },
];

export default function BrandConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] py-32 px-6 md:px-12 overflow-hidden"
      aria-labelledby="brand-heading"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.5) 40px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="reveal">
            <p
              className="text-xs tracking-[0.22em] uppercase mb-6"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              JUN — El primero
            </p>
            <h2 id="brand-heading" className="text-4xl md:text-5xl mb-8" style={{ fontWeight: 700 }}>
              Inspirados por una región que exige marcas mejor construidas.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              En la Riviera Maya no compites con negocios locales. Compites con marcas
              internacionales que invierten en percepción, posicionamiento y estrategia.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              JUN nace de entender que en este mercado, tu proyecto merece ser visto, reconocido y
              elegido. Por eso construimos presencia digital con intención: clara, estratégica y
              orientada a que tu marca destaque.
            </p>
          </div>

          {/* Right */}
          <div
            className="rounded-2xl overflow-hidden reveal reveal-delay-2"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {INFO.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-8 py-6 border-b hover:bg-white/4 transition-colors group"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <span
                  className="text-sm uppercase tracking-widest text-white/40"
                  style={{ fontWeight: 600 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-base group-hover:text-[var(--sand)] transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
