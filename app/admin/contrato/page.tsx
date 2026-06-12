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
    basico:   { name: 'Plan Básico (1–2 redes)',          price: 2000, type: 'mensual' },
    estandar: { name: 'Plan Estándar (3 redes + DMs)',    price: 3500, type: 'mensual' },
    pro:      { name: 'Plan Pro (4+ redes + DMs)',        price: 5000, type: 'mensual' },
  },
  posts: {
    starter:   { name: 'Starter (hasta 12/mes)',  price: 2200, type: 'mensual' },
    estandar:  { name: 'Estándar (13–20/mes)',    price: 3200, type: 'mensual' },
    premium:   { name: 'Premium (21–30/mes)',     price: 4500, type: 'mensual' },
    intensivo: { name: 'Intensivo (+30/mes)',     price: 6000, type: 'mensual' },
  },
  reels: {
    starter:   { name: 'Starter (1–4/mes)',   price: 2200, type: 'mensual' },
    estandar:  { name: 'Estándar (5–8/mes)',  price: 3200, type: 'mensual' },
    premium:   { name: 'Premium (9–12/mes)',  price: 4500, type: 'mensual' },
    intensivo: { name: 'Intensivo (+12/mes)', price: 6000, type: 'mensual' },
  },
  ads: {
    meta:   { name: 'Meta Ads (FB + IG)',  price: 2000, type: 'mensual' },
    google: { name: 'Google Ads',          price: 2000, type: 'mensual' },
    tiktok: { name: 'TikTok Ads',          price: 1500, type: 'mensual' },
  },
  produccion: {
    foto:  { name: 'Fotografía profesional',     price: 4500, type: 'proyecto' },
    video: { name: 'Video / Reel profesional',   price: 5500, type: 'proyecto' },
    pack:  { name: 'Pack completo foto + video', price: 9000, type: 'proyecto' },
  },
  drone: {
    standard: { name: 'Vuelo con drone (foto + video 4K)', price: 5000, type: 'proyecto' },
  },
  tour360: {
    completo: { name: 'Recorrido virtual 360°', price: 6500, type: 'proyecto' },
  },
}

const BUNDLES: Record<string, { name: string; price: number; desc: string }> = {
  esencial: { name: 'Plan Esencial',  price: 4800,  desc: '4 posts + 4 reels/mes (sin levantamiento de contenido)' },
  activo:   { name: 'Plan Gestión',   price: 7500,  desc: 'CM (2 redes) + 8 posts + 5 reels/mes (con levantamiento mensual)' },
  pro:      { name: 'Plan Premium',   price: 11000, desc: 'CM (3 redes + DMs) + 12 posts + 6 reels + levantamiento + estrategia + reporte de métricas' },
}

function fmt(n: number) { return '$' + n.toLocaleString('es-MX') + ' MXN' }
function today() {
  return new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}
function contractNumFromId(id: string | null, q: string | null): string {
  const year = new Date().getFullYear()
  if (id) {
    // UUID: take last 4 hex chars, convert to decimal 1000–9999
    const suffix = parseInt(id.replace(/-/g, '').slice(-4), 16) % 9000 + 1000
    return `JUN-${year}-${suffix}`
  }
  if (q) {
    // Fallback: derive from first 4 chars of the encoded quote param
    const suffix = parseInt(q.slice(0, 4).replace(/[^0-9a-f]/gi, '0').padEnd(4, '0'), 16) % 9000 + 1000
    return `JUN-${year}-${suffix}`
  }
  return `JUN-${year}-0000`
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
  const hasBundleMonthly = !!(quote.bundle && BUNDLES[quote.bundle])

  // Bundle line
  if (hasBundleMonthly) {
    const b = BUNDLES[quote.bundle]
    result.push({ label: b.name, plan: b.desc, price: b.price, type: 'mensual' })
  }

  const hasOverride = overrideLines && Object.keys(overrideLines).length > 0

  if (hasOverride) {
    // Admin edited the proposal lines — use them as-is
    for (const [svc, planKeys] of Object.entries(overrideLines!)) {
      const plans = ALL_PLANS[svc]
      if (!plans) continue
      for (const pk of planKeys) {
        const plan = plans[pk]
        if (!plan) continue
        result.push({ label: SERVICE_LABELS[svc] || svc, plan: plan.name, price: plan.price, type: plan.type })
      }
    }
  } else {
    // No override — fall back to what the client selected in the quote form
    const services = quote.services || []
    const planMap: Record<string, string | string[]> = {
      cm:         quote.cmPlan,
      posts:      quote.postsPlan,
      reels:      quote.reelsPlan,
      produccion: quote.produccionPlan,
      ads:        quote.adsPlatforms || [],
      drone:      'standard',
      tour360:    'completo',
    }

    for (const svc of services) {
      // Skip monthly services already covered by a bundle
      const plans = ALL_PLANS[svc]
      if (!plans) continue

      const keys = planMap[svc]
      const planKeys = Array.isArray(keys) ? keys : keys ? [keys] : []

      for (const pk of planKeys) {
        const plan = plans[pk as keyof typeof plans] as { name: string; price: number; type: 'mensual' | 'proyecto' } | undefined
        if (!plan) continue
        if (hasBundleMonthly && plan.type === 'mensual') continue
        result.push({ label: SERVICE_LABELS[svc] || svc, plan: plan.name, price: plan.price, type: plan.type })
      }
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="JUN" style={{ height: '32px', width: 'auto' }} />
          <p className="text-xs text-gray-400 mt-1">Agencia de Marketing Digital</p>
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
            ['1. Duración y renovación', 'El contrato tiene vigencia mensual con renovación automática al inicio de cada periodo, salvo aviso de cancelación con 30 días naturales de anticipación por escrito (WhatsApp o correo electrónico con acuse de recibo).'],
            ['2. Pago', 'Los servicios se facturan de forma anticipada al inicio de cada periodo mensual. El cliente tiene 3 días hábiles a partir de la fecha de facturación para realizar el pago. Transcurrido ese plazo sin pago, JUN podrá pausar o suspender la prestación de servicios sin responsabilidad, sin derecho a reembolso proporcional.'],
            ['3. Cancelación y reembolsos', 'No se realizan reembolsos por el periodo en curso una vez iniciado, independientemente del avance en los entregables. La cancelación con menos de 30 días de anticipación genera un cargo equivalente al 50% del mensual contratado como penalización por cancelación anticipada.'],
            ['4. Sesiones de levantamiento de contenido', 'Cada sesión de levantamiento incluye: 1 (una) ubicación, con una duración máxima de 3 horas continuas, dentro de la zona Riviera Maya (Playa del Carmen, Tulum, Cancún y alrededores). Ubicaciones adicionales, días adicionales o locaciones que requieran traslado mayor a 40 km se cotizarán por separado. La programación de sesiones deberá coordinarse con un mínimo de 5 días hábiles de anticipación. Las sesiones canceladas por el cliente con menos de 48 horas de anticipación se considerarán como sesión consumida del periodo.'],
            ['5. Definición de entregables de video (reels)', 'Cada reel o video incluye: duración de 30 a 90 segundos, 1 formato (vertical 9:16 para Reels/TikTok o cuadrado 1:1 para feed), música de librería con licencia libre, subtítulos o texto básico cuando aplique, y hasta 1 ronda de correcciones de edición. No incluye: animaciones personalizadas, efectos VFX, locución profesional, actores o modelos externos, ni formatos adicionales distintos al especificado.'],
            ['6. Definición de entregables de diseño (posts)', 'Cada diseño incluye adaptación al formato especificado (feed, historia, carrusel), uso de la identidad de marca del cliente, y hasta 2 rondas de correcciones. Correcciones que impliquen cambio de concepto o rediseño completo se cotizarán como nuevo entregable.'],
            ['7. Revisiones y aprobaciones', 'El cliente tiene 3 días hábiles para aprobar o rechazar cada entregable desde su envío. Sin respuesta en ese plazo, el material se considerará aprobado. Cada servicio incluye máximo 2 rondas de revisión; revisiones adicionales tienen un costo de $300 MXN por entregable.'],
            ['8. Responsabilidades del cliente', 'El cliente se compromete a: (a) proporcionar accesos, materiales, briefings e información necesaria dentro de los primeros 3 días hábiles del periodo; (b) garantizar que el material propio que entregue a JUN (fotos, videos, música) está libre de derechos de terceros; (c) designar a una persona de contacto con capacidad de aprobación. El retraso del cliente en la entrega de materiales o aprobaciones puede afectar los tiempos de entrega sin responsabilidad para JUN.'],
            ['9. Community Manager', 'El servicio de CM cubre: publicación del contenido aprobado, respuesta a comentarios generales y mensajes directos de carácter ordinario, en las redes sociales especificadas en el plan. No incluye: gestión de crisis de reputación, atención a quejas graves, moderación de trolls o situaciones que requieran respuesta legal o institucional, ni el pago de publicidad (pauta), que corre por cuenta del cliente.'],
            ['10. Publicidad digital (Ads)', 'El fee de gestión de campañas cubre la configuración, optimización y reporte de anuncios. El presupuesto publicitario (pauta) es independiente y corre a cargo exclusivo del cliente directamente en las plataformas (Meta, Google, TikTok). JUN no adelanta ni gestiona recursos de pauta publicitaria.'],
            ['11. Drone y Recorrido 360°', 'Los servicios de drone y recorrido 360° están sujetos a condiciones climáticas y regulaciones de vuelo vigentes (DGAC México). En caso de cancelación por clima o restricción de vuelo, se reprogramará sin costo adicional. El cliente es responsable de gestionar permisos de acceso a la propiedad o ubicación. El servicio incluye 1 ubicación y 1 fecha de captura; ubicaciones o días adicionales se cotizarán aparte.'],
            ['12. Derechos de propiedad intelectual', 'Todo el material producido por JUN (diseños, videos, fotografías, copies) pasa a ser propiedad del cliente una vez liquidado el servicio del periodo correspondiente. JUN conserva el derecho de usar el trabajo realizado en su portafolio y materiales promocionales, salvo indicación escrita en contrario del cliente.'],
            ['13. Confidencialidad', 'Ambas partes se comprometen a no divulgar información confidencial del negocio de la otra parte durante y por 2 años después de concluida la relación contractual.'],
            ['14. Limitación de responsabilidad', 'JUN no se hace responsable por resultados específicos de negocio (ventas, leads, seguidores) derivados de los servicios prestados, ya que dependen de factores externos al alcance creativo. La responsabilidad máxima de JUN ante cualquier reclamación no excederá el monto del último mes facturado.'],
          ].map(([title, text]) => (
            <div key={title} className="flex gap-2 pb-2 border-b border-gray-50 last:border-0">
              <span className="font-bold text-gray-600 shrink-0 w-6">{title.split('.')[0]}.</span>
              <div>
                <span className="font-bold text-gray-600">{title.split('. ')[1]}: </span>
                <span>{text}</span>
              </div>
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
        <p className="text-[10px] text-gray-300">JUN · junmkt.com · informesjunmkt@gmail.com · +52 985 108 9671 · Riviera Maya, México</p>
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
  const [contractId]      = useState(() => contractNumFromId(searchParams.get('id'), searchParams.get('q')))

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
