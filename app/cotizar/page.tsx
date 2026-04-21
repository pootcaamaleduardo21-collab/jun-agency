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

/* ─── Planes mensuales (para independientes) ─────────────────────────── */
const AGENT_BUNDLES = {
  esencial: {
    name: 'Plan Esencial',
    tagline: 'Para estar presente sin complicaciones',
    price: '$2,500/mes',
    badge: 'Más accesible',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    features: ['4 diseños al mes', '2 reels al mes', 'Contenido listo para publicar'],
    note: '⚠️ No incluye levantamiento de contenido — trabajamos con el material que tú nos proveas (fotos, videos, info).',
    autoServices: ['posts', 'reels'] as ServiceKey[],
    autoCmPlan: '', autoPostsPlan: 'starter', autoReelsPlan: 'starter',
  },
  activo: {
    name: 'Plan Activo',
    tagline: 'Presencia constante con gestión incluida',
    price: '$4,500/mes',
    badge: 'Más popular',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    features: ['Community Manager básico', '8 diseños al mes', '5 reels al mes', '✓ Incluye sesión de levantamiento mensual'],
    note: 'Gestión de tu presencia digital sin que tengas que preocuparte por el contenido.',
    autoServices: ['cm', 'posts', 'reels'] as ServiceKey[],
    autoCmPlan: 'basico', autoPostsPlan: 'estandar', autoReelsPlan: 'estandar',
  },
  pro: {
    name: 'Plan Pro',
    tagline: 'Estrategia y gestión completa',
    price: '$6,000/mes',
    badge: 'Todo incluido',
    badgeColor: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    features: ['Community Manager Estándar (3 redes + DMs)', '12 diseños al mes', '6 reels al mes', '✓ Levantamiento mensual + estrategia', '✓ Reporte mensual de métricas'],
    note: 'Tu presencia digital gestionada al 100% — tú solo apruebas el contenido.',
    autoServices: ['cm', 'posts', 'reels'] as ServiceKey[],
    autoCmPlan: 'estandar', autoPostsPlan: 'estandar', autoReelsPlan: 'premium',
  },
} as const

type BundleKey = keyof typeof AGENT_BUNDLES

const TOTAL_STEPS = 4

/* ─── Helpers ────────────────────────────────────────────────────────── */
function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
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
function InfoCard({ icon, title, features, color = 'violet' }: {
  icon: string; title: string; features: string[]; color?: 'violet' | 'cyan'
}) {
  const s = color === 'violet' ? 'border-violet-500/40 bg-violet-500/5' : 'border-cyan-500/40 bg-cyan-500/5'
  const c = color === 'violet' ? 'text-violet-400' : 'text-cyan-400'
  return (
    <div className={`p-4 rounded-2xl border ${s}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <div>
          <p className="text-white font-bold text-sm mb-2">{title}</p>
          <ul className="space-y-1.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                <span className={`mt-0.5 shrink-0 ${c}`}>✓</span>{f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── SectionLabel ───────────────────────────────────────────────────── */
function SectionLabel({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl bg-[#1a1a2e] border border-[#2a2a3a] flex items-center justify-center text-base shrink-0">{icon}</div>
      <div>
        <p className="text-white font-bold text-sm">{title}</p>
        {sub && <p className="text-white/40 text-xs">{sub}</p>}
      </div>
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
  const [showCustom, setShowCustom] = useState(false) // for agents: show individual services

  const set = <K extends keyof QuoteForm>(key: K, val: QuoteForm[K]) =>
    setForm(f => ({ ...f, [key]: val }))

  /* ── Apply bundle: auto-fill services and plans ── */
  const applyBundle = (key: BundleKey) => {
    const b = AGENT_BUNDLES[key]
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
    setShowCustom(false)
  }

  /* ── Clear bundle and go individual ── */
  const goCustom = () => {
    setForm(f => ({ ...f, bundle: '', services: [], cmPlan: '', postsPlan: '', reelsPlan: '', adsPlatforms: [], produccionPlan: '' }))
    setShowCustom(true)
  }

  const canProceed = () => {
    if (step === 0) return form.clientType !== ''
    if (step === 1) {
      if (form.clientType === 'agente') {
        // Either a bundle selected, OR custom services with at least one
        return form.bundle !== '' || form.services.length > 0
      }
      return form.services.length > 0
    }
    if (step === 2) {
      // If bundle: only need to validate project services
      if (form.bundle) return true
      const s = form.services
      if (s.includes('cm')         && !form.cmPlan)                   return false
      if (s.includes('posts')      && !form.postsPlan)                return false
      if (s.includes('reels')      && !form.reelsPlan)                return false
      if (s.includes('ads')        && form.adsPlatforms.length === 0) return false
      if (s.includes('produccion') && !form.produccionPlan)           return false
      return true
    }
    if (step === 3) return !!(form.nombre && form.whatsapp && form.email)
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

  const isAgent   = form.clientType === 'agente'
  const isCompany = form.clientType === 'empresa'

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 text-4xl">🎯</div>
          <h1 className="text-2xl font-black text-white mb-3">¡Listo, {form.nombre.split(' ')[0]}!</h1>
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
    { title: '¿Cómo trabajas?',      sub: 'Esto nos ayuda a personalizar tu propuesta' },
    { title: '¿Qué necesitas?',      sub: isAgent ? 'Elige un plan mensual o personaliza tus servicios' : 'Elige uno o varios servicios — se pueden combinar' },
    { title: 'Personaliza tu plan',  sub: 'Adapta cada servicio a lo que realmente necesitas' },
    { title: 'Tus datos',            sub: 'Para enviarte la propuesta personalizada en PDF' },
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

        {/* ══ STEP 0: Perfil ══ */}
        {step === 0 && (
          <div className="space-y-3">
            {([
              { id: 'agente'        as ClientType, icon: '🧑', title: 'Soy profesional independiente',    sub: 'Consultor, agente, freelance o asesor que trabaja por su cuenta' },
              { id: 'empresa'       as ClientType, icon: '🏢', title: 'Empresa o marca',         sub: 'Empresa establecida con equipo y proyectos en curso' },
              { id: 'emprendimiento'as ClientType, icon: '🚀', title: 'Negocio o emprendimiento',sub: 'Proyecto nuevo o marca personal que quiero hacer crecer' },
            ] as const).map(opt => (
              <button key={opt.id} type="button" onClick={() => { set('clientType', opt.id); setShowCustom(false) }}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                  form.clientType === opt.id ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'
                }`}
              >
                <span className="text-2xl shrink-0">{opt.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{opt.title}</p>
                  <p className="text-white/50 text-xs mt-0.5">{opt.sub}</p>
                </div>
                <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  form.clientType === opt.id ? 'border-violet-500 bg-violet-500' : 'border-white/20'
                }`}>
                  {form.clientType === opt.id && <span className="text-white text-xs font-bold">✓</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ══ STEP 1: Servicios ══ */}
        {step === 1 && (
          <div className="space-y-6">

            {/* ── AGENT: Bundle cards ── */}
            {isAgent && !showCustom && (
              <div className="space-y-3">
                <p className="text-white/40 text-xs uppercase tracking-wide font-semibold">Planes mensuales</p>
                {(Object.entries(AGENT_BUNDLES) as [BundleKey, typeof AGENT_BUNDLES[BundleKey]][]).map(([key, b]) => {
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
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                          sel ? 'border-violet-500 bg-violet-500' : 'border-white/20'
                        }`}>
                          {sel && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                        {b.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-white/60">
                            <span className={sel ? 'text-violet-400' : 'text-white/25'}>✓</span>{f}
                          </li>
                        ))}
                      </ul>
                      <p className={`text-xs mt-1 ${b.note.startsWith('⚠️') ? 'text-yellow-400/70' : 'text-white/40'}`}>{b.note}</p>
                    </button>
                  )
                })}

                {/* Divider + custom link */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-px bg-white/5" />
                    <p className="text-white/30 text-xs shrink-0">¿Necesitas algo diferente?</p>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* Project services (always available for agents too) */}
                  <div className="space-y-2">
                    {([
                      { id: 'produccion'as ServiceKey, icon: '📷', title: 'Foto y video profesional', sub: 'Sesión de alta calidad — por proyecto' },
                      { id: 'drone'     as ServiceKey, icon: '🚁', title: 'Tomas con drone',           sub: 'Fotografía y video aéreo — por proyecto' },
                      { id: 'tour360'   as ServiceKey, icon: '🔵', title: 'Recorrido virtual 360°',   sub: 'Tour interactivo navegable — por proyecto' },
                    ] as const).map(svc => {
                      const sel = form.services.includes(svc.id)
                      return (
                        <button key={svc.id} type="button"
                          onClick={() => set('services', toggle(form.services, svc.id))}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            sel ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'
                          }`}
                        >
                          <span className="text-xl shrink-0">{svc.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-white text-sm">{svc.title}</p>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">Por proyecto</span>
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

                  <button onClick={goCustom}
                    className="w-full mt-3 py-3 rounded-2xl border border-dashed border-white/15 text-white/40 text-sm hover:text-white/70 hover:border-white/25 transition">
                    Personalizar servicios individuales →
                  </button>
                </div>
              </div>
            )}

            {/* ── AGENT: Custom individual services (after clicking "Personalizar") ── */}
            {isAgent && showCustom && (
              <div className="space-y-3">
                <button onClick={() => { setShowCustom(false); goCustom() }}
                  className="flex items-center gap-2 text-white/40 text-xs hover:text-white/70 transition mb-1">
                  ← Volver a paquetes
                </button>
                <IndividualServices form={form} set={set} isAgent={true} />
              </div>
            )}

            {/* ── NON-AGENT: Individual services ── */}
            {!isAgent && (
              <IndividualServices form={form} set={set} isAgent={false} />
            )}

          </div>
        )}

        {/* ══ STEP 2: Planes ══ */}
        {step === 2 && (
          <div className="space-y-10">

            {/* Bundle summary — replaces plan cards when a bundle is active */}
            {form.bundle && (() => {
              const b = AGENT_BUNDLES[form.bundle as BundleKey]
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

            {/* CM — only when NO bundle active */}
            {!form.bundle && form.services.includes('cm') && (
              <div>
                <SectionLabel icon="👤" title="Community Manager" sub="Gestión mensual de redes sociales" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PlanCard selected={form.cmPlan === 'basico'}   onClick={() => set('cmPlan','basico')}   title="Plan Básico"
                    badge={isAgent ? 'Recomendado' : undefined} features={['1–2 redes sociales','Gestión de contenido diaria','Respuesta a comentarios']} />
                  <PlanCard selected={form.cmPlan === 'estandar'} onClick={() => set('cmPlan','estandar')} title="Plan Estándar"
                    features={['3 redes sociales','Gestión completa + DMs','Estrategia de contenido mensual']} />
                  <PlanCard selected={form.cmPlan === 'pro'}      onClick={() => set('cmPlan','pro')}      title="Plan Pro"
                    badge={isCompany ? 'Para empresas' : undefined} badgeColor="cyan"
                    features={['4+ redes sociales','DMs + estrategia avanzada','Reportes y métricas mensuales']} />
                </div>
              </div>
            )}

            {/* Posts — only when NO bundle active */}
            {!form.bundle && form.services.includes('posts') && (
              <div>
                <SectionLabel icon="🎨" title="Diseño de posts" sub="Publicaciones estáticas — mensual" />
                <div className="grid grid-cols-2 gap-3">
                  <PlanCard selected={form.postsPlan === 'starter'}   onClick={() => set('postsPlan','starter')}   title="Starter"
                    badge={isAgent ? 'Ideal para ti' : undefined} features={['Hasta 12 diseños/mes','Presencia constante en redes']} />
                  <PlanCard selected={form.postsPlan === 'estandar'}  onClick={() => set('postsPlan','estandar')}  title="Estándar"
                    features={['13–20 diseños/mes','Marca activa y consistente']} />
                  <PlanCard selected={form.postsPlan === 'premium'}   onClick={() => set('postsPlan','premium')}   title="Premium"
                    features={['21–30 diseños/mes','Para campañas y lanzamientos']} />
                  <PlanCard selected={form.postsPlan === 'intensivo'} onClick={() => set('postsPlan','intensivo')} title="Intensivo"
                    badge={isCompany ? 'Alta producción' : undefined} badgeColor="cyan" features={['+30 diseños/mes','Máxima producción de contenido']} />
                </div>
              </div>
            )}

            {/* Reels — only when NO bundle active */}
            {!form.bundle && form.services.includes('reels') && (
              <div>
                <SectionLabel icon="🎬" title="Reels y video" sub="Producción y edición de video corto — mensual" />
                <div className="grid grid-cols-2 gap-3">
                  <PlanCard selected={form.reelsPlan === 'starter'}   onClick={() => set('reelsPlan','starter')}   title="Starter"
                    badge={isAgent ? 'Para empezar' : undefined} features={['1–4 reels/mes','Ideal para comenzar con video']} />
                  <PlanCard selected={form.reelsPlan === 'estandar'}  onClick={() => set('reelsPlan','estandar')}  title="Estándar"
                    features={['5–8 reels/mes','Presencia sólida en video']} />
                  <PlanCard selected={form.reelsPlan === 'premium'}   onClick={() => set('reelsPlan','premium')}   title="Premium"
                    features={['9–12 reels/mes','Video como motor de contenido']} />
                  <PlanCard selected={form.reelsPlan === 'intensivo'} onClick={() => set('reelsPlan','intensivo')} title="Intensivo"
                    badge={isCompany ? 'Full video' : undefined} badgeColor="cyan" features={['+12 reels/mes','Estrategia 100% en video']} />
                </div>
              </div>
            )}

            {/* Ads */}
            {form.services.includes('ads') && (
              <div>
                <SectionLabel icon="📣" title="Publicidad digital" sub="Elige una o varias plataformas" />
                <div className="flex flex-wrap gap-3">
                  {([
                    { id: 'meta'   as AdsPlat, icon: '📘', label: 'Meta Ads',   sub: 'Facebook + Instagram' },
                    { id: 'google' as AdsPlat, icon: '🔍', label: 'Google Ads', sub: 'Búsqueda y display' },
                    { id: 'tiktok' as AdsPlat, icon: '🎵', label: 'TikTok Ads', sub: 'Video en tendencia' },
                  ] as const).map(p => {
                    const sel = form.adsPlatforms.includes(p.id)
                    return (
                      <button key={p.id} type="button"
                        onClick={() => set('adsPlatforms', toggle(form.adsPlatforms, p.id))}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                          sel ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-[#2a2a3a] bg-[#18181f] text-white/60 hover:border-violet-500/30 hover:text-white/80'
                        }`}
                      >
                        <span className="text-xl">{p.icon}</span>
                        <div className="text-left">
                          <p className="text-sm font-bold leading-tight">{p.label}</p>
                          <p className="text-xs opacity-60 leading-tight">{p.sub}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-white/30 text-xs mt-3">La pauta publicitaria se cotiza aparte según tu presupuesto mensual</p>
              </div>
            )}

            {/* Producción */}
            {form.services.includes('produccion') && (
              <div>
                <SectionLabel icon="📷" title="Foto y video profesional" sub="Sesión completa — precio por proyecto" />
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
                <SectionLabel icon="🚁" title="Tomas con drone" sub="Por proyecto — incluye foto y video aéreo" />
                <InfoCard icon="🚁" title="Vuelo con drone — foto y video" color="violet"
                  features={['Fotografía aérea en alta resolución','Video aéreo 4K editado','Vuelo sobre la propiedad o zona indicada','Derechos de uso comercial incluidos']} />
              </div>
            )}

            {/* Tour 360° */}
            {form.services.includes('tour360') && (
              <div>
                <SectionLabel icon="🔵" title="Recorrido virtual 360°" sub="Por proyecto — tour interactivo navegable" />
                <InfoCard icon="🔵" title="Tour virtual 360° completo" color="cyan"
                  features={['Captura de todos los espacios del inmueble','Tour navegable en web y móvil','Link compartible para clientes y portales','Ideal para ventas y arrendamientos']} />
              </div>
            )}

            {/* Bundle with no add-on project services — prompt to continue */}
            {form.bundle && !form.services.some(s => ['produccion','drone','tour360'].includes(s)) && (
              <p className="text-white/30 text-xs text-center pt-2">¿Necesitas añadir drone, recorrido 360° o producción? Puedes volver al paso anterior.</p>
            )}

          </div>
        )}

        {/* ══ STEP 3: Contacto ══ */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Nombre completo *</label>
              <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                {form.clientType === 'agente' ? 'Nombre comercial / agencia' : form.clientType === 'empresa' ? 'Nombre de la empresa *' : 'Nombre del negocio'}
                {form.clientType === 'agente' && <span className="ml-1 text-white/30 normal-case font-normal">(opcional)</span>}
              </label>
              <input type="text" value={form.empresa} onChange={e => set('empresa', e.target.value)}
                placeholder={form.clientType === 'agente' ? 'Tu agencia o marca personal' : form.clientType === 'empresa' ? 'Nombre de tu empresa' : 'Nombre de tu negocio'}
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

/* ─── Individual services (reusable for agents in custom mode + non-agents) ── */
function IndividualServices({ form, set, isAgent }: {
  form: QuoteForm
  set: <K extends keyof QuoteForm>(key: K, val: QuoteForm[K]) => void
  isAgent: boolean
}) {
  type ServiceKey = 'cm' | 'posts' | 'reels' | 'ads' | 'produccion' | 'drone' | 'tour360'
  const toggleSvc = (id: ServiceKey) =>
    set('services', form.services.includes(id) ? form.services.filter(x => x !== id) : [...form.services, id])

  return (
    <div className="space-y-2">
      {([
        { id: 'cm'        as ServiceKey, icon: '👤', title: 'Community Manager',       sub: 'Gestión diaria de redes sociales',               badge: isAgent ? 'Popular entre agentes' : undefined },
        { id: 'posts'     as ServiceKey, icon: '🎨', title: 'Diseño de posts',          sub: 'Contenido estático y visual para redes',         badge: undefined },
        { id: 'reels'     as ServiceKey, icon: '🎬', title: 'Reels y video',            sub: 'Producción y edición de video corto',            badge: undefined },
        { id: 'ads'       as ServiceKey, icon: '📣', title: 'Publicidad digital',       sub: 'Campañas en Meta, Google o TikTok',              badge: undefined },
        { id: 'produccion'as ServiceKey, icon: '📷', title: 'Foto y video profesional', sub: 'Sesión de alta calidad — por proyecto',          badge: undefined },
        { id: 'drone'     as ServiceKey, icon: '🚁', title: 'Tomas con drone',          sub: 'Fotografía y video aéreo — por proyecto',       badge: undefined },
        { id: 'tour360'   as ServiceKey, icon: '🔵', title: 'Recorrido virtual 360°',  sub: 'Tour interactivo navegable — por proyecto',     badge: undefined },
      ] as const).map(svc => {
        const sel = form.services.includes(svc.id)
        return (
          <button key={svc.id} type="button" onClick={() => toggleSvc(svc.id)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              sel ? 'border-violet-500 bg-violet-500/10' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'
            }`}
          >
            <span className="text-xl shrink-0">{svc.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-white text-sm">{svc.title}</p>
                {svc.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">{svc.badge}</span>}
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
      <p className="text-white/30 text-xs text-center pt-1">Puedes combinar varios servicios</p>
    </div>
  )
}
