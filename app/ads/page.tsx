import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata = {
  title: 'Publicidad Digital | JUN',
  description: 'Campañas de ads en Meta, Google y TikTok. Estrategia, segmentación y optimización para generar leads y conversiones reales.',
}

/* ─── Targeting hero background ─────────────────────────────────────── */
const leftChips = [
  { text: 'CTR 4.2%',   delay: '0s',   dur: '5.5s' },
  { text: 'CPL ↓ 32%',  delay: '2.7s', dur: '6s'   },
  { text: 'CPC ↓ 0.42', delay: '1.4s', dur: '5.2s' },
]
const rightChips = [
  { text: 'ROAS 3.8×',  delay: '1.4s', dur: '5s'   },
  { text: '12K leads',  delay: '0.8s', dur: '4.8s' },
  { text: 'CTR +1.8%',  delay: '3.0s', dur: '5.7s' },
]

function TargetingHero() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Ambient glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)' }} />

      {/* Targeting rings */}
      <div className="absolute w-[80px] h-[80px] rounded-full border-2 border-cyan-400/40" />
      <div className="absolute w-[160px] h-[160px] rounded-full border border-cyan-400/20 animate-pulse-expand" style={{ animationDelay: '0s' }} />
      <div className="absolute w-[160px] h-[160px] rounded-full border border-cyan-400/20 animate-pulse-expand" style={{ animationDelay: '0.8s' }} />
      <div className="absolute w-[160px] h-[160px] rounded-full border border-cyan-400/20 animate-pulse-expand" style={{ animationDelay: '1.6s' }} />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-purple-400/[0.08] animate-spin-slow" />
      <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-cyan-400/[0.06] animate-spin-reverse" />

      {/* Crosshair lines */}
      <div className="absolute w-[560px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.08), rgba(6,182,212,0.12), rgba(6,182,212,0.08), transparent)' }} />
      <div className="absolute h-[560px] w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.08), rgba(6,182,212,0.12), rgba(6,182,212,0.08), transparent)' }} />

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-cyan-400/50" />

      {/* Floating metric chips — sides only, desktop only */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute left-4 xl:left-10 inset-y-0 w-36 flex flex-col justify-around pt-24 pb-10">
          {leftChips.map((chip, i) => (
            <div key={i} className="animate-float-up-fade self-start"
              style={{ animationDelay: chip.delay, animationDuration: chip.dur }}>
              <div className="px-3 py-1.5 rounded-2xl text-xs font-bold text-white/60 whitespace-nowrap font-mono"
                style={{ background: 'rgba(24,24,31,0.85)', border: '1px solid rgba(6,182,212,0.2)', backdropFilter: 'blur(8px)' }}>
                {chip.text}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-4 xl:right-10 inset-y-0 w-36 flex flex-col justify-around pt-24 pb-10 items-end">
          {rightChips.map((chip, i) => (
            <div key={i} className="animate-float-up-fade"
              style={{ animationDelay: chip.delay, animationDuration: chip.dur }}>
              <div className="px-3 py-1.5 rounded-2xl text-xs font-bold text-white/60 whitespace-nowrap font-mono"
                style={{ background: 'rgba(24,24,31,0.85)', border: '1px solid rgba(6,182,212,0.2)', backdropFilter: 'blur(8px)' }}>
                {chip.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdsPage() {
  const platforms = [
    {
      color: 'from-[#8b5cf6] to-[#06b6d4]',
      badge: '01',
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      name: 'Meta Ads',
      platforms: 'Facebook & Instagram',
      description:
        'Campañas en el ecosistema Meta para generar leads, tráfico, reconocimiento de marca y conversiones. Segmentación avanzada por intereses, comportamiento y audiencias similares.',
      items: [
        'Campañas de conversión y generación de leads',
        'Retargeting y audiencias personalizadas',
        'Anuncios de catálogo y carrusel',
        'Optimización de CPL y ROAS',
        'Reportes de desempeño semanales',
      ],
    },
    {
      color: 'from-[#06b6d4] to-[#a3e635]',
      badge: '02',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      name: 'Google Ads',
      platforms: 'Search, Display & YouTube',
      description:
        'Aparece justo cuando alguien busca lo que ofreces. Campañas en búsqueda, display y YouTube para capturar intención alta y escalar con precisión.',
      items: [
        'Campañas de búsqueda con palabras clave',
        'Red de display y remarketing',
        'Anuncios en YouTube',
        'Google Performance Max',
        'Optimización de calidad y conversiones',
      ],
    },
    {
      color: 'from-[#a3e635] to-[#8b5cf6]',
      badge: '03',
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.498 3.08c-1.38.79-2.34 2.24-2.34 3.9 0 2.48 2.01 4.49 4.49 4.49.66 0 1.29-.14 1.86-.42V16c0 5.24-4.26 9.5-9.5 9.5S4 21.24 4 16V9.5c-1.58 1.14-3.49 1.82-5.58 1.82V7.89c2.09 0 4-1.08 5.12-2.79.96-1.48 1.56-3.28 1.56-5.22v-.07h3.28c0 1.37.1 2.71.27 4.03 1.02 1.67 2.85 2.68 4.95 2.68z" />
        </svg>
      ),
      name: 'TikTok Ads',
      platforms: 'TikTok for Business',
      description:
        'Llega a audiencias jóvenes y altamente activas con contenido nativo de TikTok. Ideal para marcas de lifestyle, hospitalidad y proyectos que buscan notoriedad masiva.',
      items: [
        'In-Feed Ads y TopView',
        'Spark Ads desde contenido orgánico',
        'Campañas de reconocimiento y tráfico',
        'Segmentación por intereses y comportamiento',
        'Creación de creatividades adaptadas al formato',
      ],
    },
  ]

  const process = [
    { step: '01', title: 'Diagnóstico', desc: 'Analizamos tu proyecto, competencia, audiencia y objetivos antes de proponer nada.' },
    { step: '02', title: 'Estrategia', desc: 'Definimos plataformas, presupuesto, segmentación y KPIs. Sin acciones sin dirección.' },
    { step: '03', title: 'Lanzamiento', desc: 'Configuramos, creamos los creativos y activamos las campañas con seguimiento desde el día uno.' },
    { step: '04', title: 'Optimización', desc: 'Revisamos y ajustamos continuamente para mejorar resultados y reducir el costo por lead.' },
  ]

  return (
    <>
      <Header />
      <main className="bg-jun-black min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <TargetingHero />

          <div className="container-max relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
                Publicidad Digital
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Ads que generan{' '}
                <span className="gradient-text">resultados reales</span>
              </h1>
              <p className="text-white/55 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                Meta, Google y TikTok. Campañas diseñadas con estrategia, no con intuición. Tú defines el objetivo, nosotros lo hacemos posible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/529851089671?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20publicidad%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary"
                >
                  Solicitar diagnóstico gratuito
                </a>
                <a href="/community-manager" className="cta-secondary">
                  Ver Community Manager
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max">
            <div className="text-center mb-12">
              <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Plataformas
              </p>
              <h2 className="heading-2 text-white mb-4">Dónde gestionamos tus campañas</h2>
              <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                Cada plataforma tiene su lógica. Sabemos cuál usar según tu objetivo y audiencia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {platforms.map((platform, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col bg-jun-surface border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className={`h-0.5 w-full bg-gradient-to-r ${platform.color}`} />
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div className="text-white/60 group-hover:text-white transition-colors duration-300">
                        {platform.icon}
                      </div>
                      <span className="text-4xl font-black text-white/8 leading-none select-none">
                        {platform.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-jun-accent uppercase mb-1 block">
                      {platform.platforms}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-white/45 mb-6 leading-relaxed">
                      {platform.description}
                    </p>
                    <ul className="space-y-2.5 mt-auto">
                      {platform.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="text-xs font-bold mt-1 flex-shrink-0 gradient-text">✦</span>
                          <span className="text-sm text-white/65">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-jun-dark border-t border-jun-border">
          <div className="container-max">
            <div className="text-center mb-12">
              <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Cómo trabajamos
              </p>
              <h2 className="heading-2 text-white">Del objetivo al resultado</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-jun-surface border border-jun-border rounded-2xl animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-5xl font-black text-white/6 leading-none select-none block mb-3">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max max-w-2xl text-center">
            <div className="relative p-8 sm:p-12 bg-jun-surface border border-jun-border rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }} />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <p className="text-jun-sand text-xs font-bold tracking-widest uppercase mb-4">Empecemos</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Hagamos que tu inversión en publicidad trabaje mejor
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                  Cuéntanos tu objetivo y te preparamos un diagnóstico estratégico sin costo. Sin compromisos, con claridad.
                </p>
                <a
                  href="https://wa.me/529851089671?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20publicidad%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary"
                >
                  Solicitar diagnóstico gratuito
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
