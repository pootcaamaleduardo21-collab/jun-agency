'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SERVICE_LABELS: Record<string, string> = {
  cm: 'Community Manager', posts: 'Diseño de posts', reels: 'Reels y video',
  ads: 'Publicidad digital', produccion: 'Foto y video profesional',
  drone: 'Tomas con drone', tour360: 'Recorrido virtual 360°',
}
const SERVICE_ICONS: Record<string, string> = {
  cm: '👤', posts: '🎨', reels: '🎬', ads: '📣',
  produccion: '📷', drone: '🚁', tour360: '🔵',
}
const BUNDLE_NAMES: Record<string, string> = {
  esencial: 'Plan Esencial', activo: 'Plan Activo', pro: 'Plan Pro',
}

interface QuoteData {
  clientType: string; bundle: string; services: string[]
  cmPlan: string; postsPlan: string; reelsPlan: string
  adsPlatforms: string[]; produccionPlan: string
  nombre: string; empresa: string; whatsapp: string; email: string; notas: string
}

interface ProposalLines { [svc: string]: string[] }

function getActiveServices(quote: QuoteData, lines: ProposalLines): string[] {
  if (Object.keys(lines).length > 0) return Object.keys(lines)
  return quote.services || []
}

/* ─── Welcome Document ───────────────────────────────────────────────── */
function WelcomeDoc({ quote, lines }: { quote: QuoteData; lines: ProposalLines }) {
  const firstName   = quote.nombre.split(' ')[0]
  const empresa     = quote.empresa || quote.nombre
  const activeServices = getActiveServices(quote, lines)
  const bundleName  = quote.bundle ? BUNDLE_NAMES[quote.bundle] : null

  return (
    <div className="welcome-doc bg-white max-w-2xl mx-auto shadow-none print:max-w-full">

      {/* Hero header */}
      <div style={{ background: 'linear-gradient(135deg, #1a0a3a 0%, #0a1a2a 100%)' }} className="px-12 py-14 print:px-10 print:py-10 text-center">
        <p style={{ letterSpacing: '-1px' }} className="text-white font-black text-4xl mb-2">jún</p>
        <p className="text-white/40 text-xs tracking-widest uppercase">Agencia de Marketing Digital</p>
        <div className="w-12 h-px bg-white/20 mx-auto my-6" />
        <p className="text-white font-black text-2xl mb-1">¡Bienvenido/a, {firstName}! 🎉</p>
        <p style={{ color: 'rgba(139,92,246,0.9)' }} className="text-sm font-semibold tracking-wide">{empresa} × jún</p>
      </div>

      {/* Body */}
      <div className="px-12 py-10 print:px-10 print:py-8">

        {/* Message */}
        <div className="mb-10">
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Estamos muy contentos de que hayas decidido trabajar con nosotros.
            A partir de hoy, <strong>jún es tu equipo de marketing digital</strong> —
            enfocados en hacer crecer tu presencia y resultados.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Preparamos esta carta para darte la bienvenida y contarte qué esperar en los próximos días.
            Cualquier duda, escríbenos directo por WhatsApp.
          </p>
        </div>

        {/* Services hired */}
        <div className="mb-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Lo que contrataste</p>
          <div className="space-y-2">
            {bundleName && (
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                <span className="text-lg">📦</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{bundleName}</p>
                  <p className="text-gray-500 text-xs">Plan mensual todo incluido</p>
                </div>
              </div>
            )}
            {activeServices
              .filter(s => !bundleName || ['produccion', 'drone', 'tour360', 'ads'].includes(s))
              .map(svc => (
                <div key={svc} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-lg">{SERVICE_ICONS[svc] || '✓'}</span>
                  <p className="font-semibold text-gray-700 text-sm">{SERVICE_LABELS[svc] || svc}</p>
                </div>
              ))}
          </div>
        </div>

        {/* First week */}
        <div className="mb-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Qué pasa en los primeros 7 días</p>
          <div className="space-y-3">
            {[
              { day: 'Día 1–2', text: 'Llamada de onboarding para conocer tu marca, voz y objetivos.' },
              { day: 'Día 2–3', text: 'Brief creativo y propuesta de estrategia de contenido inicial.' },
              { day: 'Día 3–4', text: 'Acceso a tu carpeta compartida de materiales y activos de marca.' },
              { day: 'Día 5–7', text: 'Primeras propuestas de contenido para tu aprobación antes de publicar.' },
            ].map(({ day, text }) => (
              <div key={day} className="flex items-start gap-3">
                <div className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold mt-0.5" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>{day}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-8 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(26,10,58,0.04), rgba(10,26,42,0.04))', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Tu punto de contacto</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0" style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>J</div>
            <div>
              <p className="font-bold text-gray-800">Jimmy Caamal</p>
              <p className="text-gray-500 text-sm">Director · jún</p>
              <div className="flex gap-4 mt-1">
                <a href="https://wa.me/529851089671" className="text-green-600 text-xs font-semibold">WhatsApp: +52 985 108 9671</a>
                <a href="mailto:informesjunmkt@gmail.com" className="text-blue-600 text-xs">informesjunmkt@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Closing message */}
        <p className="text-gray-500 text-sm leading-relaxed italic border-t border-gray-100 pt-6">
          &ldquo;Nos emociona ser parte de tu crecimiento. Trabajemos juntos para hacer que tu marca destaque y conecte con las personas correctas.&rdquo;
          <br /><br />
          <span className="font-bold text-gray-700">— Equipo jún</span>
        </p>

      </div>

      {/* Footer */}
      <div className="px-12 py-6 print:px-10" style={{ background: '#09090b' }}>
        <div className="flex items-center justify-between">
          <p style={{ letterSpacing: '-0.5px' }} className="text-white font-black text-lg">jún</p>
          <p className="text-white/30 text-xs">junmkt.com · Riviera Maya, México</p>
        </div>
      </div>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Inner ──────────────────────────────────────────────────────────── */
function BienvenidaInner() {
  const searchParams = useSearchParams()
  const [auth, setAuth]   = useState(false)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [lines, setLines] = useState<ProposalLines>({})

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('jun_admin') === 'ok') setAuth(true)
  }, [])

  useEffect(() => {
    if (!auth) return
    const q = searchParams.get('q')
    const p = searchParams.get('p')
    if (q) {
      try { setQuote(JSON.parse(atob(decodeURIComponent(q)))) } catch { /* */ }
    }
    if (p) {
      try { setLines(JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(p)))))) } catch { /* */ }
    }
  }, [searchParams, auth])

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white font-bold text-lg mb-2">Acceso requerido</p>
          <p className="text-white/50 text-sm mb-6">Abre este documento desde el panel de cotizaciones.</p>
          <Link href="/admin" className="px-5 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold">Ir al panel →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Toolbar */}
      <div className="bg-[#09090b] border-b border-white/5 px-4 py-3 print:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/40 text-sm hover:text-white/70 transition">← Panel</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70 text-sm font-semibold">Carta de bienvenida</span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-bold hover:bg-cyan-600 transition"
          >
            🖨️ Imprimir / Guardar PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="py-8 print:py-0">
        {quote
          ? <WelcomeDoc quote={quote} lines={lines} />
          : <div className="text-center py-20 text-gray-400">No se encontraron datos de cotización.</div>
        }
      </div>
    </div>
  )
}

export default function BienvenidaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>}>
      <BienvenidaInner />
    </Suspense>
  )
}
