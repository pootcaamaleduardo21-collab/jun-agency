import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { redis } from '@/lib/redis'

type ProposalLines = Record<string, string[]>
type PriceAdjustments = Record<string, number>
type CustomItem = { id: string; label: string; description?: string; price: number; type: 'mensual' | 'proyecto' }

const SERVICES = {
  cm: {
    label: 'Community Manager', type: 'mensual',
    plans: {
      basico:   { name: 'Plan Basico',   desc: '1-2 redes + gestion basica', price: 1500 },
      estandar: { name: 'Plan Estandar', desc: '3 redes + DMs',              price: 2500 },
      pro:      { name: 'Plan Pro',      desc: '4+ redes + estrategia',      price: 3000 },
    },
  },
  posts: {
    label: 'Diseno de Posts', type: 'mensual',
    plans: {
      starter:   { name: 'Starter',   desc: 'Hasta 12 disenos/mes', price: 1600 },
      estandar:  { name: 'Estandar',  desc: '13-20 disenos/mes',    price: 2500 },
      premium:   { name: 'Premium',   desc: '21-30 disenos/mes',    price: 3500 },
      intensivo: { name: 'Intensivo', desc: '+30 disenos/mes',      price: 4500 },
    },
  },
  reels: {
    label: 'Reels y Video', type: 'mensual',
    plans: {
      starter:   { name: 'Starter',   desc: '1-4 reels/mes',   price: 1600 },
      estandar:  { name: 'Estandar',  desc: '5-8 reels/mes',   price: 2500 },
      premium:   { name: 'Premium',   desc: '9-12 reels/mes',  price: 3500 },
      intensivo: { name: 'Intensivo', desc: '+12 reels/mes',   price: 4500 },
    },
  },
  ads: {
    label: 'Publicidad Digital', type: 'mensual',
    plans: {
      meta:   { name: 'Meta Ads',   desc: 'Facebook + Instagram, pauta aparte', price: 1500 },
      google: { name: 'Google Ads', desc: 'Busqueda + Display, pauta aparte',   price: 1500 },
      tiktok: { name: 'TikTok Ads', desc: 'Video ads, pauta aparte',            price: 1200 },
    },
  },
  produccion: {
    label: 'Foto y Video Profesional', type: 'proyecto',
    plans: {
      foto:  { name: 'Fotografia',    desc: 'Sesion completa + edicion', price: 3500 },
      video: { name: 'Video / Reel',  desc: 'Produccion + edicion',      price: 4500 },
      pack:  { name: 'Pack completo', desc: 'Foto + video',              price: 7500 },
    },
  },
  drone: {
    label: 'Tomas con Drone', type: 'proyecto',
    plans: {
      standard: { name: 'Vuelo estandar', desc: 'Foto aerea + video 4K', price: 4000 },
    },
  },
  tour360: {
    label: 'Recorrido Virtual 360', type: 'proyecto',
    plans: {
      completo: { name: 'Tour completo', desc: 'Link navegable web + movil', price: 5500 },
    },
  },
} as const

const BUNDLES = {
  esencial: { name: 'Plan Esencial', desc: '4 posts + 2 reels/mes', price: 2500 },
  activo:   { name: 'Plan Activo',   desc: 'CM Basico + 8 posts + 5 reels/mes', price: 4500 },
  pro:      { name: 'Plan Pro',      desc: 'CM Estandar + 12 posts + 6 reels/mes', price: 6000 },
} as const

function fmt(n: number) {
  return '$' + n.toLocaleString('es-MX') + ' MXN'
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sameJson(a: unknown, b: unknown) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null)
}

function historyEvent(action: string, label: string, details?: Record<string, unknown>) {
  return { at: new Date().toISOString(), action, label, ...(details && { details }) }
}

function getLineId(serviceKey: string, planKey: string) {
  return `${serviceKey}:${planKey}`
}

function getLineItems(lines: ProposalLines, priceAdjustments: PriceAdjustments = {}, customItems: CustomItem[] = []) {
  const items: Array<{ id: string; service: string; plan: string; desc: string; price: number; type: string }> = []

  for (const [serviceKey, planKeys] of Object.entries(lines || {})) {
    if (serviceKey === 'bundle') {
      const bundle = BUNDLES[planKeys[0] as keyof typeof BUNDLES]
      const id = getLineId(serviceKey, planKeys[0])
      if (bundle) items.push({ id, service: 'Plan mensual', plan: bundle.name, desc: bundle.desc, price: priceAdjustments[id] ?? bundle.price, type: 'mensual' })
      continue
    }

    const service = SERVICES[serviceKey as keyof typeof SERVICES]
    if (!service) continue

    const plans = service.plans as Record<string, { name: string; desc: string; price: number }>
    for (const planKey of planKeys) {
      const plan = plans[planKey]
      const id = getLineId(serviceKey, planKey)
      if (plan) items.push({ id, service: service.label, plan: plan.name, desc: plan.desc, price: priceAdjustments[id] ?? plan.price, type: service.type })
    }
  }

  return [
    ...items,
    ...(customItems || []).filter(item => item.label).map(item => ({
      id: item.id,
      service: 'Extra personalizado',
      plan: item.label,
      desc: item.description || 'Ajuste agregado manualmente',
      price: priceAdjustments[item.id] ?? (Number(item.price) || 0),
      type: item.type,
    })),
  ]
}

function computeTotal(lines: ProposalLines, discount = 0, priceAdjustments: PriceAdjustments = {}, customItems: CustomItem[] = []) {
  const items = getLineItems(lines, priceAdjustments, customItems)
  const mensual = items.filter(i => i.type === 'mensual').reduce((sum, item) => sum + item.price, 0)
  const proyecto = items.filter(i => i.type === 'proyecto').reduce((sum, item) => sum + item.price, 0)
  const total = Math.max(0, mensual + proyecto - discount)
  return { items, mensual, proyecto, subtotal: mensual + proyecto, total }
}

function buildProposalEmail(
  quote: Record<string, unknown>,
  lines: ProposalLines,
  discount = 0,
  priceAdjustments: PriceAdjustments = {},
  customItems: CustomItem[] = []
) {
  const totals = computeTotal(lines, discount, priceAdjustments, customItems)
  const firstName = String(quote.nombre || '').split(' ')[0] || 'hola'
  const itemsHtml = totals.items.map(item => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">${escapeHtml(item.service)} - ${escapeHtml(item.plan)}</p>
        <p style="margin:4px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">${escapeHtml(item.desc)}</p>
      </td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap;color:#111827;font-size:14px;font-weight:700;">${fmt(item.price)}</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">
    <div style="background:#09090b;border-radius:18px;padding:28px 24px;text-align:center;">
      <p style="margin:0;font-size:34px;font-weight:900;color:#fff;letter-spacing:-1px;">jun</p>
      <p style="margin:8px 0 0;color:#a78bfa;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Propuesta personalizada</p>
    </div>

    <div style="background:#fff;border-radius:18px;padding:28px 24px;margin-top:16px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 14px;color:#111827;font-size:22px;font-weight:900;">Hola, ${escapeHtml(firstName)}</p>
      <p style="margin:0;color:#52525b;font-size:15px;line-height:1.7;">
        Gracias por considerar a JUN. Te compartimos la cotizacion preparada con base en los servicios que revisamos para ${escapeHtml(quote.empresa || quote.nombre)}.
      </p>
    </div>

    <div style="background:#fff;border-radius:18px;margin-top:16px;border:1px solid #e5e7eb;overflow:hidden;">
      <div style="padding:18px 20px;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0;color:#111827;font-size:16px;font-weight:900;">Detalle de servicios</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${itemsHtml || '<tr><td style="padding:18px;color:#71717a;font-size:14px;">La propuesta esta en revision.</td></tr>'}
      </table>
      <div style="padding:18px 20px;background:#fafafa;">
        ${totals.mensual > 0 ? `<p style="margin:0 0 6px;color:#52525b;font-size:13px;">Subtotal mensual: <strong style="color:#111827;">${fmt(totals.mensual)}</strong></p>` : ''}
        ${totals.proyecto > 0 ? `<p style="margin:0 0 6px;color:#52525b;font-size:13px;">Subtotal por proyecto: <strong style="color:#111827;">${fmt(totals.proyecto)}</strong></p>` : ''}
        ${discount > 0 ? `<p style="margin:0 0 6px;color:#52525b;font-size:13px;">Descuento aplicado: <strong style="color:#111827;">-${fmt(discount)}</strong></p>` : ''}
        <p style="margin:12px 0 0;color:#111827;font-size:22px;font-weight:900;">Total: ${fmt(totals.total)}</p>
      </div>
    </div>

    <div style="background:#111118;border-radius:18px;padding:24px;margin-top:16px;text-align:center;">
      <p style="margin:0 0 16px;color:#e4e4e7;font-size:15px;line-height:1.6;">
        Si te parece bien, respondeme este correo o escribenos por WhatsApp y avanzamos con los siguientes pasos.
      </p>
      <a href="https://wa.me/529851089671?text=Hola%2C%20recibi%20mi%20cotizacion%20de%20JUN"
        style="display:inline-block;padding:13px 28px;border-radius:999px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:14px;font-weight:700;text-decoration:none;">
        Revisar por WhatsApp
      </a>
    </div>
  </div>
</body>
</html>`
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')

    if (id) {
      const quote = await redis.get(`quote:${id}`)
      if (!quote) return NextResponse.json(null, { status: 404 })
      return NextResponse.json(quote)
    }

    const ids = await redis.zrange('quotes:list', 0, -1, { rev: true })
    if (!ids.length) return NextResponse.json([])

    const quotes = await Promise.all(ids.map(id => redis.get(`quote:${id}`)))
    return NextResponse.json(quotes.filter(Boolean))
  } catch (e) {
    console.error('GET /api/quotes error:', e)
    return NextResponse.json([], { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, adminNote, lines, discount, priceAdjustments, customItems, client } = await request.json()
    if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

    const existing = await redis.get(`quote:${id}`) as Record<string, unknown> | null
    if (!existing) return NextResponse.json({ error: 'Cotización no encontrada' }, { status: 404 })

    const history = Array.isArray(existing.history) ? existing.history : []
    const events = []
    if (status !== undefined && status !== existing.status) {
      events.push(historyEvent('status_changed', `Estatus cambiado a ${status}`, { from: existing.status, to: status }))
    }
    if (lines !== undefined && !sameJson(lines, existing.lines)) {
      events.push(historyEvent('proposal_updated', 'Propuesta actualizada'))
    }
    if (discount !== undefined && discount !== existing.discount) {
      events.push(historyEvent('discount_updated', 'Descuento actualizado', { from: existing.discount || 0, to: discount }))
    }
    if (priceAdjustments !== undefined && !sameJson(priceAdjustments, existing.priceAdjustments)) {
      events.push(historyEvent('prices_updated', 'Precios ajustados manualmente'))
    }
    if (customItems !== undefined && !sameJson(customItems, existing.customItems)) {
      events.push(historyEvent('custom_items_updated', 'Extras personalizados actualizados'))
    }
    if (client !== undefined) {
      events.push(historyEvent('client_updated', 'Información del cliente actualizada'))
    }

    const updated = {
      ...existing,
      ...(client?.nombre    !== undefined && { nombre: client.nombre }),
      ...(client?.empresa   !== undefined && { empresa: client.empresa }),
      ...(client?.whatsapp  !== undefined && { whatsapp: client.whatsapp }),
      ...(client?.email     !== undefined && { email: client.email }),
      ...(client?.notas     !== undefined && { notas: client.notas }),
      ...(client?.clientType !== undefined && { clientType: client.clientType }),
      ...(status    !== undefined && { status }),
      ...(adminNote !== undefined && { adminNote }),
      ...(lines     !== undefined && { lines }),
      ...(discount  !== undefined && { discount }),
      ...(priceAdjustments !== undefined && { priceAdjustments }),
      ...(customItems !== undefined && { customItems }),
      updatedAt: new Date().toISOString(),
      history: [...history, ...events],
    }
    await redis.set(`quote:${id}`, updated)
    return NextResponse.json({ ok: true, quote: updated })
  } catch (e) {
    console.error('PATCH /api/quotes error:', e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, id, lines, discount, priceAdjustments, customItems } = body

    if (action === 'create') {
      const quote = body.quote || {}
      if (!quote.nombre) return NextResponse.json({ error: 'Falta nombre del cliente' }, { status: 400 })

      const quoteId = crypto.randomUUID()
      const submittedAt = new Date().toISOString()
      const normalized = {
        clientType: quote.clientType || 'empresa',
        bundle: '',
        services: [],
        cmPlan: '',
        postsPlan: '',
        reelsPlan: '',
        adsPlatforms: [],
        produccionPlan: '',
        nombre: quote.nombre,
        empresa: quote.empresa || '',
        whatsapp: quote.whatsapp || '',
        email: quote.email || '',
        notas: quote.notas || '',
      }
      const encoded = encodeURIComponent(Buffer.from(JSON.stringify(normalized)).toString('base64'))
      const finalLines = (lines || {}) as ProposalLines
      const finalDiscount = Number(discount || 0)
      const finalPriceAdjustments = (priceAdjustments || {}) as PriceAdjustments
      const finalCustomItems = (customItems || []) as CustomItem[]
      const totals = computeTotal(finalLines, finalDiscount, finalPriceAdjustments, finalCustomItems)
      const record = {
        id: quoteId,
        ...normalized,
        source: 'manual',
        status: 'pending',
        adminNote: quote.adminNote || '',
        lines: finalLines,
        discount: finalDiscount,
        priceAdjustments: finalPriceAdjustments,
        customItems: finalCustomItems,
        estimate: { min: totals.total, max: totals.total, type: totals.mensual && totals.proyecto ? 'mixto' : totals.mensual ? 'mensual' : 'por proyecto' },
        submittedAt,
        updatedAt: submittedAt,
        history: [historyEvent('created_manual', 'Cotización creada manualmente')],
        q: encoded,
      }

      await redis.set(`quote:${quoteId}`, record)
      await redis.zadd('quotes:list', { score: Date.now(), member: quoteId })
      return NextResponse.json({ ok: true, quote: record })
    }

    if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

    const existing = await redis.get(`quote:${id}`) as Record<string, unknown> | null
    if (!existing) return NextResponse.json({ error: 'Cotización no encontrada' }, { status: 404 })
    if (!existing.email) return NextResponse.json({ error: 'La cotización no tiene email' }, { status: 400 })

    const finalLines = (lines || existing.lines || {}) as ProposalLines
    const finalDiscount = Number(discount ?? existing.discount ?? 0)
    const finalPriceAdjustments = (priceAdjustments || existing.priceAdjustments || {}) as PriceAdjustments
    const finalCustomItems = (customItems || existing.customItems || []) as CustomItem[]
    const html = buildProposalEmail(existing, finalLines, finalDiscount, finalPriceAdjustments, finalCustomItems)

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY no está configurada' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'JUN <noreply@junmkt.com>',
      to: existing.email as string,
      replyTo: 'informesjunmkt@gmail.com',
      subject: `Tu cotización de JUN — ${existing.empresa || existing.nombre}`,
      html,
    })

    const history = Array.isArray(existing.history) ? existing.history : []
    const sentAt = new Date().toISOString()
    const updated = {
      ...existing,
      lines: finalLines,
      discount: finalDiscount,
      priceAdjustments: finalPriceAdjustments,
      customItems: finalCustomItems,
      status: 'sent',
      sentAt,
      lastSentAt: sentAt,
      updatedAt: sentAt,
      history: [
        ...history,
        ...(existing.status === 'sent' ? [] : [historyEvent('status_changed', 'Estatus cambiado a sent', { from: existing.status, to: 'sent' })]),
        historyEvent('quote_sent', `Cotización enviada a ${existing.email}`),
      ],
    }

    await redis.set(`quote:${id}`, updated)
    return NextResponse.json({ ok: true, quote: updated })
  } catch (e) {
    console.error('POST /api/quotes error:', e)
    return NextResponse.json({ error: 'Error al enviar la cotización' }, { status: 500 })
  }
}
