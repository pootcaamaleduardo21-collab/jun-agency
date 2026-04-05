'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const WA = 'https://wa.me/529851089671?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20producci%C3%B3n%20audiovisual'

/* ─── Hero animated background ─────────────────────────────────────── */
function ApertureHero() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Ambient glow */}
      <div className="absolute w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)' }} />

      {/* Concentric rotating rings */}
      <div className="absolute w-[580px] h-[580px] rounded-full border border-purple-500/[0.08] animate-spin-slow" />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-cyan-400/[0.10] animate-spin-reverse" />
      <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-400/[0.12] animate-spin-slow" style={{ animationDuration: '38s' }} />
      <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-cyan-300/[0.08] animate-spin-reverse" style={{ animationDuration: '14s' }} />
      <div className="absolute w-[160px] h-[160px] rounded-full border border-purple-300/[0.15] animate-spin-slow" style={{ animationDuration: '10s' }} />

      {/* Crosshair lines */}
      <div className="absolute w-[640px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.07), rgba(6,182,212,0.09), rgba(139,92,246,0.07), transparent)' }} />
      <div className="absolute h-[640px] w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.07), rgba(6,182,212,0.09), rgba(139,92,246,0.07), transparent)' }} />

      {/* Diagonal lines */}
      {[-45, 45].map((deg, i) => (
        <div key={i} className="absolute w-[640px] h-px"
          style={{
            transform: `rotate(${deg}deg)`,
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.04), rgba(6,182,212,0.05), rgba(139,92,246,0.04), transparent)',
          }} />
      ))}

      {/* Aperture dot marks on rings */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/20 animate-spin-slow"
          style={{
            transformOrigin: '290px 0px',
            transform: `rotate(${deg}deg) translateX(290px)`,
            animationDuration: '28s',
          }}
        />
      ))}

      {/* Corner viewfinder brackets */}
      {[
        { top: '18%', left: '12%' },
        { top: '18%', right: '12%' },
        { bottom: '18%', left: '12%' },
        { bottom: '18%', right: '12%' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-5 h-5" style={pos as React.CSSProperties}>
          <div className="absolute top-0 left-0 w-full h-px bg-purple-400/25" />
          <div className="absolute top-0 left-0 w-px h-full bg-purple-400/25" />
        </div>
      ))}
    </div>
  )
}

/* ─── Services data ─────────────────────────────────────────────────── */
const services = [
  {
    badge: '01',
    color: 'from-[#8b5cf6] to-[#06b6d4]',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Fotografía y Video Profesional',
    tagline: 'Contenido pensado para redes, no para portafolios',
    description:
      'Equipo profesional adaptado a los formatos y algoritmos de las redes sociales de hoy. No solo tomamos fotos: construimos un banco de contenido estratégico que trabaja para tu marca semanas después de la sesión.',
    includes: [
      'Fotografía de espacios, proyectos y detalles',
      'Video vertical para Reels, TikToks y Stories',
      'Tomas horizontales para feed y presentaciones',
      'Dirección creativa y guía visual incluida',
      'Edición y postproducción completa',
      'Entrega en formatos optimizados por plataforma',
      'Banco de contenido listo para usar',
    ],
    idealFor: ['Real estate y desarrollos', 'Hoteles y hospedaje', 'Restaurantes y beach clubs', 'Lanzamientos de marca'],
  },
  {
    badge: '02',
    color: 'from-[#06b6d4] to-[#a3e635]',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: 'Vuelo con Drone',
    tagline: 'La perspectiva que cambia la percepción del espacio',
    description:
      'Las tomas aéreas comunican lo que ninguna cámara en tierra puede: la escala real, la ubicación privilegiada, el entorno y el contexto. Para proyectos inmobiliarios, hoteles y desarrollos turísticos, el drone no es un lujo — es una herramienta de venta.',
    includes: [
      'Fotografía y video aéreo en 4K',
      'Recorridos de acceso y entorno inmediato',
      'Tomas de perspectiva y contexto regional',
      'Trayectorias personalizadas según el objetivo',
      'Edición con música, color grading y motion',
      'Versiones cortas para Reels y versiones largas para web',
      'Licencia de vuelo y operación certificada',
    ],
    idealFor: ['Desarrollos inmobiliarios', 'Resorts y zonas hoteleras', 'Eventos al aire libre', 'Parques y destinos turísticos'],
  },
  {
    badge: '03',
    color: 'from-[#a3e635] to-[#8b5cf6]',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Recorridos Virtuales 360°',
    tagline: 'Tu espacio disponible 24/7 desde cualquier lugar del mundo',
    description:
      'Los recorridos virtuales 360° permiten a tus clientes explorar tu espacio de forma inmersiva antes de visitarlo físicamente. Son herramientas de pre-venta poderosas que reducen la fricción, aumentan la confianza y aceleran la toma de decisión.',
    includes: [
      'Captura con equipo fotográfico 360° de alta resolución',
      'Procesamiento y costura de imágenes (stitching)',
      'Plataforma interactiva con navegación intuitiva',
      'Hotspots informativos y llamadas a la acción',
      'Integración directa en tu sitio web',
      'Compatible con dispositivos móviles y VR',
      'Alojamiento y enlace compartible incluidos',
    ],
    idealFor: ['Propiedades en preventa', 'Hoteles y suites', 'Espacios de coworking', 'Inmuebles en renta o venta'],
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Briefing',
    desc: 'Conversamos sobre tu proyecto, los objetivos de comunicación, el tono visual y el uso que le vas a dar al contenido.',
  },
  {
    num: '02',
    title: 'Pre-producción',
    desc: 'Preparamos el plan de rodaje: referencias visuales, listado de tomas, logística de acceso y horario para aprovechar la luz óptima.',
  },
  {
    num: '03',
    title: 'Sesión de producción',
    desc: 'Ejecutamos con equipo profesional. Coordinamos equipo de tierra y drone según el servicio contratado.',
  },
  {
    num: '04',
    title: 'Edición y entrega',
    desc: 'Post-producción con color grading y formatos optimizados. Entregamos en tiempos acordados, listos para publicar.',
  },
]

const faqs = [
  {
    q: '¿Cuánto tiempo tarda una sesión de producción?',
    a: 'Depende del alcance. Una sesión de fotografía y video para un espacio mediano suele durar entre 4 y 8 horas. Un vuelo de drone puede durar entre 1.5 y 3 horas dependiendo del área y las tomas requeridas. Los recorridos 360° de un inmueble o espacio típico tardan 2 a 5 horas de captura.',
  },
  {
    q: '¿Puedo contratar solo uno de los servicios?',
    a: 'Sí, absolutamente. Los tres servicios son completamente independientes. Puedes contratar solo fotografía, solo drone, solo el recorrido 360°, o cualquier combinación. Diseñamos la propuesta según lo que tu proyecto realmente necesita.',
  },
  {
    q: '¿En cuánto tiempo recibo el material editado?',
    a: 'Para fotografía y video, el tiempo de entrega habitual es de 5 a 7 días hábiles después de la sesión. Los recorridos 360° toman entre 7 y 10 días hábiles. Los tiempos exactos se establecen antes del proyecto según el volumen de material.',
  },
  {
    q: '¿El contenido está listo para publicar en redes sociales?',
    a: 'Sí. Entregamos el material en los formatos optimizados para cada plataforma: cuadrado, vertical (9:16), horizontal y tamaños específicos para Instagram, TikTok, Facebook y YouTube. No necesitas hacer ningún ajuste adicional antes de publicar.',
  },
  {
    q: '¿Trabajan fuera de la Riviera Maya?',
    a: 'Principalmente operamos en la Riviera Maya y el sureste de México. Para proyectos en otras regiones, contáctanos y evaluamos la logística juntos. Dependiendo del alcance, puede aplicar un costo adicional de traslado.',
  },
]

export default function AudiovisualPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main className="bg-jun-black min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <ApertureHero />

          <div className="container-max relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5">
                Producción Audiovisual
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Contenido visual que{' '}
                <span className="gradient-text">hace sentir</span>{' '}
                tu proyecto
              </h1>
              <p className="text-white/55 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                Cámaras profesionales, drone y recorridos 360°. Cada servicio es independiente. Nos adaptamos exactamente a lo que tu proyecto necesita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer" className="cta-primary">
                  Solicitar cotización
                </a>
                <a href="/#servicios" className="cta-secondary">
                  Ver todos los servicios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────────── */}
        <section className="bg-jun-dark border-y border-jun-border py-10 sm:py-14">
          <div className="container-max">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-jun-border text-center">
              {[
                { stat: '80%', label: 'de la decisión de compra en real estate ocurre antes de la primera visita física' },
                { stat: '3×', label: 'más conversiones en proyectos con contenido visual profesional vs sin él' },
                { stat: '65%', label: 'del cerebro procesa imágenes antes que texto — el contenido visual es el primer mensaje' },
              ].map((item, i) => (
                <div key={i} className="px-4 sm:px-10">
                  <p className="text-4xl sm:text-5xl font-black gradient-text mb-2">{item.stat}</p>
                  <p className="text-sm text-white/45 leading-relaxed max-w-xs mx-auto">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-jun-lime text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
                Servicios independientes
              </p>
              <h2 className="heading-2 text-white mb-4">Lo que producimos</h2>
              <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                Sin paquetes obligatorios. Contrata lo que necesitas, cuando lo necesitas.
              </p>
            </div>

            <div className="space-y-6">
              {services.map((svc, i) => (
                <div
                  key={i}
                  className="group relative bg-jun-surface border border-jun-border rounded-2xl overflow-hidden hover:border-jun-sand/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`h-0.5 w-full bg-gradient-to-r ${svc.color}`} />

                  <div className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
                      {/* Left col */}
                      <div>
                        <div className="flex items-start gap-5 mb-5">
                          <div className="flex-shrink-0 text-white/60 group-hover:text-white transition-colors duration-300">
                            {svc.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-widest text-jun-accent uppercase block mb-1">
                              {svc.tagline}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                              {svc.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-white/55 leading-relaxed text-sm sm:text-base mb-6">
                          {svc.description}
                        </p>
                        <div>
                          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Ideal para:</p>
                          <div className="flex flex-wrap gap-2">
                            {svc.idealFor.map((tag, j) => (
                              <span key={j} className="px-3 py-1 text-xs font-medium bg-jun-black border border-jun-border rounded-2xl text-white/50">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right col: includes list */}
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Incluye:</p>
                        <ul className="space-y-3">
                          {svc.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="text-xs font-bold mt-1 flex-shrink-0 gradient-text">✦</span>
                              <span className="text-sm text-white/65 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-7">
                          <a href={WA} target="_blank" rel="noopener noreferrer"
                            className="text-sm font-semibold text-jun-sand hover:text-white transition-colors duration-200">
                            Cotizar este servicio →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
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
                Proceso
              </p>
              <h2 className="heading-2 text-white mb-4">¿Cómo es una producción?</h2>
              <p className="text-white/50 text-base max-w-xl mx-auto">
                Sin sorpresas. Desde el primer contacto hasta la entrega del material.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-jun-surface border border-jun-border rounded-2xl animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Connector line on desktop */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-2.5 w-5 h-px bg-jun-border z-10" />
                  )}
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-4 font-black text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="section-padding border-t border-jun-border">
          <div className="container-max max-w-2xl">
            <div className="text-center mb-12">
              <p className="text-jun-accent text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
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
                style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }} />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <p className="text-jun-sand text-xs font-bold tracking-widest uppercase mb-4">¿Listo para empezar?</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Cuéntanos de tu proyecto
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                  Platícanos qué necesitas. Te respondemos con una propuesta clara, sin paquetes forzados y sin compromisos.
                </p>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="cta-primary">
                  Solicitar cotización por WhatsApp
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
