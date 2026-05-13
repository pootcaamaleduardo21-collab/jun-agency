'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

/* ─── Catálogo completo de precios ────────────────────────────────────── */
const SERVICES = {
  cm: {
    icon: '👤', label: 'Community Manager', type: 'mensual' as const,
    plans: {
      basico:   { name: 'Plan Básico',   desc: '1–2 redes · gestión básica · comentarios',        price: 1500 },
      estandar: { name: 'Plan Estándar', desc: '3 redes · gestión completa · DMs',                price: 2500 },
      pro:      { name: 'Plan Pro',      desc: '4+ redes · DMs · estrategia avanzada · reportes', price: 3000 },
    },
  },
  posts: {
    icon: '🎨', label: 'Diseño de Posts', type: 'mensual' as const,
    plans: {
      starter:   { name: 'Starter',   desc: 'hasta 12 diseños/mes · presencia básica',      price: 1600 },
      estandar:  { name: 'Estándar',  desc: '13–20 diseños/mes · marca activa',             price: 2500 },
      premium:   { name: 'Premium',   desc: '21–30 diseños/mes · campañas y lanzamientos',  price: 3500 },
      intensivo: { name: 'Intensivo', desc: '+30 diseños/mes · máxima producción',          price: 4500 },
    },
  },
  reels: {
    icon: '🎬', label: 'Reels y Video', type: 'mensual' as const,
    plans: {
      starter:   { name: 'Starter',   desc: '1–4 reels/mes · para empezar con video',      price: 1600 },
      estandar:  { name: 'Estándar',  desc: '5–8 reels/mes · presencia sólida en video',   price: 2500 },
      premium:   { name: 'Premium',   desc: '9–12 reels/mes · video como motor',            price: 3500 },
      intensivo: { name: 'Intensivo', desc: '+12 reels/mes · estrategia 100% video',       price: 4500 },
    },
  },
  ads: {
    icon: '📣', label: 'Publicidad Digital', type: 'mensual' as const,
    plans: {
      meta:   { name: 'Meta Ads',   desc: 'Facebook + Instagram · fee de gestión · pauta aparte', price: 1500 },
      google: { name: 'Google Ads', desc: 'Búsqueda + Display · fee de gestión · pauta aparte',   price: 1500 },
      tiktok: { name: 'TikTok Ads', desc: 'Video ads · fee de gestión · pauta aparte',            price: 1200 },
    },
  },
  produccion: {
    icon: '📷', label: 'Foto y Video Profesional', type: 'proyecto' as const,
    plans: {
      foto:  { name: 'Fotografía',    desc: 'Sesión completa · edición · entregables HR',              price: 3500 },
      video: { name: 'Video / Reel',  desc: 'Producción + edición · formatos multiplataforma',         price: 4500 },
      pack:  { name: 'Pack completo', desc: 'Foto + video en una sesión · todo incluido · mejor valor', price: 7500 },
    },
  },
  drone: {
    icon: '🚁', label: 'Tomas con Drone', type: 'proyecto' as const,
    plans: {
      standard: { name: 'Vuelo estándar', desc: 'Foto aérea HR + video 4K · derechos de uso incluidos', price: 4000 },
    },
  },
  tour360: {
    icon: '🔵', label: 'Recorrido Virtual 360°', type: 'proyecto' as const,
    plans: {
      completo: { name: 'Tour completo', desc: 'Captura completa · link navegable web + móvil · compartible', price: 5500 },
    },
  },
} as const

/* ─── Bundle catalog (for pricing reference table) ───────────────────── */
const BUNDLES_REF = {
  esencial: { name: 'Plan Esencial',  desc: '4 posts + 2 reels/mes · sin levantamiento de contenido',                         price: 2500 },
  activo:   { name: 'Plan Activo',    desc: 'CM Básico + 8 posts + 5 reels/mes · con levantamiento mensual',                  price: 4500 },
  pro:      { name: 'Plan Pro',       desc: 'CM Estándar + 12 posts + 6 reels/mes · con levantamiento + reporte de métricas', price: 6000 },
}

type ServiceKey = keyof typeof SERVICES
type PriceAdjustments = Record<string, number>
type ScopeAdjustments = Record<string, string>
type LineItemType = 'mensual' | 'proyecto'

interface CustomItem {
  id: string
  label: string
  description: string
  price: number
  type: LineItemType
}

interface ManualQuoteFormState {
  clientType: string
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  notas: string
  adminNote: string
}

/* ─── Types ──────────────────────────────────────────────────────────── */
interface QuoteData {
  id?: string
  q?: string
  clientType: string
  bundle?: string
  services: ServiceKey[]
  cmPlan: string
  postsPlan: string
  reelsPlan: string
  adsPlatforms: string[]
  produccionPlan: string
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  notas: string
  status?: string
  adminNote?: string
  lines?: Record<string, string[]>
  discount?: number
  priceAdjustments?: PriceAdjustments
  scopeAdjustments?: ScopeAdjustments
  customItems?: CustomItem[]
  source?: string
  estimate?: { min: number; max: number; type: string }
  submittedAt?: string
  updatedAt?: string
  sentAt?: string
  lastSentAt?: string
  history?: HistoryEvent[]
}

interface HistoryEvent {
  at: string
  action: string
  label: string
  details?: Record<string, unknown>
}

const CLIENT_TYPE_LABELS: Record<string, string> = {
  agente: 'Agente / asesor independiente',
  empresa: 'Empresa o marca',
  emprendimiento: 'Negocio o emprendimiento',
}

const STATUS_OPTIONS = [
  { key: 'pending',   label: 'Pendiente',         color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { key: 'contacted', label: 'Contactado',         color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { key: 'sent',      label: 'Propuesta enviada',  color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { key: 'closed',    label: 'Cerrado / Ganado',   color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { key: 'lost',      label: 'No interesado',      color: 'bg-red-500/20 text-red-300 border-red-500/30' },
]

const EMPTY_MANUAL_FORM: ManualQuoteFormState = {
  clientType: 'empresa',
  nombre: '',
  empresa: '',
  whatsapp: '',
  email: '',
  notas: '',
  adminNote: '',
}

/* ─── Helpers ────────────────────────────────────────────────────────── */
function getInitialLines(quote: QuoteData): Record<string, string[]> {
  const r: Record<string, string[]> = {}
  if (quote.bundle && BUNDLES_REF[quote.bundle as keyof typeof BUNDLES_REF]) {
    r.bundle = [quote.bundle]
  } else {
    if (quote.services.includes('cm')    && quote.cmPlan)    r.cm    = [quote.cmPlan]
    if (quote.services.includes('posts') && quote.postsPlan) r.posts = [quote.postsPlan]
    if (quote.services.includes('reels') && quote.reelsPlan) r.reels = [quote.reelsPlan]
  }
  if (quote.services.includes('ads')        && quote.adsPlatforms?.length) r.ads        = [...quote.adsPlatforms]
  if (quote.services.includes('produccion') && quote.produccionPlan)       r.produccion = [quote.produccionPlan]
  if (quote.services.includes('drone'))                                     r.drone      = ['standard']
  if (quote.services.includes('tour360'))                                   r.tour360    = ['completo']
  return r
}

function getLineId(serviceKey: string, planKey: string) {
  return `${serviceKey}:${planKey}`
}

function getProposalItems(
  lines: Record<string, string[]>,
  priceAdjustments: PriceAdjustments = {},
  customItems: CustomItem[] = [],
  scopeAdjustments: ScopeAdjustments = {}
) {
  const items: Array<{ id: string; service: string; plan: string; desc: string; price: number; basePrice: number; type: LineItemType }> = []

  for (const [svcKey, planKeys] of Object.entries(lines)) {
    if (svcKey === 'bundle') {
      const b = BUNDLES_REF[planKeys[0] as keyof typeof BUNDLES_REF]
      const id = getLineId(svcKey, planKeys[0])
      if (b) items.push({ id, service: 'Plan mensual', plan: b.name, desc: scopeAdjustments[id] ?? b.desc, price: priceAdjustments[id] ?? b.price, basePrice: b.price, type: 'mensual' })
      continue
    }

    const svc = SERVICES[svcKey as ServiceKey]
    if (!svc) continue
    const plans = svc.plans as Record<string, { name: string; desc: string; price: number }>
    for (const pk of planKeys) {
      const plan = plans[pk]
      const id = getLineId(svcKey, pk)
      if (plan) {
        items.push({
          id,
          service: svc.label,
          plan: plan.name,
          desc: scopeAdjustments[id] ?? plan.desc,
          price: priceAdjustments[id] ?? plan.price,
          basePrice: plan.price,
          type: svc.type,
        })
      }
    }
  }

  return [
    ...items,
    ...customItems.filter(item => item.label).map(item => ({
      id: item.id,
      service: 'Extra personalizado',
      plan: item.label,
      desc: scopeAdjustments[item.id] ?? (item.description || 'Ajuste agregado manualmente'),
      price: priceAdjustments[item.id] ?? (Number(item.price) || 0),
      basePrice: Number(item.price) || 0,
      type: item.type,
    })),
  ]
}

function computeTotal(lines: Record<string, string[]>, priceAdjustments: PriceAdjustments = {}, customItems: CustomItem[] = []) {
  const items = getProposalItems(lines, priceAdjustments, customItems)
  let mensual = 0, proyecto = 0
  for (const item of items) {
    if (item.type === 'mensual') mensual += item.price
    else proyecto += item.price
  }
  return { mensual, proyecto, total: mensual + proyecto }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-MX') + ' MXN'
}

function formatDateTime(iso?: string) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

/* ─── PIN Screen ─────────────────────────────────────────────────────── */
function PINScreen({ pin, setPin, onSubmit, error }: {
  pin: string; setPin: (v: string) => void; onSubmit: () => void; error: boolean
}) {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <p className="text-white font-black text-3xl tracking-tight mb-1">jún</p>
          <p className="text-white/40 text-sm">Panel interno</p>
        </div>
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-6">
          <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wide">PIN de acceso</label>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
            placeholder="••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/20 text-sm focus:outline-none focus:border-violet-500 transition mb-3"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs mb-3">PIN incorrecto</p>}
          <button
            onClick={onSubmit}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-sm"
          >
            Entrar →
          </button>
        </div>
        <p className="text-center text-white/20 text-xs mt-4">
          PIN por defecto: <span className="text-white/40">jun2026</span>
          <br />Configúralo en <code className="text-white/30">NEXT_PUBLIC_ADMIN_PIN</code>
        </p>
      </div>
    </div>
  )
}

/* ─── Quotes List ────────────────────────────────────────────────────── */
function QuotesList({ onSelect }: { onSelect: (q: QuoteData) => void }) {
  const [quotes, setQuotes]     = useState<QuoteData[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')

  useEffect(() => {
    fetch('/api/quotes')
      .then(r => r.json())
      .then(data => { setQuotes(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter)

  const timeAgo = (iso?: string) => {
    if (!iso) return ''
    const diff = Date.now() - new Date(iso).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `hace ${m}m`
    const h = Math.floor(m / 60)
    if (h < 24) return `hace ${h}h`
    return `hace ${Math.floor(h / 24)}d`
  }

  const statusColor = (s?: string) => STATUS_OPTIONS.find(o => o.key === s)?.color
    ?? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  const statusLabel = (s?: string) => STATUS_OPTIONS.find(o => o.key === s)?.label ?? 'Pendiente'

  if (loading) return <p className="text-white/30 text-sm text-center py-12">Cargando cotizaciones…</p>
  if (!quotes.length) return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-white/40 text-sm">Aún no hay cotizaciones guardadas.</p>
      <p className="text-white/20 text-xs mt-1">Aparecerán aquí cuando los clientes llenen el formulario.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {([{ key: 'all', label: 'Todas' }, ...STATUS_OPTIONS] as { key: string; label: string }[]).map(opt => (
          <button key={opt.key} onClick={() => setFilter(opt.key)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              filter === opt.key ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' : 'text-white/30 border-white/10 hover:border-white/20'
            }`}>
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-white/30 text-sm text-center py-8">Sin cotizaciones con este estado.</p>
      )}

      {filtered.map(q => (
        <button key={q.id} onClick={() => onSelect(q)}
          className="w-full text-left bg-[#111118] border border-[#2a2a3a] rounded-2xl p-4 hover:border-violet-500/40 transition-all">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="text-white font-bold text-sm truncate">{q.nombre}</p>
                {q.empresa && <p className="text-white/40 text-xs truncate">· {q.empresa}</p>}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(q.status)}`}>
                  {statusLabel(q.status)}
                </span>
                {q.source === 'manual' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                    Manual
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                <p className="text-white/40 text-xs">{q.email}</p>
                <p className="text-white/40 text-xs">{q.whatsapp}</p>
              </div>
              {q.bundle ? (
                <p className="text-violet-300 text-xs mt-1.5">📦 {BUNDLES_REF[q.bundle as keyof typeof BUNDLES_REF]?.name ?? q.bundle}</p>
              ) : (
                <p className="text-white/30 text-xs mt-1.5 truncate">
                  {(q.services ?? []).length ? (q.services ?? []).map(s => serviceShortLabel[s] ?? s).join(' · ') : 'Cotización manual'}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              {q.estimate && (
                <p className="text-white font-bold text-sm">${q.estimate.min.toLocaleString('es-MX')} MXN</p>
              )}
              <p className="text-white/30 text-xs mt-0.5">{timeAgo(q.submittedAt)}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

const serviceShortLabel: Record<string, string> = {
  cm: 'CM', posts: 'Posts', reels: 'Reels', ads: 'Ads',
  produccion: 'Foto/Video', drone: 'Drone', tour360: '360°',
}

/* ─── Pricing Reference Table ────────────────────────────────────────── */
function PricingTable() {
  return (
    <div className="space-y-6">

      {/* Bundles */}
      <div className="bg-[#111118] border border-violet-500/30 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a3a]">
          <div className="flex items-center gap-2">
            <span>📦</span>
            <span className="text-white font-bold text-sm">Planes mensuales (independientes)</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-violet-500/20 text-violet-300 border-violet-500/30">Mensual</span>
        </div>
        <div className="divide-y divide-[#1e1e2a]">
          {Object.entries(BUNDLES_REF).map(([, b]) => (
            <div key={b.name} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-white text-sm font-semibold">{b.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{b.desc}</p>
              </div>
              <p className="text-white font-bold text-sm shrink-0 ml-4">{fmt(b.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {(Object.entries(SERVICES) as [ServiceKey, typeof SERVICES[ServiceKey]][]).map(([key, svc]) => (
        <div key={key} className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-2">
              <span>{svc.icon}</span>
              <span className="text-white font-bold text-sm">{svc.label}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              svc.type === 'mensual'
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
            }`}>
              {svc.type === 'mensual' ? 'Mensual' : 'Por proyecto'}
            </span>
          </div>
          <div className="divide-y divide-[#1e1e2a]">
            {(Object.entries(svc.plans) as [string, { name: string; desc: string; price: number }][]).map(([pk, plan]) => (
              <div key={pk} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-white text-sm font-semibold">{plan.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{plan.desc}</p>
                </div>
                <p className="text-white font-bold text-sm shrink-0 ml-4">{fmt(plan.price)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Service Row (in proposal builder) ─────────────────────────────── */
function ServiceRow({
  svcKey, lines, onChange,
}: {
  svcKey: ServiceKey
  lines: Record<string, string[]>
  onChange: (updated: Record<string, string[]>) => void
}) {
  const svc = SERVICES[svcKey]
  const active = !!lines[svcKey]
  const selected = lines[svcKey] || []
  const isMulti  = svcKey === 'ads'

  const toggle = () => {
    const next = { ...lines }
    if (active) {
      delete next[svcKey]
    } else {
      const firstKey = Object.keys(svc.plans)[0]
      next[svcKey] = [firstKey]
    }
    onChange(next)
  }

  const selectPlan = (pk: string) => {
    if (!active) return
    const next = { ...lines }
    if (isMulti) {
      const cur = next[svcKey] || []
      next[svcKey] = cur.includes(pk) ? cur.filter(x => x !== pk) : [...cur, pk]
      if (next[svcKey].length === 0) delete next[svcKey]
    } else {
      next[svcKey] = [pk]
    }
    onChange(next)
  }

  const plans = svc.plans as Record<string, { name: string; desc: string; price: number }>

  // Calculate subtotal for this service
  let subtotal = 0
  if (active) {
    for (const pk of selected) {
      subtotal += plans[pk]?.price || 0
    }
  }

  return (
    <div className={`rounded-2xl border transition-all ${
      active ? 'border-violet-500/40 bg-[#111118]' : 'border-[#2a2a3a] bg-[#0d0d12] opacity-60'
    }`}>
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={toggle}
          className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            active ? 'border-violet-500 bg-violet-500' : 'border-white/20 hover:border-white/40'
          }`}
        >
          {active && <span className="text-white text-xs font-bold">✓</span>}
        </button>
        <span className="text-base">{svc.icon}</span>
        <p className="text-white font-bold text-sm flex-1">{svc.label}</p>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          svc.type === 'mensual'
            ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
            : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
        }`}>
          {svc.type === 'mensual' ? '/mes' : 'proyecto'}
        </span>
        {active && (
          <p className="text-white font-bold text-sm shrink-0 ml-2">
            {fmt(subtotal)}
          </p>
        )}
      </div>

      {/* Plan selector */}
      {active && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {Object.entries(plans).map(([pk, plan]) => {
            const sel = selected.includes(pk)
            return (
              <button
                key={pk}
                type="button"
                onClick={() => selectPlan(pk)}
                className={`text-left px-3 py-2 rounded-xl border transition-all text-xs ${
                  sel
                    ? 'border-violet-500 bg-violet-500/15 text-white'
                    : 'border-[#2a2a3a] bg-[#18181f] text-white/50 hover:border-violet-500/30 hover:text-white/80'
                }`}
              >
                <p className="font-bold">{plan.name}</p>
                <p className="opacity-60 mt-0.5">{fmt(plan.price)}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CustomItemsEditor({
  customItems, onChange,
}: {
  customItems: CustomItem[]
  onChange: (items: CustomItem[]) => void
}) {
  const addItem = () => {
    onChange([
      ...customItems,
      { id: crypto.randomUUID(), label: '', description: '', price: 0, type: 'proyecto' },
    ])
  }

  const updateItem = (id: string, patch: Partial<CustomItem>) => {
    onChange(customItems.map(item => item.id === id ? { ...item, ...patch } : item))
  }

  const removeItem = (id: string) => {
    onChange(customItems.filter(item => item.id !== id))
  }

  return (
    <div className="rounded-2xl border border-[#2a2a3a] bg-[#111118] p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-white font-bold text-sm">Extras y ajustes personalizados</p>
          <p className="text-white/35 text-xs mt-0.5">Agrega viáticos, urgencias, producción especial o partidas a medida.</p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="shrink-0 px-3 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition"
        >
          + Extra
        </button>
      </div>

      {customItems.length === 0 && (
        <p className="text-white/25 text-xs">Sin extras personalizados.</p>
      )}

      {customItems.map(item => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <input
            value={item.label}
            onChange={e => updateItem(item.id, { label: e.target.value })}
            placeholder="Concepto"
            className="md:col-span-3 px-3 py-2 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/20 text-xs focus:outline-none focus:border-violet-500"
          />
          <input
            value={item.description}
            onChange={e => updateItem(item.id, { description: e.target.value })}
            placeholder="Descripción"
            className="md:col-span-4 px-3 py-2 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/20 text-xs focus:outline-none focus:border-violet-500"
          />
          <select
            value={item.type}
            onChange={e => updateItem(item.id, { type: e.target.value as LineItemType })}
            className="md:col-span-2 px-3 py-2 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-xs focus:outline-none focus:border-violet-500"
          >
            <option value="proyecto">Proyecto</option>
            <option value="mensual">Mensual</option>
          </select>
          <input
            type="number"
            value={item.price || ''}
            onChange={e => updateItem(item.id, { price: Number(e.target.value) || 0 })}
            placeholder="Precio"
            className="md:col-span-2 px-3 py-2 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/20 text-xs focus:outline-none focus:border-violet-500"
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="md:col-span-1 px-3 py-2 rounded-xl border border-red-500/25 text-red-300 text-xs hover:bg-red-500/10 transition"
          >
            Borrar
          </button>
        </div>
      ))}
    </div>
  )
}

function ProposalSummary({
  lines, priceAdjustments, setPriceAdjustments, scopeAdjustments, setScopeAdjustments, customItems, setCustomItems, discount, setDiscount,
}: {
  lines: Record<string, string[]>
  priceAdjustments: PriceAdjustments
  setPriceAdjustments: (v: PriceAdjustments) => void
  scopeAdjustments: ScopeAdjustments
  setScopeAdjustments: (v: ScopeAdjustments) => void
  customItems: CustomItem[]
  setCustomItems: (v: CustomItem[]) => void
  discount: number
  setDiscount: (v: number) => void
}) {
  const items = getProposalItems(lines, priceAdjustments, customItems, scopeAdjustments)
  const { mensual, proyecto, total } = computeTotal(lines, priceAdjustments, customItems)
  const discounted = Math.max(0, total - discount)

  const setPrice = (id: string, value: number) => {
    setPriceAdjustments({ ...priceAdjustments, [id]: value })
  }

  const setScope = (id: string, value: string) => {
    setScopeAdjustments({ ...scopeAdjustments, [id]: value })
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a3a]">
          <p className="text-white font-bold text-sm">Preview editable</p>
          <p className="text-white/35 text-xs mt-0.5">Ajusta precio y describe exactamente qué se entregará.</p>
        </div>
        <div className="p-5 space-y-3">
          {items.map(item => (
            <div key={item.id} className="rounded-xl border border-[#2a2a3a] bg-[#18181f]/70 p-3 space-y-2">
              <div className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-7">
                  <p className="text-white/85 text-xs font-semibold">{item.service}</p>
                  <p className="text-white/45 text-[11px]">{item.plan}</p>
                  <p className="text-white/25 text-[11px] mt-0.5">{item.type === 'mensual' ? 'Mensual' : 'Por proyecto'}</p>
                </div>
                <div className="col-span-5 flex items-center gap-1">
                  <span className="text-white/25 text-xs">$</span>
                  <input
                    type="number"
                    value={item.price || ''}
                    onChange={e => setPrice(item.id, Number(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded-lg bg-[#0d0d12] border border-[#2a2a3a] text-white text-xs text-right focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
              <label className="block text-white/30 text-[10px] uppercase tracking-wide">Qué incluye / entregables</label>
              <textarea
                value={item.desc}
                onChange={e => setScope(item.id, e.target.value)}
                rows={3}
                placeholder="Ej. Fotografía y video profesional, 4 reels editados y videos para pauta."
                className="w-full px-3 py-2 rounded-lg bg-[#0d0d12] border border-[#2a2a3a] text-white/80 placeholder-white/20 text-xs leading-relaxed focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-white/30 text-xs text-center py-4">Activa servicios o agrega extras para ver el desglose.</p>
          )}

          {(mensual > 0 || proyecto > 0) && (
            <>
              <div className="border-t border-[#2a2a3a] pt-3 mt-3 space-y-1.5">
                {mensual > 0 && (
                  <div className="flex justify-between">
                    <p className="text-white/50 text-xs">Subtotal mensual</p>
                    <p className="text-white/70 text-xs font-semibold">{fmt(mensual)}</p>
                  </div>
                )}
                {proyecto > 0 && (
                  <div className="flex justify-between">
                    <p className="text-white/50 text-xs">Subtotal por proyecto</p>
                    <p className="text-white/70 text-xs font-semibold">{fmt(proyecto)}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="text-white/40 text-xs shrink-0">Descuento:</label>
                <input
                  type="number"
                  value={discount || ''}
                  onChange={e => setDiscount(Number(e.target.value) || 0)}
                  placeholder="0"
                  className="flex-1 px-2 py-1 rounded-lg bg-[#18181f] border border-[#2a2a3a] text-white text-xs focus:outline-none focus:border-violet-500 transition"
                />
                <span className="text-white/30 text-xs">MXN</span>
              </div>

              <div className="border-t border-[#2a2a3a] pt-3 mt-1">
                <div className="flex justify-between items-end">
                  <p className="text-white font-bold text-sm">Total propuesta</p>
                  <div className="text-right">
                    {discount > 0 && <p className="text-white/30 text-xs line-through">{fmt(total)}</p>}
                    <p className="text-violet-300 font-black text-lg">{fmt(discounted)}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <CustomItemsEditor customItems={customItems} onChange={setCustomItems} />
    </div>
  )
}

function PrintableProposal({
  quote, lines, priceAdjustments, scopeAdjustments, customItems, discount,
}: {
  quote: QuoteData
  lines: Record<string, string[]>
  priceAdjustments: PriceAdjustments
  scopeAdjustments: ScopeAdjustments
  customItems: CustomItem[]
  discount: number
}) {
  const items = getProposalItems(lines, priceAdjustments, customItems, scopeAdjustments)
  const { mensual, proyecto, total } = computeTotal(lines, priceAdjustments, customItems)
  const finalTotal = Math.max(0, total - discount)

  return (
    <div className="hidden print:block bg-white text-gray-900 min-h-screen p-10">
      <div className="flex items-start justify-between border-b border-gray-200 pb-6">
        <div>
          <p className="text-4xl font-black tracking-tight">jún</p>
          <p className="text-xs uppercase tracking-[0.25em] text-violet-600 mt-1">Propuesta comercial</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>{formatDateTime(new Date().toISOString())}</p>
          {quote.id && <p className="mt-1">ID: {quote.id.slice(0, 8)}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 py-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">Cliente</p>
          <p className="text-xl font-black">{quote.nombre}</p>
          {quote.empresa && <p className="text-gray-600 mt-1">{quote.empresa}</p>}
          <p className="text-gray-500 mt-3">{quote.email}</p>
          <p className="text-gray-500">{quote.whatsapp}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">Resumen</p>
          <p className="text-gray-700 leading-relaxed">
            Propuesta preparada con los servicios seleccionados y ajustes acordados para el proyecto.
          </p>
          {quote.notas && <p className="text-gray-500 text-sm mt-3">{quote.notas}</p>}
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y border-gray-200">
            <th className="text-left py-3 text-xs uppercase tracking-wide text-gray-400">Servicio</th>
            <th className="text-left py-3 text-xs uppercase tracking-wide text-gray-400">Tipo</th>
            <th className="text-right py-3 text-xs uppercase tracking-wide text-gray-400">Importe</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-4 pr-6">
                <p className="font-bold text-gray-900">{item.service} - {item.plan}</p>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </td>
              <td className="py-4 text-sm text-gray-500">{item.type === 'mensual' ? 'Mensual' : 'Por proyecto'}</td>
              <td className="py-4 text-right font-bold">{fmt(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 ml-auto w-80 space-y-2">
        {mensual > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal mensual</span><span className="font-bold">{fmt(mensual)}</span></div>}
        {proyecto > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal proyecto</span><span className="font-bold">{fmt(proyecto)}</span></div>}
        {discount > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Descuento</span><span className="font-bold">-{fmt(discount)}</span></div>}
        <div className="flex justify-between border-t border-gray-200 pt-3 text-xl">
          <span className="font-black">Total</span>
          <span className="font-black text-violet-700">{fmt(finalTotal)}</span>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
        <p>La pauta publicitaria, gastos externos o entregables fuera del alcance se cotizan por separado salvo que estén incluidos explícitamente.</p>
        <p className="mt-2">JUN Marketing Digital · Riviera Maya, México · informesjunmkt@gmail.com</p>
      </div>
    </div>
  )
}

function ManualQuoteCreator({ onCreated, onCancel }: {
  onCreated: (quote: QuoteData) => void
  onCancel: () => void
}) {
  const [client, setClient] = useState<ManualQuoteFormState>(EMPTY_MANUAL_FORM)
  const [lines, setLines] = useState<Record<string, string[]>>({})
  const [priceAdjustments, setPriceAdjustments] = useState<PriceAdjustments>({})
  const [scopeAdjustments, setScopeAdjustments] = useState<ScopeAdjustments>({})
  const [customItems, setCustomItems] = useState<CustomItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateClient = <K extends keyof ManualQuoteFormState>(key: K, value: ManualQuoteFormState[K]) => {
    setClient(prev => ({ ...prev, [key]: value }))
  }

  const createQuote = async () => {
    setError('')
    if (!client.nombre.trim()) {
      setError('Agrega al menos el nombre del cliente.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', quote: client, lines, priceAdjustments, scopeAdjustments, customItems, discount }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No se pudo crear la cotización')
      onCreated(data.quote)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la cotización')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111118] border border-violet-500/30 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-white font-black text-xl">Nueva cotización manual</p>
            <p className="text-white/45 text-sm mt-1">Captura el cliente, arma la propuesta y guárdala en el historial.</p>
          </div>
          <button onClick={onCancel} className="text-white/40 text-sm hover:text-white transition">Cancelar</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Nombre *</label>
            <input value={client.nombre} onChange={e => updateClient('nombre', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Empresa</label>
            <input value={client.empresa} onChange={e => updateClient('empresa', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">WhatsApp</label>
            <input value={client.whatsapp} onChange={e => updateClient('whatsapp', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Email</label>
            <input type="email" value={client.email} onChange={e => updateClient('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Tipo de cliente</label>
            <select value={client.clientType} onChange={e => updateClient('clientType', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="empresa">Empresa o marca</option>
              <option value="agente">Agente / independiente</option>
              <option value="emprendimiento">Negocio o emprendimiento</option>
            </select>
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Notas internas</label>
            <input value={client.adminNote} onChange={e => updateClient('adminNote', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/40 text-xs uppercase tracking-wide mb-1.5">Notas para contexto</label>
            <textarea value={client.notas} onChange={e => updateClient('notas', e.target.value)} rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-violet-500 resize-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <p className="text-white font-bold">Servicios y planes</p>
          <div className="rounded-2xl border border-violet-500/40 bg-[#111118] px-4 py-3">
            <p className="text-white font-semibold text-sm mb-3">Planes mensuales para independientes</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.entries(BUNDLES_REF) as [keyof typeof BUNDLES_REF, typeof BUNDLES_REF[keyof typeof BUNDLES_REF]][]).map(([key, b]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLines(prev => prev.bundle?.[0] === key ? (() => { const next = { ...prev }; delete next.bundle; return next })() : { ...prev, bundle: [key] })}
                  className={`text-left p-3 rounded-xl border transition-all ${lines.bundle?.[0] === key ? 'border-violet-500 bg-violet-500/15' : 'border-[#2a2a3a] bg-[#18181f] hover:border-violet-500/30'}`}
                >
                  <p className="text-white text-xs font-bold">{b.name}</p>
                  <p className="text-white/35 text-[11px] mt-1">{fmt(b.price)}</p>
                </button>
              ))}
            </div>
          </div>
          {(Object.keys(SERVICES) as ServiceKey[]).map(key => (
            <ServiceRow key={key} svcKey={key} lines={lines} onChange={setLines} />
          ))}
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-4">
            <ProposalSummary
              lines={lines}
              priceAdjustments={priceAdjustments}
              setPriceAdjustments={setPriceAdjustments}
              scopeAdjustments={scopeAdjustments}
              setScopeAdjustments={setScopeAdjustments}
              customItems={customItems}
              setCustomItems={setCustomItems}
              discount={discount}
              setDiscount={setDiscount}
            />
            {error && <p className="text-red-300 text-xs">{error}</p>}
            <button
              onClick={createQuote}
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-sm disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar en historial'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Inner Component (needs useSearchParams) ───────────────────────── */
function AdminInner() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const [authenticated, setAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [decodeError, setDecodeError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [creatingManual, setCreatingManual] = useState(false)

  // Proposal state
  const [lines, setLines]           = useState<Record<string, string[]>>({})
  const [priceAdjustments, setPriceAdjustments] = useState<PriceAdjustments>({})
  const [scopeAdjustments, setScopeAdjustments] = useState<ScopeAdjustments>({})
  const [customItems, setCustomItems] = useState<CustomItem[]>([])
  const [adminNote, setAdminNote]   = useState('')
  const [status, setStatus]         = useState('pending')
  const [discount, setDiscount]     = useState(0)
  const [showPricing, setShowPricing] = useState(false)
  const [copied, setCopied]         = useState(false)
  const [sending, setSending]       = useState(false)
  const [sendMessage, setSendMessage] = useState('')

  // Check session auth on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('jun_admin') === 'ok') setAuthenticated(true)
    }
  }, [])

  // Load quote from ?q= or ?id= param
  useEffect(() => {
    if (!authenticated) return
    const id = searchParams.get('id')
    const q  = searchParams.get('q')

    if (id) {
      // Load from Redis by ID (includes saved status/lines/notes)
      fetch(`/api/quotes?id=${id}`)
        .then(r => r.json())
        .then((data: QuoteData) => {
          if (!data || !data.nombre) return
          setQuote(data)
          setStatus(data.status || 'pending')
          setAdminNote(data.adminNote || '')
          setDiscount(data.discount || 0)
          setPriceAdjustments(data.priceAdjustments || {})
          setScopeAdjustments(data.scopeAdjustments || {})
          setCustomItems(data.customItems || [])
          setLines(data.lines ? data.lines : getInitialLines(data))
        })
        .catch(() => setDecodeError(true))
    } else if (q) {
      try {
        const data = JSON.parse(atob(decodeURIComponent(q))) as QuoteData
        setQuote(data)
        setPriceAdjustments(data.priceAdjustments || {})
        setScopeAdjustments(data.scopeAdjustments || {})
        setCustomItems(data.customItems || [])
        setLines(getInitialLines(data))
      } catch {
        setDecodeError(true)
      }
    } else {
      setQuote(null)
      setLines({})
      setPriceAdjustments({})
      setScopeAdjustments({})
      setCustomItems([])
      setAdminNote('')
      setDiscount(0)
    }
  }, [searchParams, authenticated])

  // Persist changes to Redis
  const saveToDb = useCallback(async (patch: Record<string, unknown>) => {
    const id = searchParams.get('id') ?? quote?.id
    if (!id) return
    setSaving(true)
    try {
      const res = await fetch('/api/quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
      const data = await res.json()
      if (data?.quote) setQuote(data.quote)
    } finally {
      setSaving(false)
    }
  }, [searchParams, quote?.id])

  const handleStatusChange = (s: string) => {
    setStatus(s)
    saveToDb({ status: s })
  }

  // Auto-save lines, notes, discount on change (debounced)
  useEffect(() => {
    if (!quote) return
    const t = setTimeout(() => saveToDb({ lines, adminNote, discount, priceAdjustments, scopeAdjustments, customItems }), 1000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, adminNote, discount, priceAdjustments, scopeAdjustments, customItems])

  const handlePin = () => {
    const correct = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ADMIN_PIN) || 'jun2026'
    if (pin === correct) {
      sessionStorage.setItem('jun_admin', 'ok')
      setAuthenticated(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  if (!authenticated) {
    return <PINScreen pin={pin} setPin={setPin} onSubmit={handlePin} error={pinError} />
  }

  const currentStatus = STATUS_OPTIONS.find(s => s.key === status) ?? STATUS_OPTIONS[0]

  const openDoc = (type: 'contrato' | 'bienvenida') => {
    const qParam = searchParams.get('q') || ''
    const linesEncoded = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(lines)))))
    window.open(`/admin/${type}?q=${qParam}&p=${linesEncoded}`, '_blank')
  }

  const copyWA = () => {
    if (!quote) return
    const waText = `Hola ${quote.nombre.split(' ')[0]}, gracias por tu solicitud. Preparé una propuesta para ti con los servicios que seleccionaste. ¿Cuándo podemos hablar para revisarla juntos?`
    navigator.clipboard.writeText(waText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendProposal = async () => {
    if (!quote?.id) return
    setSending(true)
    setSendMessage('')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: quote.id, lines, discount, priceAdjustments, scopeAdjustments, customItems }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No se pudo enviar')
      if (data?.quote) {
        setQuote(data.quote)
        setStatus(data.quote.status || 'sent')
        setLines(data.quote.lines || lines)
        setPriceAdjustments(data.quote.priceAdjustments || priceAdjustments)
        setScopeAdjustments(data.quote.scopeAdjustments || scopeAdjustments)
        setCustomItems(data.quote.customItems || customItems)
        setDiscount(data.quote.discount || 0)
      } else {
        setStatus('sent')
      }
      setSendMessage(`Enviada a ${quote.email}`)
    } catch (err) {
      setSendMessage(err instanceof Error ? err.message : 'No se pudo enviar la cotización')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] print:bg-white">

      {/* Nav */}
      <div className="border-b border-white/5 px-4 py-4 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white font-black text-xl">jún</Link>
            <span className="text-white/20">/</span>
            {quote ? (
              <button onClick={() => router.push('/admin')} className="text-white/50 text-sm hover:text-white transition">
                ← Lista
              </button>
            ) : (
              <span className="text-white/50 text-sm">Cotizaciones</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!quote && (
              <button
                onClick={() => setCreatingManual(true)}
                className="px-3 py-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold hover:bg-violet-500/25 transition"
              >
                + Nueva cotización
              </button>
            )}
            <button
              onClick={() => setShowPricing(s => !s)}
              className="px-3 py-2 rounded-xl border border-[#2a2a3a] text-white/60 text-xs font-semibold hover:text-white hover:border-white/20 transition"
            >
              {showPricing ? '↑ Ocultar precios' : '📊 Tabla de precios'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl border border-[#2a2a3a] text-white/60 text-xs font-semibold hover:text-white hover:border-white/20 transition"
            >
              🖨️ PDF / Imprimir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {decodeError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            No se pudo leer el código de cotización. Verifica que el link esté completo.
          </div>
        )}

        {creatingManual && !quote ? (
          <ManualQuoteCreator
            onCancel={() => setCreatingManual(false)}
            onCreated={created => {
              setCreatingManual(false)
              router.push(`/admin?q=${created.q}&id=${created.id}`)
            }}
          />
        ) : quote ? (
          <>
            <div className="print:hidden">
            {/* ── Client info bar ── */}
            <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5 mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Cliente</p>
                    <p className="text-white font-bold">{quote.nombre}</p>
                    {quote.empresa && <p className="text-white/60 text-sm">{quote.empresa}</p>}
                    <p className="text-white/40 text-xs mt-0.5">{CLIENT_TYPE_LABELS[quote.clientType] || quote.clientType}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Contacto</p>
                    <a href={`https://wa.me/${quote.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-green-400 text-sm font-semibold hover:text-green-300 transition block">
                      {quote.whatsapp}
                    </a>
                    <a href={`mailto:${quote.email}`} className="text-cyan-400 text-sm hover:text-cyan-300 transition block">
                      {quote.email}
                    </a>
                  </div>
                  {quote.notas && (
                    <div className="max-w-xs">
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Notas del cliente</p>
                      <p className="text-white/70 text-sm leading-relaxed">{quote.notas}</p>
                    </div>
                  )}
                </div>

                {/* Status + actions */}
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex gap-2 flex-wrap justify-end items-center">
                    {saving && <span className="text-white/30 text-xs">Guardando…</span>}
                    {STATUS_OPTIONS.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleStatusChange(opt.key)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          status === opt.key ? opt.color : 'bg-transparent text-white/30 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 print:hidden">
                    <a
                      href={`https://wa.me/${quote.whatsapp.replace(/\D/g, '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-300 text-xs font-bold hover:bg-green-500/25 transition"
                    >
                      WhatsApp →
                    </a>
                    <button onClick={copyWA}
                      className="px-3 py-1.5 rounded-xl bg-[#18181f] border border-[#2a2a3a] text-white/50 text-xs font-bold hover:text-white hover:border-white/20 transition">
                      {copied ? '✓ Copiado' : 'Copiar mensaje'}
                    </button>
                    <button
                      onClick={sendProposal}
                      disabled={sending || Object.keys(lines).length === 0}
                      className="px-3 py-1.5 rounded-xl bg-lime-500/15 border border-lime-500/30 text-lime-300 text-xs font-bold hover:bg-lime-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Enviando...' : 'Enviar cotización'}
                    </button>
                    <button onClick={() => openDoc('contrato')}
                      className="px-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold hover:bg-violet-500/25 transition">
                      📄 Contrato
                    </button>
                    <button onClick={() => openDoc('bienvenida')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition">
                      🎉 Bienvenida
                    </button>
                  </div>
                  {sendMessage && (
                    <p className={`text-xs ${sendMessage.startsWith('Enviada') ? 'text-lime-300' : 'text-red-300'}`}>
                      {sendMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Left: Proposal builder (3 cols) */}
              <div className="lg:col-span-3 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-bold">Servicios de la propuesta</p>
                  <p className="text-white/40 text-xs">Activa, desactiva o cambia de plan</p>
                </div>

                {lines.bundle && (() => {
                  const b = BUNDLES_REF[lines.bundle[0] as keyof typeof BUNDLES_REF]
                  return b ? (
                    <div className="rounded-2xl border border-violet-500/40 bg-[#111118] px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📦</span>
                        <div>
                          <p className="text-white font-semibold text-sm">{b.name}</p>
                          <p className="text-white/40 text-xs">{b.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-violet-500/20 text-violet-300 border-violet-500/30">Mensual</span>
                        <p className="text-white font-bold text-sm">{fmt(b.price)}</p>
                      </div>
                    </div>
                  ) : null
                })()}

                {(Object.keys(SERVICES) as ServiceKey[]).map(key => (
                  <ServiceRow key={key} svcKey={key} lines={lines} onChange={setLines} />
                ))}

                {/* Admin notes */}
                <div className="mt-4">
                  <label className="block text-white/40 text-xs uppercase tracking-wide mb-2">Notas internas (no se envían al cliente)</label>
                  <textarea
                    value={adminNote}
                    onChange={e => setAdminNote(e.target.value)}
                    placeholder="Observaciones, acuerdos, próximos pasos..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl bg-[#111118] border border-[#2a2a3a] text-white placeholder-white/20 text-sm focus:outline-none focus:border-violet-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Right: Summary (2 cols) */}
              <div className="lg:col-span-2">
                <div className="sticky top-4 space-y-4">

                  <ProposalSummary
                    lines={lines}
                    priceAdjustments={priceAdjustments}
                    setPriceAdjustments={setPriceAdjustments}
                    scopeAdjustments={scopeAdjustments}
                    setScopeAdjustments={setScopeAdjustments}
                    customItems={customItems}
                    setCustomItems={setCustomItems}
                    discount={discount}
                    setDiscount={setDiscount}
                  />

                  {/* Status card */}
                  <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Estado</p>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${currentStatus.color}`}>
                      {currentStatus.label}
                    </span>
                    {quote.sentAt && (
                      <p className="text-white/35 text-xs mt-3">Enviada: {formatDateTime(quote.sentAt)}</p>
                    )}
                  </div>

                  {/* History card */}
                  <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Historial</p>
                    {quote.history?.length ? (
                      <div className="space-y-3">
                        {[...quote.history].reverse().map((event, idx) => (
                          <div key={`${event.at}-${idx}`} className="flex gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
                            <div>
                              <p className="text-white/75 text-xs font-semibold">{event.label}</p>
                              <p className="text-white/30 text-[11px] mt-0.5">{formatDateTime(event.at)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/30 text-xs">Sin movimientos registrados todavía.</p>
                    )}
                  </div>

                </div>
              </div>
            </div>
            </div>
            <PrintableProposal
              quote={quote}
              lines={lines}
              priceAdjustments={priceAdjustments}
              scopeAdjustments={scopeAdjustments}
              customItems={customItems}
              discount={discount}
            />
          </>
        ) : (
          !decodeError && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-bold text-lg">Historial de cotizaciones</p>
                <button
                  onClick={() => setCreatingManual(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-bold print:hidden"
                >
                  + Crear manual
                </button>
              </div>
              <QuotesList onSelect={q => {
                if (q.q) router.push(`/admin?q=${q.q}&id=${q.id}`)
              }} />
            </div>
          )
        )}

        {/* ── Pricing Reference Table ── */}
        <div className="mt-12 print:hidden">
          <button
            onClick={() => setShowPricing(s => !s)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-[#111118] border border-[#2a2a3a] text-white font-bold text-sm hover:border-violet-500/40 transition print:hidden"
          >
            <span>📊 Tabla de precios de referencia</span>
            <span className="text-white/40">{showPricing ? '↑' : '↓'}</span>
          </button>

          {showPricing && (
            <div className="mt-4">
              <PricingTable />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <p className="text-white/40 text-sm">Cargando...</p>
      </div>
    }>
      <AdminInner />
    </Suspense>
  )
}
