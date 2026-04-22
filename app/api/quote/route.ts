import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/* ─── Bundle pricing (monthly packs) ────────────────────────────────── */
const BUNDLE_CATALOG: Record<string, { name: string; price: number }> = {
  esencial: { name: 'Plan Esencial (4 posts + 2 reels/mes — sin levantamiento)',  price: 2500 },
  activo:   { name: 'Plan Activo (CM Básico + 8 posts + 5 reels/mes)',            price: 4500 },
  pro:      { name: 'Plan Pro (CM Estándar + 12 posts + 6 reels/mes)',            price: 6000 },
}

/* ─── Internal pricing table — NEVER sent to client ─────────────────── */
function calcEstimate(data: Record<string, unknown>) {
  const services = (data.services as string[]) || []
  let total = 0
  const breakdown: { item: string; precio: string }[] = []
  let hasMonthly = false
  let hasProject = false

  // Bundle pricing (overrides individual monthly services)
  if (data.bundle && BUNDLE_CATALOG[data.bundle as string]) {
    const b = BUNDLE_CATALOG[data.bundle as string]
    total += b.price
    hasMonthly = true
    breakdown.push({ item: `${b.name}`, precio: `$${b.price.toLocaleString('es-MX')}` })
    // Skip monthly individual services — they're included in the bundle
    // Fall through only for project services below
    if (services.includes('produccion')) {
      hasProject = true
      const plans: Record<string, { name: string; price: number }> = {
        foto:  { name: 'Fotografía profesional',     price: 3500 },
        video: { name: 'Video / Reel profesional',   price: 4500 },
        pack:  { name: 'Pack completo foto + video', price: 7500 },
      }
      const plan = plans[data.produccionPlan as string]
      if (plan) { total += plan.price; breakdown.push({ item: `${plan.name} (por proyecto)`, precio: `$${plan.price.toLocaleString('es-MX')}` }) }
    }
    if (services.includes('drone')) {
      hasProject = true; total += 4000
      breakdown.push({ item: 'Vuelo con drone — foto y video (por proyecto)', precio: '$4,000' })
    }
    if (services.includes('tour360')) {
      hasProject = true; total += 5500
      breakdown.push({ item: 'Recorrido virtual 360° (por proyecto)', precio: '$5,500' })
    }
    const min = total; const max = Math.round(total * 1.15)
    const type = hasProject ? 'mixto' : 'mensual'
    return { min, max, breakdown, type }
  }

  // Community Manager
  if (services.includes('cm')) {
    hasMonthly = true
    const plans: Record<string, { name: string; price: number }> = {
      basico:   { name: 'Plan Básico (1–2 redes)',          price: 1500 },
      estandar: { name: 'Plan Estándar (3 redes + DMs)',    price: 2500 },
      pro:      { name: 'Plan Pro (4+ redes + DMs)',        price: 3000 },
    }
    const plan = plans[data.cmPlan as string]
    if (plan) {
      total += plan.price
      breakdown.push({ item: `Community Manager — ${plan.name}`, precio: `$${plan.price.toLocaleString('es-MX')}` })
    }
  }

  // Posts estáticos
  if (services.includes('posts')) {
    hasMonthly = true
    const plans: Record<string, { name: string; price: number }> = {
      starter:  { name: 'Starter (hasta 12/mes)',  price: 1600 },
      estandar: { name: 'Estándar (13–20/mes)',    price: 2500 },
      premium:  { name: 'Premium (21–30/mes)',     price: 3500 },
      intensivo:{ name: 'Intensivo (+30/mes)',     price: 4500 },
    }
    const plan = plans[data.postsPlan as string]
    if (plan) {
      total += plan.price
      breakdown.push({ item: `Diseño de posts — ${plan.name}`, precio: `$${plan.price.toLocaleString('es-MX')}` })
    }
  }

  // Reels
  if (services.includes('reels')) {
    hasMonthly = true
    const plans: Record<string, { name: string; price: number }> = {
      starter:  { name: 'Starter (1–4/mes)',   price: 1600 },
      estandar: { name: 'Estándar (5–8/mes)',  price: 2500 },
      premium:  { name: 'Premium (9–12/mes)',  price: 3500 },
      intensivo:{ name: 'Intensivo (+12/mes)', price: 4500 },
    }
    const plan = plans[data.reelsPlan as string]
    if (plan) {
      total += plan.price
      breakdown.push({ item: `Reels y video — ${plan.name}`, precio: `$${plan.price.toLocaleString('es-MX')}` })
    }
  }

  // Ads
  if (services.includes('ads')) {
    hasMonthly = true
    const platforms = (data.adsPlatforms as string[]) || []
    const priceMap: Record<string, number> = { meta: 1500, google: 1500, tiktok: 1200 }
    const nameMap:  Record<string, string>  = { meta: 'Meta Ads', google: 'Google Ads', tiktok: 'TikTok Ads' }
    platforms.forEach(p => {
      const price = priceMap[p] || 0
      total += price
      breakdown.push({ item: `Gestión ${nameMap[p]} (fee — pauta aparte)`, precio: `$${price.toLocaleString('es-MX')}` })
    })
  }

  // Producción foto/video
  if (services.includes('produccion')) {
    hasProject = true
    const plans: Record<string, { name: string; price: number }> = {
      foto:  { name: 'Fotografía profesional',       price: 3500 },
      video: { name: 'Video / Reel profesional',     price: 4500 },
      pack:  { name: 'Pack completo foto + video',   price: 7500 },
    }
    const plan = plans[data.produccionPlan as string]
    if (plan) {
      total += plan.price
      breakdown.push({ item: `${plan.name} (por proyecto)`, precio: `$${plan.price.toLocaleString('es-MX')}` })
    }
  }

  // Drone
  if (services.includes('drone')) {
    hasProject = true
    total += 4000
    breakdown.push({ item: 'Vuelo con drone — foto y video (por proyecto)', precio: '$4,000' })
  }

  // Recorrido 360°
  if (services.includes('tour360')) {
    hasProject = true
    total += 5500
    breakdown.push({ item: 'Recorrido virtual 360° (por proyecto)', precio: '$5,500' })
  }

  const min  = total
  const max  = Math.round(total * 1.15)
  const type = hasMonthly && hasProject ? 'mixto' : hasMonthly ? 'mensual' : 'por proyecto'

  return { min, max, breakdown, type }
}

/* ─── Labels ─────────────────────────────────────────────────────────── */
const serviceLabels: Record<string, string> = {
  cm:         'Community Manager',
  posts:      'Diseño de posts estáticos',
  reels:      'Reels y video',
  ads:        'Publicidad digital (Ads)',
  produccion: 'Fotografía y video profesional',
  drone:      'Tomas con drone',
  tour360:    'Recorrido virtual 360°',
}

const clientTypeLabels: Record<string, string> = {
  agente:        'Agente / asesor independiente',
  empresa:       'Empresa o marca',
  emprendimiento:'Negocio o emprendimiento',
}

/* ─── Admin email (internal) ─────────────────────────────────────────── */
function buildAdminEmail(data: Record<string, unknown>, estimate: ReturnType<typeof calcEstimate>): string {
  const encoded    = encodeURIComponent(Buffer.from(JSON.stringify(data)).toString('base64'))
  const adminLink  = `https://junmkt.com/admin?q=${encoded}`
  const services     = (data.services as string[]) || []
  const servicesHtml = services.map(s => `
    <tr>
      <td style="padding:6px 12px;background:#1a1a24;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:14px;">
        ${serviceLabels[s] || s}
      </td>
    </tr>`).join('')

  const breakdownHtml = estimate.breakdown.map(b => `
    <tr>
      <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#a1a1aa;font-size:13px;">${b.item}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:13px;text-align:right;white-space:nowrap;">${b.precio}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:12px;padding:24px;margin-bottom:16px;text-align:center;">
      <p style="margin:0;font-size:28px;font-weight:900;color:#fff;letter-spacing:-1px;">jún</p>
      <p style="margin:8px 0 0;font-size:11px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Nueva solicitud de cotización</p>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 12px;font-size:11px;color:#8b5cf6;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Cliente</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;width:130px;">Nombre</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;font-weight:700;">${data.nombre}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Empresa</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">${data.empresa || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Perfil</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">${clientTypeLabels[data.clientType as string] || data.clientType}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">WhatsApp</td><td style="padding:4px 0;"><a href="https://wa.me/${String(data.whatsapp).replace(/\D/g, '')}" style="color:#a3e635;font-size:13px;">${data.whatsapp}</a></td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Email</td><td style="padding:4px 0;"><a href="mailto:${data.email}" style="color:#06b6d4;font-size:13px;">${data.email}</a></td></tr>
      </table>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:16px 20px;border-bottom:1px solid #2a2a3a;">
        <p style="margin:0;font-size:11px;color:#06b6d4;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Servicios solicitados</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${servicesHtml}
      </table>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:16px 20px;border-bottom:1px solid #2a2a3a;">
        <p style="margin:0;font-size:11px;color:#a3e635;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Desglose interno</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${breakdownHtml}
        <tr>
          <td colspan="2" style="padding:1px;background:linear-gradient(90deg,#8b5cf6,#06b6d4);"></td>
        </tr>
        <tr style="background:#1a1a2e;">
          <td style="padding:12px;color:#fff;font-size:14px;font-weight:700;">Estimado (${estimate.type})</td>
          <td style="padding:12px;text-align:right;">
            <span style="font-size:18px;font-weight:900;color:#a78bfa;">
              $${estimate.min.toLocaleString('es-MX')} – $${estimate.max.toLocaleString('es-MX')} MXN
            </span>
          </td>
        </tr>
      </table>
    </div>

    ${data.notas ? `
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:11px;color:#71717a;letter-spacing:2px;text-transform:uppercase;">Notas del cliente</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.6;">${data.notas}</p>
    </div>` : ''}

    <div style="text-align:center;padding:8px 0 16px;">
      <a href="https://wa.me/${String(data.whatsapp).replace(/\D/g, '')}"
        style="display:inline-block;padding:12px 28px;border-radius:100px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:14px;font-weight:700;text-decoration:none;">
        Responder por WhatsApp →
      </a>
    </div>

    <!-- Admin link -->
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:16px 20px;margin-bottom:16px;text-align:center;">
      <p style="margin:0 0 10px;font-size:11px;color:#52525b;letter-spacing:2px;text-transform:uppercase;">Panel de cotización</p>
      <a href="${adminLink}"
        style="display:inline-block;padding:10px 22px;border-radius:100px;background:#1a1a2e;border:1px solid #2a2a3a;color:#8b5cf6;font-size:13px;font-weight:700;text-decoration:none;">
        Abrir en panel de admin →
      </a>
    </div>

    <p style="text-align:center;color:#3f3f46;font-size:11px;margin-top:8px;">junmkt.com · Solicitud recibida automáticamente</p>
  </div>
</body>
</html>`
}

/* ─── Client confirmation email ──────────────────────────────────────── */
function buildClientEmail(nombre: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:16px;padding:32px 24px;margin-bottom:20px;text-align:center;">
      <p style="margin:0 0 8px;font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">jún</p>
      <p style="margin:0;font-size:12px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Agencia de Marketing Digital</p>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:16px;padding:28px 24px;margin-bottom:16px;">
      <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#fff;">Hola, ${nombre.split(' ')[0]} 👋</p>
      <p style="margin:0 0 14px;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Recibimos tu solicitud. Estamos revisando los servicios que seleccionaste para prepararte una
        <strong style="color:#e4e4e7;">propuesta personalizada en PDF</strong>.
      </p>
      <p style="margin:0 0 14px;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Te contactamos en <strong style="color:#e4e4e7;">menos de 24 horas</strong> por WhatsApp o correo para platicar los detalles.
      </p>
      <p style="margin:0;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Si tienes alguna duda antes, escríbenos directo:
      </p>
    </div>

    <div style="text-align:center;margin-bottom:20px;">
      <a href="https://wa.me/529851089671?text=Hola%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n"
        style="display:inline-block;padding:14px 32px;border-radius:100px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:15px;font-weight:700;text-decoration:none;">
        Escribirnos por WhatsApp
      </a>
    </div>

    <div style="text-align:center;padding:8px 0;">
      <p style="margin:0;color:#3f3f46;font-size:12px;">
        <a href="https://junmkt.com" style="color:#52525b;text-decoration:none;">junmkt.com</a>
        &nbsp;·&nbsp; Riviera Maya, México
      </p>
    </div>
  </div>
</body>
</html>`
}

/* ─── Route handler ──────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, whatsapp, email } = body

    if (!nombre || !whatsapp || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const estimate = calcEstimate(body)

    // Log quote data so it's always visible in Vercel logs
    console.log('📋 NUEVA COTIZACIÓN:', JSON.stringify({ nombre, whatsapp, email, empresa: body.empresa, clientType: body.clientType, bundle: body.bundle, services: body.services, estimate }, null, 2))

    // Try to send emails — non-blocking: form succeeds even if Resend is not configured
    try {
      await resend.emails.send({
        from:     'JUN <onboarding@resend.dev>',
        to:       'informesjunmkt@gmail.com',
        replyTo:  email as string,
        subject:  `📋 Nueva cotización — ${nombre} · ${body.empresa || body.clientType}`,
        html:     buildAdminEmail(body, estimate),
      })
      await resend.emails.send({
        from:     'JUN <onboarding@resend.dev>',
        to:       email as string,
        subject:  'JUN recibió tu solicitud',
        html:     buildClientEmail(nombre as string),
      })
    } catch (emailError) {
      // Resend not configured or failed — quote data is saved in logs above
      console.error('⚠️  Email no enviado (verifica RESEND_API_KEY en Vercel):', emailError)
    }

    return NextResponse.json({ message: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Quote API error:', error)
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
