'use client'

const leftWords = [
  { text: 'Estrategia',  delay: '0s',   dur: '6s'   },
  { text: 'Conversión',  delay: '1.8s', dur: '5.5s' },
  { text: 'Branding',    delay: '3.4s', dur: '6.5s' },
  { text: 'Contenido',   delay: '0.9s', dur: '7s'   },
  { text: 'Posicionamiento', delay: '2.5s', dur: '5.8s' },
  { text: 'Growth',      delay: '4.1s', dur: '6.2s' },
]
const rightWords = [
  { text: 'ROI',         delay: '0.5s', dur: '5.5s' },
  { text: 'Leads',       delay: '2.2s', dur: '6s'   },
  { text: 'Campañas',    delay: '1.1s', dur: '6.8s' },
  { text: 'Ads',         delay: '3.7s', dur: '5.2s' },
  { text: 'Audiencia',   delay: '0s',   dur: '7.2s' },
  { text: 'Resultados',  delay: '2.9s', dur: '5.7s' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jun-black">

      {/* ── Gradient blob background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full animate-blob-delay"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }}
        />
      </div>

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Floating keyword chips — sides only, desktop only ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        {/* Left column */}
        <div className="absolute left-4 xl:left-10 inset-y-0 w-36 flex flex-col justify-around pb-16 pt-32">
          {leftWords.map((w, i) => (
            <div key={i} className="animate-float-up-fade self-start"
              style={{ animationDelay: w.delay, animationDuration: w.dur }}>
              <span className="px-3 py-1.5 rounded-2xl text-xs font-semibold text-white/40 whitespace-nowrap block"
                style={{ background: 'rgba(24,24,31,0.6)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(6px)' }}>
                {w.text}
              </span>
            </div>
          ))}
        </div>
        {/* Right column */}
        <div className="absolute right-4 xl:right-10 inset-y-0 w-36 flex flex-col justify-around pb-16 pt-32 items-end">
          {rightWords.map((w, i) => (
            <div key={i} className="animate-float-up-fade"
              style={{ animationDelay: w.delay, animationDuration: w.dur }}>
              <span className="px-3 py-1.5 rounded-2xl text-xs font-semibold text-white/40 whitespace-nowrap block"
                style={{ background: 'rgba(24,24,31,0.6)', border: '1px solid rgba(6,182,212,0.15)', backdropFilter: 'blur(6px)' }}>
                {w.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full container-max text-center px-4 pt-28 pb-20">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-jun-sand/25 bg-jun-sand/8 text-white/80 text-xs sm:text-sm font-medium animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-jun-lime animate-pulse flex-shrink-0" />
            Agencia de Marketing Digital · Riviera Maya
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Haz que tu proyecto sea{' '}
            <span className="gradient-text">la primera opción</span>
            {' '}en Riviera Maya
          </h1>

          {/* Sub-headline */}
          <p
            className="text-base sm:text-lg lg:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Estrategia digital, contenido y posicionamiento para marcas que necesitan
            diferenciarse, comunicar mejor y convertir con intención.
          </p>

          {/* Feature tags */}
          <div
            className="flex flex-wrap gap-2 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {[
              'Estrategia enfocada',
              'Contenido con claridad',
              'Mercado Riviera Maya',
              'Resultados medibles',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="#contacto"
              className="w-full sm:w-auto cta-primary text-base px-9 py-4"
            >
              Solicita tu diagnóstico estratégico
            </a>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustaría%20recibir%20más%20detalles%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/15 text-white/80 rounded-2xl font-semibold text-base transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5 active:scale-95"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1">
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
