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
  estimate?: { min: number; max: number; type: string }
  submittedAt?: string
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

function computeTotal(lines: Record<string, string[]>) {
  let mensual = 0, proyecto = 0
  for (const [svcKey, planKeys] of Object.entries(lines)) {
    if (svcKey === 'bundle') {
      const b = BUNDLES_REF[planKeys[0] as keyof typeof BUNDLES_REF]
      if (b) mensual += b.price
      continue
    }
    const svc = SERVICES[svcKey as ServiceKey]
    if (!svc) continue
    for (const pk of planKeys) {
      const plan = (svc.plans as Record<string, { price: number }>)[pk]
      if (plan) {
        if (svc.type === 'mensual') mensual += plan.price
        else proyecto += plan.price
      }
    }
  }
  return { mensual, proyecto, total: mensual + proyecto }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-MX') + ' MXN'
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
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                <p className="text-white/40 text-xs">{q.email}</p>
                <p className="text-white/40 text-xs">{q.whatsapp}</p>
              </div>
              {q.bundle ? (
                <p className="text-violet-300 text-xs mt-1.5">📦 {BUNDLES_REF[q.bundle as keyof typeof BUNDLES_REF]?.name ?? q.bundle}</p>
              ) : (
                <p className="text-white/30 text-xs mt-1.5 truncate">
                  {(q.services ?? []).map(s => serviceShortLabel[s] ?? s).join(' · ')}
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

  // Proposal state
  const [lines, setLines]           = useState<Record<string, string[]>>({})
  const [adminNote, setAdminNote]   = useState('')
  const [status, setStatus]         = useState('pending')
  const [discount, setDiscount]     = useState(0)
  const [showPricing, setShowPricing] = useState(false)
  const [copied, setCopied]         = useState(false)

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
          setLines(data.lines ? data.lines : getInitialLines(data))
        })
        .catch(() => setDecodeError(true))
    } else if (q) {
      try {
        const data = JSON.parse(atob(decodeURIComponent(q))) as QuoteData
        setQuote(data)
        setLines(getInitialLines(data))
      } catch {
        setDecodeError(true)
      }
    }
  }, [searchParams, authenticated])

  // Persist changes to Redis
  const saveToDb = useCallback(async (patch: Record<string, unknown>) => {
    const id = searchParams.get('id') ?? quote?.id
    if (!id) return
    setSaving(true)
    try {
      await fetch('/api/quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
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
    const t = setTimeout(() => saveToDb({ lines, adminNote, discount }), 1000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, adminNote, discount])

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

  const { mensual, proyecto, total } = computeTotal(lines)
  const discounted = total - discount
  const currentStatus = STATUS_OPTIONS.find(s => s.key === status)!

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
              🖨️ Imprimir
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

        {quote ? (
          <>
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
                    <button onClick={() => openDoc('contrato')}
                      className="px-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold hover:bg-violet-500/25 transition">
                      📄 Contrato
                    </button>
                    <button onClick={() => openDoc('bienvenida')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition">
                      🎉 Bienvenida
                    </button>
                  </div>
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

                  {/* Price summary */}
                  <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#2a2a3a]">
                      <p className="text-white font-bold text-sm">Resumen de precios</p>
                    </div>
                    <div className="p-5 space-y-2">
                      {Object.entries(lines).map(([svcKey, planKeys]) => {
                        if (svcKey === 'bundle') {
                          const b = BUNDLES_REF[planKeys[0] as keyof typeof BUNDLES_REF]
                          if (!b) return null
                          return (
                            <div key="bundle" className="flex justify-between items-start gap-2">
                              <div>
                                <p className="text-violet-300 text-xs font-semibold">📦 {b.name}</p>
                                <p className="text-white/40 text-[11px]">{b.desc}</p>
                              </div>
                              <p className="text-white text-sm font-semibold shrink-0">{fmt(b.price)}</p>
                            </div>
                          )
                        }
                        const svc = SERVICES[svcKey as ServiceKey]
                        if (!svc) return null
                        const plans = svc.plans as Record<string, { name: string; price: number }>
                        return planKeys.map(pk => {
                          const plan = plans[pk]
                          if (!plan) return null
                          return (
                            <div key={`${svcKey}-${pk}`} className="flex justify-between items-start gap-2">
                              <div>
                                <p className="text-white/80 text-xs">{svc.label}</p>
                                <p className="text-white/40 text-[11px]">{plan.name}</p>
                              </div>
                              <p className="text-white text-sm font-semibold shrink-0">{fmt(plan.price)}</p>
                            </div>
                          )
                        })
                      })}

                      {Object.keys(lines).length === 0 && (
                        <p className="text-white/30 text-xs text-center py-4">Activa servicios para ver el desglose</p>
                      )}

                      {/* Subtotals */}
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

                          {/* Discount */}
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

                          {/* Total */}
                          <div className="border-t border-[#2a2a3a] pt-3 mt-1">
                            <div className="flex justify-between items-end">
                              <p className="text-white font-bold text-sm">Total propuesta</p>
                              <div className="text-right">
                                {discount > 0 && (
                                  <p className="text-white/30 text-xs line-through">{fmt(total)}</p>
                                )}
                                <p className="text-violet-300 font-black text-lg">{fmt(discounted)}</p>
                              </div>
                            </div>
                            {mensual > 0 && proyecto > 0 && (
                              <p className="text-white/30 text-[11px] mt-1">
                                {fmt(mensual - (discount > proyecto ? discount - proyecto : 0))}/mes + {fmt(proyecto)}/proyecto
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status card */}
                  <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-4">
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Estado</p>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${currentStatus.color}`}>
                      {currentStatus.label}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </>
        ) : (
          !decodeError && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-bold text-lg">Historial de cotizaciones</p>
              </div>
              <QuotesList onSelect={q => {
                if (q.q) router.push(`/admin?q=${q.q}&id=${q.id}`)
              }} />
            </div>
          )
        )}

        {/* ── Pricing Reference Table ── */}
        <div className="mt-12">
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
