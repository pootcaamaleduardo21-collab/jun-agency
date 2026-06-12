'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ─── Types ──────────────────────────────────────────────────────────── */
type ClientType = 'agente' | 'empresa' | 'emprendimiento' | ''
type ServiceKey = 'cm' | 'posts' | 'reels' | 'ads' | 'produccion' | 'drone' | 'tour360'
type AdsPlat = 'meta' | 'google' | 'tiktok'

interface QuoteForm {
  clientType: ClientType
  bundle: string          // '' = sin paquete, 'presencia' | 'activo' | 'pro'
  services: ServiceKey[]
  cmPlan: string
  postsPlan: string
  reelsPlan: string
  adsPlatforms: AdsPlat[]
  produccionPlan: string
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  notas: string
}

const INITIAL: QuoteForm = {
  clientType: '', bundle: '', services: [],
  cmPlan: '', postsPlan: '', reelsPlan: '',
  adsPlatforms: [], produccionPlan: '',
  nombre: '', empresa: '', whatsapp: '', email: '', notas: '',
}

/* ─── Planes mensuales (universales) ─────────────────────────────────── */
const PLAN_BUNDLES = {
  esencial: {
    name: 'Plan Esencial',
    tagline: 'Contenido profesional sin complicaciones',
    price: '$4,800/mes',
    badge: 'Para empezar',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    features: ['4 posts diseñados al mes', '4 reels editados al mes', '1 sesión de levantamiento/mes (Playa del Carmen)'],
    note: 'Levantamiento incluido solo en Playa del Carmen · 1 ubicación · hasta 3 hrs. Otras zonas se cotizan aparte.',
    autoServices: ['posts', 'reels'] as ServiceKey[],
    autoCmPlan: '', autoPostsPlan: 'starter', autoReelsPlan: 'starter',
  },
  activo: {
    name: 'Plan Gestión',
    tagline: 'Presencia constante sin que tengas que preocuparte',
    price: '$7,500/mes',
    badge: 'Más popular',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    features: ['Community Manager (hasta 2 redes)', '8 posts diseñados al mes', '5 reels editados al mes', '1 levantamiento de contenido/mes', 'Gestión de comentarios básica'],
    note: 'Tu marca activa en redes sin que tengas que tocar nada — tú solo apruebas.',
    autoServices: ['cm', 'posts', 'reels'] as ServiceKey[],
    autoCmPlan: 'basico', autoPostsPlan: 'estandar', autoReelsPlan: 'estandar',
  },
  pro: {
    name: 'Plan Premium',
    tagline: 'Gestión, estrategia y resultados medibles',
    price: '$11,000/mes',
    badge: 'Todo incluido',
    badgeColor: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    features: ['Community Manager (3 redes + DMs)', '12 posts diseñados al mes', '6 reels editados al mes', '2 levantamientos de contenido/mes', 'Estrategia de contenido mensual', 'Reporte de métricas mensual'],
    note: 'Gestión digital completa — enfócate en tu negocio, nosotros nos encargamos de todo lo demás.',
    autoServices: ['cm', 'posts', 'reels'] as ServiceKey[],
    autoCmPlan: 'estandar', autoPostsPlan: 'estandar', autoReelsPlan: 'premium',
  },
} as const

type BundleKey = keyof typeof PLAN_BUNDLES

const TOTAL_STEPS = 3

/* ─── Helpers ────────────────────────────────────────────────────────── */
function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

/* ─── Client-side pricing (cart display) ─────────────────────────────── */
const BUNDLE_PRICES: Record<string, number> = { esencial: 4800, activo: 7500, pro: 11000 }
const ADS_PRICES: Partial<Record<AdsPlat, number>> = { meta: 2000, google: 2000, tiktok: 1500 }
function calcTotal(form: QuoteForm): number {
  return (BUNDLE_PRICES[form.bundle] || 0) +
    form.adsPlatforms.reduce((s, p) => s + (ADS_PRICES[p] || 0), 0)
}

/* ─── PlanCard ───────────────────────────────────────────────────────── */
function PlanCard({
  selected, onClick, title, badge, badgeColor = 'violet', features,
}: {
  selected: boolean; onClick: () => void; title: string
  badge?: string; badgeColor?: 'violet' | 'cyan' | 'lime'; features: string[]
}) {
  const badgeStyles = {
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    cyan:   'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    lime:   'bg-lime-500/20 text-lime-300 border-lime-500/30',
  }
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className={`font-bold text-sm ${selected ? 'text-white' : 'text-white/80'}`}>{title}</p>
        {badge && <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyles[badgeColor]}`}>{badge}</span>}
      </div>
      <ul className="space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-white/55">
            <span className={`mt-0.5 shrink-0 ${selected ? 'text-violet-400' : 'text-white/25'}`}>✓</span>{f}
          </li>
        ))}
      </ul>
    </button>
  )
}

/* ─── InfoCard ───────────────────────────────────────────────────────── */
function InfoCard({ title, features, color = 'violet' }: {
  title: string; features: string[]; color?: 'violet' | 'cyan'
}) {
  const s = color === 'violet' ? 'border-violet-500/30 bg-violet-500/5' : 'border-cyan-500/30 bg-cyan-500/5'
  const c = color === 'violet' ? 'text-violet-400' : 'text-cyan-400'
  return (
    <div className={`p-4 rounded-2xl border ${s}`}>
      <p className="text-white font-bold text-sm mb-3">{title}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-white/60">
            <span className={`mt-0.5 shrink-0 ${c}`}>—</span>{f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── SectionLabel ───────────────────────────────────────────────────── */
function SectionLabel({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 shrink-0" />
      <div>
        <p className="text-white font-bold text-sm">{title}</p>
        {sub && <p className="text-white/40 text-xs">{sub}</p>}
      </div>
    </div>
  )
}

/* ─── AdsUpsell (shown after bundle selection in step 1) ─────────────── */
function AdsUpsell({ form, onToggle }: {
  form: QuoteForm
  onToggle: (p: AdsPlat) => void
}) {
  const platforms = [
    { id: 'meta'   as AdsPlat, label: 'Meta Ads',    sub: 'Facebook + Instagram', price: 2000, color: 'bg-blue-500' },
    { id: 'google' as AdsPlat, label: 'Google Ads',  sub: 'Búsqueda y display',   price: 2000, color: 'bg-red-500'  },
    { id: 'tiktok' as AdsPlat, label: 'TikTok Ads',  sub: 'Video y tendencias',   price: 1500, color: 'bg-white'   },
  ]
  const anySelected = form.adsPlatforms.length > 0
  return (
    <div className={`mt-1 p-4 rounded-2xl border transition-all ${anySelected ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-[#2a2a3a] bg-[#18181f]'}`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-white font-bold text-sm">¿Agregar publicidad digital?</p>
        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">Muy solicitado</span>
      </div>
      <p className="text-white/40 text-xs mb-3">Campañas en redes y buscadores · Incluye reporte mensual de resultados</p>
      <div className="grid grid-cols-3 gap-2">
        {platforms.map(p => {
          const sel = form.adsPlatforms.includes(p.id)
          return (
            <button key={p.id} type="button" onClick={() => onToggle(p.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${sel ? 'border-cyan-500 bg-cyan-500/10' : 'border-[#2a2a3a] hover:border-cyan-500/30'}`}
            >
              <span className={`inline-block w-2 h-2 rounded-full mb-2 ${p.color}`} />
              <p className={`text-xs font-bold ${sel ? 'text-white' : 'text-white/70'}`}>{p.label}</p>
              <p className="text-white/40 text-[10px]">{p.sub}</p>
              <p className={`text-xs font-bold mt-1.5 ${sel ? 'text-cyan-300' : 'text-white/40'}`}>+${p.price.toLocaleString('es-MX')}/mes</p>
            </button>
          )
        })}
      </div>
      <p className="text-white/25 text-[10px] mt-2">La pauta publicitaria (presupuesto de anuncios) se cotiza aparte</p>
    </div>
  )
}

/* ─── CartTotal ──────────────────────────────────────────────────────── */
function CartTotal({ form }: { form: QuoteForm }) {
  const total = calcTotal(form)
  if (total === 0) return null
  const b = form.bundle ? PLAN_BUNDLES[form.bundle as BundleKey] : null
  const hasProjectAddons = form.services.some(s => ['produccion', 'drone', 'tour360'].includes(s))
  return (
    <div className="mt-6 space-y-1.5">
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-white/40 text-[10px] uppercase tracking-wide font-semibold mb-1">Plan mensual</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {b && <span className="text-white/60 text-xs">{b.name}</span>}
            {form.adsPlatforms.map(p => (
              <span key={p} className="text-cyan-400/70 text-xs capitalize">+ {p} ads</span>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-white font-black text-2xl leading-none">${total.toLocaleString('es-MX')}</p>
          <p className="text-white/35 text-[10px] mt-0.5">/mes</p>
        </div>
      </div>
      {hasProjectAddons && (
        <p className="text-white/30 text-[11px] text-center px-2">
          + Los servicios adicionales (drone, 360°, producción) se cotizan por separado según el proyecto
        </p>
      )}
    </div>
  )
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function CotizarPage() {
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState<QuoteForm>(INITIAL)
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  const set = <K extends keyof QuoteForm>(key: K, val: QuoteForm[K]) =>
    setForm(f => ({ ...f, [key]: val }))

  /* ── Apply bundle: auto-fill services and plans ── */
  const applyBundle = (key: BundleKey) => {
    const b = PLAN_BUNDLES[key]
    setForm(f => ({
      ...f,
      bundle: key,
      services: [...b.autoServices],
      cmPlan: b.autoCmPlan,
      postsPlan: b.autoPostsPlan,
      reelsPlan: b.autoReelsPlan,
      adsPlatforms: [],
      produccionPlan: '',
    }))
  }

  /* ── Toggle ads platform (atomically updates both adsPlatforms + services) ── */
  const toggleAdsPlatform = (p: AdsPlat) => {
    setForm(f => {
      const newPlats = toggle(f.adsPlatforms, p)
      const newSvcs = newPlats.length > 0
        ? (f.services.includes('ads') ? f.services : [...f.services, 'ads' as ServiceKey])
        : f.services.filter(s => s !== ('ads' as ServiceKey))
      return { ...f, adsPlatforms: newPlats, services: newSvcs }
    })
  }

  const canProceed = () => {
    if (step === 0) return form.bundle !== '' || form.services.length > 0
    if (step === 1) {
      if (form.services.includes('produccion') && !form.produccionPlan) return false
      return true
    }
    if (step === 2) return !!(form.nombre && form.whatsapp && form.email)
    return true
  }

  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }


  /* ── Success ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-px bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto mb-8" />
          <h1 className="text-2xl font-black text-white mb-3">Solicitud recibida, {form.nombre.split(' ')[0]}.</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Recibimos tu solicitud. Vamos a preparar una <strong className="text-white">propuesta personalizada en PDF</strong> con los servicios que elegiste.
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Te contactamos en <strong className="text-white/60">menos de 24 horas</strong> por WhatsApp o correo.
          </p>
          <a href="https://wa.me/529851089671?text=Hola%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-sm mb-5">
            Escribirnos por WhatsApp →
          </a>
          <div>
            <Link href="/" className="text-white/30 text-sm hover:text-white/60 transition">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    )
  }

  const stepTitles = [
    { title: '¿Qué necesitas?',  sub: 'Elige un plan mensual o servicios por proyecto' },
    { title: 'Confirma tu plan', sub: 'Revisa lo que incluye tu selección' },
    { title: 'Tus datos',        sub: 'Para enviarte la propuesta personalizada en PDF' },
  ]

  return (
    <div className="min-h-screen bg-[#09090b]">

      {/* Top bar */}
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="JUN" className="h-9 w-auto" style={{ filter: 'invert(1) brightness(1.1)' }} />
          </Link>
          <span className="text-white/30 text-xs">Paso {step + 1} de {TOTAL_STEPS}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/5">
        <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">

        {/* Step title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-1">{stepTitles[step].title}</h1>
          <p className="text-white/50 text-sm">{stepTitles[step].sub}</p>
        </div>

        {/* ══ STEP 0: Servicios ══ */}
        {step === 0 && (
          <div className="space-y-4">

            {/* Planes mensuales — universales para todos */}
            <p className="text-white/40 text-xs uppercase tracking-wide font-semibold">Elige tu plan mensual</p>
            {(Object.entries(PLAN_BUNDLES) as [BundleKey, typeof PLAN_BUNDLES[BundleKey]][]).map(([key, b]) => {
              const sel = form.bundle === key
              return (
                <button key={key} type="button" onClick={() => applyBundle(key)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    sel ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-white text-base">{b.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${b.badgeColor}`}>{b.badge}</span>
                      </div>
                      <p className="text-white/50 text-xs">{b.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-black text-xl leading-none mb-1 ${sel ? 'text-white' : 'text-white/60'}`}>{b.price}</p>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${sel ? 'border-violet-500 bg-violet-500' : 'border-white/20'}`}>
                        {sel && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                    {b.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-white/60">
                        <span className={sel ? 'text-violet-400' : 'text-white/25'}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs mt-1 text-white/40">{b.note}</p>
                </button>
              )
            })}

            {/* CTA plan custom */}
            <a
              href="https://wa.me/529851089671?text=Hola%2C%20necesito%20un%20plan%20personalizado"
              target="_blank" rel="noopener noreferrer"
              className="w-full text-left p-5 rounded-2xl border-2 border-dashed border-white/10 bg-transparent hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 flex items-center gap-4 group block"
            >
              <div className="flex-1">
                <p className="font-bold text-white/70 group-hover:text-white text-sm transition-colors">¿Necesitas algo diferente?</p>
                <p className="text-white/35 text-xs mt-0.5">Video institucional, producción especial o un plan a tu medida — cotizamos sin compromiso.</p>
              </div>
              <span className="shrink-0 text-white/30 group-hover:text-violet-400 text-lg transition-colors">→</span>
            </a>

            {/* Ads upsell — visible cuando hay un plan seleccionado */}
            {form.bundle && <AdsUpsell form={form} onToggle={toggleAdsPlatform} />}

            {/* Servicios adicionales por proyecto */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-white/5" />
                <p className="text-white/30 text-xs shrink-0">Servicios adicionales por proyecto</p>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-2">
                {([
                  { id: 'produccion' as ServiceKey, title: 'Fotografía y video profesional', sub: 'Sesión de alta calidad — precio por proyecto' },
                  { id: 'drone'      as ServiceKey, title: 'Tomas con drone',                sub: 'Foto y video aéreo 4K — precio por proyecto' },
                  { id: 'tour360'    as ServiceKey, title: 'Recorrido virtual 360°',         sub: 'Tour navegable en web y móvil — precio por proyecto' },
                ] as const).map(svc => {
                  const sel = form.services.includes(svc.id)
                  return (
                    <button key={svc.id} type="button"
                      onClick={() => set('services', toggle(form.services, svc.id))}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        sel ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm">{svc.title}</p>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">Por proyecto</span>
                        </div>
                        <p className="text-white/50 text-xs mt-0.5">{svc.sub}</p>
                      </div>
                      <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        sel ? 'border-violet-500 bg-violet-500' : 'border-white/20'
                      }`}>
                        {sel && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {/* ══ STEP 1: Confirmar selección ══ */}
        {step === 1 && (
          <div className="space-y-6">

            {/* Resumen del plan mensual */}
            {form.bundle && (() => {
              const b = PLAN_BUNDLES[form.bundle as BundleKey]
              return (
                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <p className="text-white font-bold">{b?.name}</p>
                      <p className="text-white/50 text-xs">{b?.tagline}</p>
                    </div>
                    <span className="ml-auto text-violet-300 font-black text-lg">{b?.price}</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {b?.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  {b?.note && <p className="text-xs text-white/40 border-t border-white/5 pt-3">{b.note}</p>}
                </div>
              )
            })()}

            {/* Ads seleccionados */}
            {form.adsPlatforms.length > 0 && (
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide mb-2">Publicidad digital agregada</p>
                <div className="flex flex-wrap gap-2">
                  {form.adsPlatforms.map(p => (
                    <span key={p} className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 capitalize">{p} Ads · +${ADS_PRICES[p]?.toLocaleString('es-MX')}/mes</span>
                  ))}
                </div>
              </div>
            )}

            {/* Detalle de Producción — elegir modalidad */}
            {form.services.includes('produccion') && (
              <div>
                <SectionLabel title="Foto y video profesional" sub="Sesión completa — precio por proyecto" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PlanCard selected={form.produccionPlan === 'foto'}  onClick={() => set('produccionPlan','foto')}  title="Fotografía"
                    features={['Sesión fotográfica completa','Entregables editados en alta res','Derechos de uso comercial']} />
                  <PlanCard selected={form.produccionPlan === 'video'} onClick={() => set('produccionPlan','video')} title="Video / Reel"
                    features={['Producción de video profesional','Edición con color y motion','Formatos para distintas plataformas']} />
                  <PlanCard selected={form.produccionPlan === 'pack'}  onClick={() => set('produccionPlan','pack')}  title="Pack completo"
                    badge="Mejor valor" badgeColor="lime" features={['Fotografía + video en una sesión','Todo incluido','Ideal para lanzamientos']} />
                </div>
              </div>
            )}

            {/* Drone */}
            {form.services.includes('drone') && (
              <div>
                <SectionLabel title="Tomas con drone" sub="Por proyecto — incluye foto y video aéreo" />
                <InfoCard title="Vuelo con drone — foto y video 4K" color="violet"
                  features={['Fotografía aérea en alta resolución','Video aéreo 4K editado','Vuelo sobre la propiedad o zona indicada','Derechos de uso comercial incluidos']} />
              </div>
            )}

            {/* Tour 360° */}
            {form.services.includes('tour360') && (
              <div>
                <SectionLabel title="Recorrido virtual 360°" sub="Por proyecto — tour interactivo navegable" />
                <InfoCard title="Tour virtual 360° completo" color="cyan"
                  features={['Captura de todos los espacios del inmueble','Tour navegable en web y móvil','Link compartible para clientes y portales','Ideal para ventas y arrendamientos']} />
              </div>
            )}

            {form.bundle && !form.services.some(s => ['produccion','drone','tour360'].includes(s)) && (
              <p className="text-white/30 text-xs text-center pt-2">¿Quieres agregar drone, 360° o producción? Vuelve al paso anterior para seleccionarlos.</p>
            )}

          </div>
        )}

        {/* ══ STEP 2: Contacto ══ */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Nombre completo *</label>
              <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Empresa o negocio <span className="ml-1 text-white/30 normal-case font-normal">(opcional)</span>
              </label>
              <input type="text" value={form.empresa} onChange={e => set('empresa', e.target.value)}
                placeholder="Nombre de tu empresa o proyecto"
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">WhatsApp *</label>
              <input type="tel" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+52 998 000 0000"
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Correo electrónico *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="tu@correo.com"
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Cuéntanos más <span className="ml-1 text-white/30 normal-case font-normal">(opcional)</span>
              </label>
              <textarea value={form.notas} onChange={e => set('notas', e.target.value)}
                placeholder="¿Tienes alguna fecha límite, proyecto específico o algo que debamos saber?" rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition resize-none" />
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#18181f] border border-[#2a2a3a]">
              <span className="text-xl shrink-0">📄</span>
              <div>
                <p className="text-white text-xs font-bold mb-0.5">Recibirás una propuesta personalizada en PDF</p>
                <p className="text-white/40 text-xs leading-relaxed">Preparamos un documento con los servicios elegidos, detalles y próximos pasos.</p>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>
        )}

        {/* Cart total */}
        {/* Cart total — only for bundle flow (individual services mix monthly + project pricing) */}
        {form.bundle && <CartTotal form={form} />}

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <button type="button" onClick={() => setStep(s => s - 1)}
              className="px-5 py-3 rounded-2xl border border-[#2a2a3a] text-white/50 text-sm font-semibold hover:text-white hover:border-white/20 transition">
              ← Anterior
            </button>
          )}
          {step < TOTAL_STEPS - 1 ? (
            <button type="button" onClick={() => canProceed() && setStep(s => s + 1)} disabled={!canProceed()}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                canProceed() ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:opacity-90' : 'bg-[#18181f] text-white/25 border border-[#2a2a3a] cursor-not-allowed'
              }`}>
              Continuar →
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={!canProceed() || loading}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                canProceed() && !loading ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:opacity-90' : 'bg-[#18181f] text-white/25 border border-[#2a2a3a] cursor-not-allowed'
              }`}>
              {loading ? 'Enviando...' : 'Enviar solicitud →'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

