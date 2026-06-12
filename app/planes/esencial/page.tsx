import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan Esencial — JUN | Contenido profesional desde $4,800/mes',
  description: 'Posts, reels y levantamiento mensual en Playa del Carmen. Contenido listo para publicar cada mes.',
}

const features = [
  { label: '4 posts diseñados al mes', detail: 'Gráficas con tu marca y copy incluido', icon: '◈' },
  { label: '4 reels editados al mes', detail: 'Editamos tu material en formato vertical listo para publicar', icon: '▶' },
  { label: '1 sesión de levantamiento/mes', detail: 'Playa del Carmen · 1 ubicación · hasta 3 horas', icon: '◎' },
  { label: 'Revisiones incluidas', detail: 'Ajustamos hasta que quede exacto', icon: '✦' },
  { label: 'Entrega puntual cada mes', detail: 'Calendario de contenido claro desde el día 1', icon: '◷' },
]

const forWho = [
  {
    emoji: '🏪',
    title: 'Tienes un negocio local',
    sub: 'Restaurante, boutique, consultorio, estudio — cualquier negocio que quiere verse profesional en redes sin contratar un equipo propio.',
  },
  {
    emoji: '📱',
    title: 'Quieres publicar de forma constante',
    sub: 'Sin improvisar ni subir fotos del celular. Contenido diseñado, editado y listo cada mes.',
  },
  {
    emoji: '📍',
    title: 'Estás en Playa del Carmen',
    sub: 'El levantamiento mensual está incluido dentro de la ciudad. Nosotros vamos a tu negocio.',
  },
]

const faqs = [
  {
    q: '¿El levantamiento de contenido está incluido?',
    a: 'Sí, 1 sesión al mes dentro de Playa del Carmen — 1 ubicación, hasta 3 horas de captura. Si tu negocio está en Tulum, Cancún u otra zona, o necesitas más de una ubicación, lo cotizamos aparte.',
  },
  {
    q: '¿Para qué redes sociales aplica?',
    a: 'Entregamos los archivos en los formatos de Instagram, Facebook y TikTok. Tú publicas o nosotros te asesoramos cómo hacerlo.',
  },
  {
    q: '¿Hay contrato forzoso?',
    a: 'No. Es mensual. Con 30 días de aviso puedes pausar o cancelar sin penalización.',
  },
  {
    q: '¿Puedo subir de plan después?',
    a: 'Sí, en cualquier momento. Si necesitas Community Manager, más levantamientos o estrategia completa, te pasamos al plan que corresponda.',
  },
]

export default function PlanEsencialPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">

      {/* Nav mínima */}
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="JUN" className="h-8 w-auto" style={{ filter: 'invert(1) brightness(1.1)' }} />
          </Link>
          <span className="text-white/30 text-xs">Agencia · Riviera Maya</span>
        </div>
      </div>

      {/* Hero con gradiente de fondo */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-bold text-violet-300 tracking-wide uppercase">Plan Esencial · $4,800/mes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-5">
            Contenido profesional<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              sin complicaciones
            </span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8">
            Posts, reels y sesión de captura mensual incluida. Nosotros vamos a tu negocio, producimos y entregamos todo listo para publicar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cotizar"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition-opacity"
            >
              Solicitar propuesta →
            </Link>
            <a
              href="https://wa.me/529851089671?text=Hola%2C%20vi%20el%20Plan%20Esencial%20y%20tengo%20una%20pregunta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-2xl border border-white/10 text-white/50 font-semibold text-sm hover:text-white hover:border-white/25 transition-all"
            >
              ¿Necesitas algo diferente?
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Lo que incluye */}
        <div className="mb-12">
          <p className="text-white/25 text-xs uppercase tracking-widest font-semibold text-center mb-6">Lo que incluye</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border border-white/6 bg-white/[0.02] flex items-start gap-4 ${i === 2 ? 'sm:col-span-2 border-violet-500/20 bg-violet-500/5' : ''}`}
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base ${i === 2 ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-white/40'}`}>
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{f.label}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota restricción levantamiento */}
          <div className="mt-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
            <span className="text-white/20 text-lg shrink-0 mt-0.5">📍</span>
            <p className="text-white/35 text-xs leading-relaxed">
              El levantamiento mensual aplica <strong className="text-white/50">dentro de Playa del Carmen</strong> — 1 ubicación, hasta 3 horas. Para Tulum, Cancún u otras zonas se cotiza traslado por separado.
            </p>
          </div>
        </div>

        {/* Precio destacado */}
        <div className="relative rounded-3xl border border-violet-500/20 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 to-cyan-500/4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative p-8 text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">Inversión mensual</p>
            <div className="flex items-end gap-2 justify-center mb-1">
              <span className="text-6xl font-black">$4,800</span>
              <span className="text-white/40 text-xl mb-2">MXN/mes</span>
            </div>
            <p className="text-white/30 text-sm mb-8">Sin contratos forzosos · Cancela con 30 días de aviso</p>
            <Link
              href="/cotizar"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-black text-base hover:opacity-90 transition-opacity"
            >
              Quiero el Plan Esencial →
            </Link>
            <div className="mt-4">
              <a
                href="https://wa.me/529851089671?text=Hola%2C%20vi%20el%20Plan%20Esencial%20y%20necesito%20algo%20diferente"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                ¿Necesitas algo diferente? Platicamos →
              </a>
            </div>
          </div>
        </div>

        {/* Para quién */}
        <div className="mb-12">
          <p className="text-white/25 text-xs uppercase tracking-widest font-semibold text-center mb-6">¿Para quién es este plan?</p>
          <div className="space-y-3">
            {forWho.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
                <span className="text-2xl shrink-0">{c.emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{c.title}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <p className="text-white/25 text-xs uppercase tracking-widest font-semibold text-center mb-6">Preguntas frecuentes</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
                <p className="text-white text-sm font-bold mb-2">{faq.q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center">
          <p className="text-white/40 text-sm mb-5">Empezamos en menos de 48 horas.</p>
          <Link
            href="/cotizar"
            className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-black text-base hover:opacity-90 transition-opacity"
          >
            Solicitar propuesta →
          </Link>
          <div className="mt-4">
            <a
              href="https://wa.me/529851089671?text=Hola%2C%20vi%20el%20Plan%20Esencial%20y%20necesito%20algo%20diferente"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-xs hover:text-white/50 transition-colors"
            >
              ¿Necesitas algo diferente? Platicamos →
            </a>
          </div>
        </div>

      </div>

      {/* Footer mínimo */}
      <div className="border-t border-white/5 px-4 py-6 text-center">
        <p className="text-white/20 text-xs">© 2025 JUN · Agencia de Marketing Digital · Riviera Maya</p>
      </div>

    </div>
  )
}
