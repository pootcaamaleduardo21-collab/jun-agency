'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const WA = 'https://wa.me/529851089671?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20community%20manager'

/* ─── Floating social metrics hero background ───────────────────────── */
const leftBadges = [
  { text: '♥ 1.2K likes',        delay: '0s',   dur: '5s'   },
  { text: '↑ Alcance +28%',      delay: '2.6s', dur: '4.8s' },
  { text: '93 guardados',        delay: '1.3s', dur: '5.7s' },
  { text: 'Nueva consulta →',    delay: '3.9s', dur: '5.2s' },
]
const rightBadges = [
  { text: '+847 seguidores',     delay: '1.3s', dur: '5.5s' },
  { text: '347 comentarios',     delay: '0.7s', dur: '6s'   },
  { text: '↗ Perfil visitado',   delay: '2.2s', dur: '4.5s' },
  { text: 'Reel: 24K rep.',      delay: '3.5s', dur: '5s'   },
]

function SocialHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)' }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Floating badges — sides only, desktop only */}
      <div className="hidden lg:block">
        {/* Left column */}
        <div className="absolute left-4 xl:left-10 inset-y-0 w-40 flex flex-col justify-around pt-24 pb-10">
          {leftBadges.map((b, i) => (
            <div key={i} className="animate-float-up-fade self-start"
              style={{ animationDelay: b.delay, animationDuration: b.dur }}>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/60 whitespace-nowrap"
                style={{ background: 'rgba(24,24,31,0.8)', border: '1px solid rgba(139,92,246,0.2)', backdropFilter: 'blur(8px)' }}>
                {b.text}
              </div>
            </div>
          ))}
        </div>
        {/* Right column */}
        <div className="absolute right-4 xl:right-10 inset-y-0 w-40 flex flex-col justify-around pt-24 pb-10 items-end">
          {rightBadges.map((b, i) => (
            <div key={i} className="animate-float-up-fade"
              style={{ animationDelay: b.delay, animationDuration: b.dur }}>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/60 whitespace-nowrap"
                style={{ background: 'rgba(24,24,31,0.8)', border: '1px solid rgba(139,92,246,0.2)', backdropFilter: 'blur(8px)' }}>
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Data ─────────────────────────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Estrategia de contenido mensual',
    description: 'Antes de publicar nada, trazamos un plan. Definimos pilares de contenido, calendario editorial, formatos, frecuencia y objetivos medibles para cada mes.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Creación y diseño de contenido',
    description: 'Diseño gráfico, redacción de copies y adaptación del material audiovisual a cada formato y plataforma. Todo con la voz, el tono y la identidad visual de tu marca.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Publicación y calendarización',
    description: 'Publicamos en los horarios de mayor alcance para tu audiencia, con consistencia diaria o semanal. Nunca más preocuparte por qué publicar hoy.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Gestión y respuesta de comunidad',
    description: 'Respondemos comentarios, mensajes directos e interacciones con la voz correcta de tu marca. La comunidad crece cuando se siente escuchada.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Crecimiento orgánico',
    description: 'Estrategias de interacción, colaboraciones, uso de hashtags y tendencias para ganar alcance real sin depender de pauta publicitaria.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Reporte mensual de resultados',
    description: 'Informe claro con métricas clave: alcance, impresiones, crecimiento de seguidores, interacción y análisis de las publicaciones con mejor desempeño.',
  },
]

const processSteps = [
  { num: '01', title: 'Onboarding de marca', desc: 'Conocemos tu proyecto, tono de voz, competencia, audiencia y objetivos. Definimos la personalidad de tu presencia digital.' },
  { num: '02', title: 'Planificación mensual', desc: 'Construimos el calendario de contenido: temas, formatos, fechas y objetivos por publicación. Lo apruebas antes de publicar nada.' },
  { num: '03', title: 'Producción de contenido', desc: 'Diseñamos, redactamos y adaptamos cada pieza a los formatos y algoritmos de cada red social.' },
  { num: '04', title: 'Publicación y comunidad', desc: 'Publicamos, monitoreamos, respondemos y gestionamos la interacción. Tu presencia activa sin que tú tengas que estar encima.' },
  { num: '05', title: 'Análisis y ajuste', desc: 'Al cierre del mes revisamos qué funcionó, qué no y por qué. Ajustamos la estrategia del siguiente mes con datos reales.' },
]

const platforms = [
  { name: 'Instagram', focus: 'Marca, lifestyle y conversión visual. Feed + Reels + Stories.', best: 'Real estate, hospitalidad, gastronomía, lifestyle' },
  { name: 'Facebook', focus: 'Comunidad, alcance orgánico ampliado y generación de confianza.', best: 'Proyectos de inversión, servicios locales, eventos' },
  { name: 'TikTok', focus: 'Alcance masivo orgánico y brand awareness con tendencias.', best: 'Marcas jóvenes, experiencias, turismo, lifestyle' },
  { name: 'LinkedIn', focus: 'Posicionamiento de autoridad y red profesional.', best: 'B2B, desarrolladores, firmas de arquitectura, consultoras' },
]

const faqs = [
  {
    q: '¿Qué se necesita para empezar?',
    a: 'Para comenzar hacemos un onboarding de marca: conversamos sobre tu proyecto, tu audiencia, tu tono de voz y tus objetivos. También necesitamos acceso a tus redes (o que tú apruebes las publicaciones antes de que salgan), y el material audiovisual para trabajar. Si no tienes material, podemos coordinarlo con nuestro servicio de producción audiovisual.',
  },
  {
    q: '¿Los anuncios pagados están incluidos?',
    a: 'No. El servicio de Community Manager cubre exclusivamente el trabajo orgánico: estrategia de contenido, creación, publicación y gestión de comunidad. La publicidad digital (Meta Ads, Google Ads, TikTok Ads) es un servicio separado con su propia estrategia y presupuesto de pauta. Puedes contratar ambos o solo uno según tus necesidades.',
  },
  {
    q: '¿Puedo ver y aprobar el contenido antes de que se publique?',
    a: 'Sí, siempre. Al inicio de cada mes presentamos el calendario de contenido para tu aprobación. Puedes pedir ajustes, cambios de copy o redireccionamientos antes de que salga cualquier publicación. Tu marca siempre tiene la última palabra.',
  },
  {
    q: '¿Cuánto tiempo toma ver resultados?',
    a: 'El crecimiento orgánico es un proceso de mediano plazo. En el primer mes generalmente ya se nota una mejora en la consistencia y presentación visual. El crecimiento de seguidores y engagement empieza a hacerse evidente entre el segundo y tercer mes de trabajo continuo y estratégico. Los resultados dependen también del nicho, la frecuencia y la calidad del material disponible.',
  },
  {
    q: '¿Trabajan con todas las industrias?',
    a: 'Nuestro equipo tiene especial experiencia en real estate, turismo, hospitalidad, gastronomía y marcas de lifestyle. Si tu proyecto es de otro sector, cuéntanos y evaluamos si podemos darte el servicio con la misma calidad y contexto que necesitas.',
  },
]

export default function CommunityManagerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main className="bg-jun-black min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <SocialHero />

          <div className="container-max relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5">
                Community Manager
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Redes sociales gestionadas con{' '}
                <span className="gradient-text">estrategia real</span>
              </h1>
              <p className="text-white/55 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                No solo publicamos. Construimos presencia, voz de marca y comunidad alrededor de tu proyecto. 100% orgánico, sin pauta incluida.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer" className="cta-primary">
                  Solicitar información
                </a>
                <Link href="/ads" className="cta-secondary">
                  Ver servicio de Ads
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem section ──────────────────────────────────────── */}
        <section className="bg-jun-dark border-t border-jun-border section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
                  El problema real
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  Publicar sin estrategia no construye nada
                </h2>
                <p className="text-white/55 leading-relaxed mb-6">
                  La mayoría de los proyectos tienen presencia en redes, pero pocos tienen una <strong className="text-white/80">presencia que trabaja</strong>. Publicar de vez en cuando, sin dirección y sin voz clara, genera ruido — no resultados.
                </p>
                <p className="text-white/55 leading-relaxed">
                  Un Community Manager profesional no es alguien que sube fotos. Es quien define qué comunicar, cómo comunicarlo y para quién — y después lo ejecuta con consistencia.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { wrong: 'Publicar cuando hay tiempo', right: 'Publicar con calendario y propósito' },
                  { wrong: 'Copiar al competidor', right: 'Construir tu propia voz de marca' },
                  { wrong: 'Medir likes sin contexto', right: 'Analizar métricas que importan al negocio' },
                  { wrong: 'Contenido genérico', right: 'Contenido alineado a tu audiencia ideal' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-jun-surface border border-jun-border rounded-2xl">
                      <p className="text-xs text-white/30 mb-1">Sin estrategia</p>
                      <p className="text-sm text-white/45 line-through">{item.wrong}</p>
                    </div>
                    <div className="p-4 bg-jun-surface border border-jun-sand/20 rounded-2xl">
                      <p className="text-xs text-jun-lime mb-1">Con JUN</p>
                      <p className="text-sm text-white/80">{item.right}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services grid ────────────────────────────────────────── */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Qué incluye
              </p>
              <h2 className="heading-2 text-white mb-4">Gestión completa de redes</h2>
              <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                Adaptamos el alcance a tus necesidades y presupuesto. Sin servicios que no usas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="group p-6 bg-jun-surface border border-jun-border rounded-2xl hover:border-jun-sand/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-jun-sand mb-4"
                    style={{ background: 'rgba(139,92,246,0.12)' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────── */}
        <section className="section-padding bg-jun-dark border-t border-jun-border">
          <div className="container-max">
            <div className="text-center mb-12">
              <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Ciclo mensual
              </p>
              <h2 className="heading-2 text-white mb-4">Cómo gestionamos tu cuenta</h2>
              <p className="text-white/50 text-base max-w-xl mx-auto">
                Un proceso repetible mes a mes que mejora continuamente con datos reales.
              </p>
            </div>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-9 left-[calc(10%-8px)] right-[calc(10%-8px)] h-px bg-jun-border z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
                {processSteps.map((step, i) => (
                  <div
                    key={i}
                    className="p-5 bg-jun-surface border border-jun-border rounded-2xl animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-4 font-black text-sm text-white"
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
                      {step.num}
                    </div>
                    <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Platforms ────────────────────────────────────────────── */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max">
            <div className="text-center mb-12">
              <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Plataformas
              </p>
              <h2 className="heading-2 text-white mb-4">Donde estamos presentes</h2>
              <p className="text-white/50 text-base max-w-xl mx-auto">
                Cada plataforma tiene su propia lógica, formato y audiencia. No todas son para todos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
              {platforms.map((p, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-jun-surface border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }} />
                  <p className="font-bold text-white text-lg mb-2">{p.name}</p>
                  <p className="text-sm text-white/55 leading-relaxed mb-3">{p.focus}</p>
                  <p className="text-xs text-jun-accent/70">Ideal para: {p.best}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CM vs Ads clarification ───────────────────────────────── */}
        <section className="section-padding bg-jun-dark border-t border-jun-border">
          <div className="container-max max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Servicios separados
              </p>
              <h2 className="heading-2 text-white mb-4">Community Manager y Ads no son lo mismo</h2>
              <p className="text-white/50 text-base max-w-xl mx-auto">
                Se complementan, pero son estrategias distintas con objetivos distintos. Puedes tener uno, el otro o ambos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="relative p-6 bg-jun-surface border border-jun-sand/30 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }} />
                <p className="text-jun-sand font-bold text-sm uppercase tracking-widest mb-4">Community Manager</p>
                <ul className="space-y-2.5">
                  {[
                    'Construye presencia orgánica sostenible',
                    'Define y mantiene la voz de la marca',
                    'Gestiona la relación con la comunidad',
                    'Resultados a mediano-largo plazo',
                    'No requiere presupuesto de pauta',
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-xs mt-1 gradient-text font-bold flex-shrink-0">✦</span>
                      <span className="text-sm text-white/65">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-6 bg-jun-surface border border-jun-border rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, #06b6d4, #a3e635)' }} />
                <p className="text-jun-accent font-bold text-sm uppercase tracking-widest mb-4">Publicidad Digital (Ads)</p>
                <ul className="space-y-2.5">
                  {[
                    'Genera alcance masivo inmediato',
                    'Campañas de conversión y leads',
                    'Segmentación precisa de audiencia',
                    'Resultados escalables y medibles',
                    'Requiere inversión en pauta',
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-xs mt-1 text-jun-accent font-bold flex-shrink-0">✦</span>
                      <span className="text-sm text-white/65">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-white/35 text-sm">
              Juntos se potencian. Por separado, cada uno cumple su propio objetivo.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max max-w-2xl">
            <div className="text-center mb-12">
              <p className="text-jun-sand text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                FAQ
              </p>
              <h2 className="heading-2 text-white">Preguntas frecuentes</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/30 transition-colors duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-jun-surface hover:bg-jun-black/40 transition-colors duration-200"
                  >
                    <span className="font-semibold text-white/90 text-left pr-4 text-sm sm:text-base">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-jun-sand flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 py-4 bg-jun-black/30 border-t border-jun-border">
                      <p className="text-white/60 leading-relaxed text-sm sm:text-base">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────── */}
        <section className="section-padding bg-jun-dark border-t border-jun-border">
          <div className="container-max max-w-2xl text-center">
            <div className="relative p-8 sm:p-14 bg-jun-surface border border-jun-border rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #a3e635, #8b5cf6, transparent)' }} />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <p className="text-jun-lime text-xs font-bold tracking-widest uppercase mb-4">Empecemos</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Tu marca merece una presencia que trabaje
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                  Cuéntanos de tu proyecto y te preparamos una propuesta de gestión adaptada a tu mercado, objetivos y presupuesto.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="cta-primary">
                    Solicitar propuesta por WhatsApp
                  </a>
                  <Link href="/ads" className="cta-secondary">
                    Ver servicio de Ads
                  </Link>
                </div>
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
