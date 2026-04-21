'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

/* ─── Pricing (mirrors API) ──────────────────────────────────────────── */
const SERVICE_LABELS: Record<string, string> = {
  cm: 'Community Manager', posts: 'Diseño de posts', reels: 'Reels y video',
  ads: 'Publicidad digital', produccion: 'Foto y video profesional',
  drone: 'Tomas con drone', tour360: 'Recorrido virtual 360°',
}

const ALL_PLANS: Record<string, Record<string, { name: string; price: number; type: 'mensual' | 'proyecto' }>> = {
  cm: {
    basico:   { name: 'Plan Básico (1–2 redes)',          price: 1500, type: 'mensual' },
    estandar: { name: 'Plan Estándar (3 redes + DMs)',    price: 2500, type: 'mensual' },
    pro:      { name: 'Plan Pro (4+ redes + DMs)',        price: 3000, type: 'mensual' },
  },
  posts: {
    starter:   { name: 'Starter (hasta 12/mes)',  price: 1600, type: 'mensual' },
    estandar:  { name: 'Estándar (13–20/mes)',    price: 2500, type: 'mensual' },
    premium:   { name: 'Premium (21–30/mes)',     price: 3500, type: 'mensual' },
    intensivo: { name: 'Intensivo (+30/mes)',     price: 4500, type: 'mensual' },
  },
  reels: {
    starter:   { name: 'Starter (1–4/mes)',   price: 1600, type: 'mensual' },
    estandar:  { name: 'Estándar (5–8/mes)',  price: 2500, type: 'mensual' },
    premium:   { name: 'Premium (9–12/mes)',  price: 3500, type: 'mensual' },
    intensivo: { name: 'Intensivo (+12/mes)', price: 4500, type: 'mensual' },
  },
  ads: {
    meta:   { name: 'Meta Ads (FB + IG)',  price: 1500, type: 'mensual' },
    google: { name: 'Google Ads',          price: 1500, type: 'mensual' },
    tiktok: { name: 'TikTok Ads',          price: 1200, type: 'mensual' },
  },
  produccion: {
    foto:  { name: 'Fotografía profesional',     price: 3500, type: 'proyecto' },
    video: { name: 'Video / Reel profesional',   price: 4500, type: 'proyecto' },
    pack:  { name: 'Pack completo foto + video', price: 7500, type: 'proyecto' },
  },
  drone: {
    standard: { name: 'Vuelo con drone (foto + video 4K)', price: 4000, type: 'proyecto' },
  },
  tour360: {
    completo: { name: 'Recorrido virtual 360°', price: 5500, type: 'proyecto' },
  },
}

const BUNDLES: Record<string, { name: string; price: number; desc: string }> = {
  esencial: { name: 'Plan Esencial',  price: 2500, desc: '4 posts + 2 reels/mes (sin levantamiento de contenido)' },
  activo:   { name: 'Plan Activo',    price: 4500, desc: 'CM Básico + 8 posts + 5 reels/mes (con levantamiento mensual)' },
  pro:      { name: 'Plan Pro',       price: 6000, desc: 'CM Estándar + 12 posts + 6 reels/mes (con levantamiento + reporte de métricas)' },
}

function fmt(n: number) { return '$' + n.toLocaleString('es-MX') + ' MXN' }
function today() {
  return new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}
function contractNum() {
  return 'JUN-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000))
}

interface QuoteData {
  clientType: string; bundle: string; services: string[]
  cmPlan: string; postsPlan: string; reelsPlan: string
  adsPlatforms: string[]; produccionPlan: string
  nombre: string; empresa: string; whatsapp: string; email: string; notas: string
}

interface ProposalLines { [svc: string]: string[] }

function buildLines(quote: QuoteData, overrideLines?: ProposalLines): Array<{ label: string; plan: string; price: number; type: 'mensual' | 'proyecto' }> {
  const result: Array<{ label: string; plan: string; price: number; type: 'mensual' | 'proyecto' }> = []

  // Bundle line
  if (quote.bundle && BUNDLES[quote.bundle]) {
    const b = BUNDLES[quote.bundle]
    result.push({ label: b.name, plan: b.desc, price: b.price, type: 'mensual' })
  }

  // Override or original lines (skip monthly services if bundle covers them)
  const lines = overrideLines || {}
  const hasBundleMonthly = !!(quote.bundle && BUNDLES[quote.bundle])

  for (const [svc, planKeys] of Object.entries(lines)) {
    const plans = ALL_PLANS[svc]
    if (!plans) continue
    for (const pk of planKeys) {
      const plan = plans[pk]
      if (!plan) continue
      // If bundle covers monthly, skip cm/posts/reels from individual billing
      if (hasBundleMonthly && plan.type === 'mensual' && !overrideLines) continue
      result.push({ label: SERVICE_LABELS[svc] || svc, plan: plan.name, price: plan.price, type: plan.type })
    }
  }

  return result
}

/* ─── Contract Document ──────────────────────────────────────────────── */
function ContractDoc({ quote, lines, contractId }: { quote: QuoteData; lines: ProposalLines; contractId: string }) {
  const items = buildLines(quote, lines)
  const mensual  = items.filter(i => i.type === 'mensual').reduce((s, i) => s + i.price, 0)
  const proyecto = items.filter(i => i.type === 'proyecto').reduce((s, i) => s + i.price, 0)
  const fecha = today()

  return (
    <div className="contract-doc bg-white text-gray-900 max-w-3xl mx-auto p-12 print:p-8 print:max-w-full shadow-none">

      {/* Header */}
      <div className="flex items-start justify-between mb-10 pb-6 border-b-2 border-gray-100">
        <div>
          <p className="font-black text-3xl tracking-tight text-gray-900" style={{ letterSpacing: '-1px' }}>jún</p>
          <p className="text-xs text-gray-400 mt-0.5">Agencia de Marketing Digital</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">CONTRATO DE SERVICIOS</p>
          <p className="font-bold text-gray-700 text-sm mt-0.5">{contractId}</p>
          <p className="text-xs text-gray-400 mt-0.5">{fecha}</p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Prestador de servicios</p>
          <p className="font-bold text-gray-800">JUN Agencia de Marketing Digital</p>
          <p className="text-sm text-gray-500 mt-1">informesjunmkt@gmail.com</p>
          <p className="text-sm text-gray-500">+52 985 108 9671</p>
          <p className="text-sm text-gray-500">junmkt.com · Riviera Maya, México</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Cliente</p>
          <p className="font-bold text-gray-800">{quote.nombre}</p>
          {quote.empresa && <p className="text-sm text-gray-600 font-medium">{quote.empresa}</p>}
          <p className="text-sm text-gray-500 mt-1">{quote.email}</p>
          <p className="text-sm text-gray-500">{quote.whatsapp}</p>
        </div>
      </div>

      {/* Services table */}
      <div className="mb-10">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Servicios contratados</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-500 font-semibold text-xs">Servicio</th>
              <th className="text-left py-2 text-gray-500 font-semibold text-xs">Plan / Detalle</th>
              <th className="text-right py-2 text-gray-500 font-semibold text-xs">Precio</th>
              <th className="text-right py-2 text-gray-500 font-semibold text-xs">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-3 font-semibold text-gray-800">{item.label}</td>
                <td className="py-3 text-gray-500 text-xs">{item.plan}</td>
                <td className="py-3 text-right font-semibold text-gray-800">{fmt(item.price)}</td>
                <td className="py-3 text-right">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.type === 'mensual' ? 'bg-purple-50 text-purple-600' : 'bg-cyan-50 text-cyan-600'
                  }`}>
                    {item.type === 'mensual' ? '/mes' : 'proyecto'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-4 space-y-1.5 text-right">
          {mensual > 0 && (
            <div className="flex justify-end gap-8">
              <p className="text-sm text-gray-500">Total mensual recurrente</p>
              <p className="text-sm font-bold text-gray-800 w-36">{fmt(mensual)}</p>
            </div>
          )}
          {proyecto > 0 && (
            <div className="flex justify-end gap-8">
              <p className="text-sm text-gray-500">Total por proyecto</p>
              <p className="text-sm font-bold text-gray-800 w-36">{fmt(proyecto)}</p>
            </div>
          )}
          <div className="flex justify-end gap-8 pt-2 border-t border-gray-200">
            <p className="text-sm font-bold text-gray-700">Inversión total</p>
            <p className="text-base font-black text-gray-900 w-36">{fmt(mensual + proyecto)}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {quote.notas && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Notas adicionales</p>
          <p className="text-sm text-gray-600">{quote.notas}</p>
        </div>
      )}

      {/* Terms */}
      <div className="mb-10">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Términos y condiciones</p>
        <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
          {[
            ['1. Duración', 'El contrato tiene vigencia mensual con renovación automática al inicio de cada periodo, salvo aviso de cancelación con 30 días de anticipación por escrito.'],
            ['2. Forma de pago', 'Los servicios se facturan de forma anticipada al inicio de cada periodo mensual. El incumplimiento de pago dentro de los 5 días hábiles podrá suspender la prestación de servicios sin responsabilidad para JUN.'],
            ['3. Cancelación', 'Cualquiera de las partes puede dar por terminado el contrato con aviso previo de 30 días naturales. No se realizan reembolsos por servicios del periodo en curso ya iniciado.'],
            ['4. Entregables', 'Los entregables y cantidades se especifican en el plan contratado. Cambios en el alcance deberán acordarse por escrito antes de ejecutarse.'],
            ['5. Derechos y propiedad', 'Todo el material producido por JUN para el cliente (diseños, videos, fotografías) será de uso exclusivo del cliente una vez liquidado el servicio correspondiente.'],
            ['6. Revisiones', 'Cada entregable incluye hasta 2 rondas de revisión. Revisiones adicionales se cotizarán por separado.'],
            ['7. Confidencialidad', 'Ambas partes se comprometen a mantener la confidencialidad de la información sensible del negocio durante y después de la relación contractual.'],
          ].map(([title, text]) => (
            <div key={title} className="flex gap-2">
              <span className="font-bold text-gray-600 shrink-0">{title}:</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-12 mt-12">
        <div>
          <div className="border-b-2 border-gray-300 mb-2 pb-8" />
          <p className="font-bold text-gray-700 text-sm">Por JUN</p>
          <p className="text-gray-500 text-xs">Jimmy Caamal · Director</p>
          <p className="text-gray-400 text-xs mt-1">{fecha}</p>
        </div>
        <div>
          <div className="border-b-2 border-gray-300 mb-2 pb-8" />
          <p className="font-bold text-gray-700 text-sm">{quote.nombre}</p>
          {quote.empresa && <p className="text-gray-500 text-xs">{quote.empresa}</p>}
          <p className="text-gray-400 text-xs mt-1">Fecha: _______________</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-300">jún · junmkt.com · informesjunmkt@gmail.com · +52 985 108 9671 · Riviera Maya, México</p>
      </div>
    </div>
  )
}

/* ─── Inner ──────────────────────────────────────────────────────────── */
function ContratoInner() {
  const searchParams = useSearchParams()
  const [auth, setAuth]   = useState(false)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [lines, setLines] = useState<ProposalLines>({})
  const [contractId]      = useState(contractNum)

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
          <Link href="/admin" className="px-5 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold">
            Ir al panel →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Toolbar */}
      <div className="bg-[#09090b] border-b border-white/5 px-4 py-3 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/40 text-sm hover:text-white/70 transition">← Panel</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70 text-sm font-semibold">Contrato de servicios</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-violet-500 text-white text-xs font-bold hover:bg-violet-600 transition"
            >
              🖨️ Imprimir / Guardar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="py-8 print:py-0">
        {quote
          ? <ContractDoc quote={quote} lines={lines} contractId={contractId} />
          : <div className="text-center py-20 text-gray-400">No se encontraron datos de cotización.</div>
        }
      </div>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
          .contract-doc { box-shadow: none !important; }
        }
      `}</style>
    </div>
  )
}

export default function ContratoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>}>
      <ContratoInner />
    </Suspense>
  )
}
