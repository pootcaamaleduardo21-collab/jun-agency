import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

/* ─── Internal pricing table — NEVER sent to client ─────────────────── */
function calcEstimate(data: Record<string, unknown>) {
  const services = (data.services as string[]) || []
  let total = 0
  const breakdown: { item: string; precio: string }[] = []
  let hasMonthly = false
  let hasProject = false

  // Community Manager
  if (services.includes('cm')) {
    hasMonthly = true
    const redes = data.cmRedes as string
    const dms = data.cmDMs === 'si'
    let base = redes === '4+' ? 2500 : redes === '3' ? 2000 : 1500
    if (dms) base += 500
    total += base
    breakdown.push({ item: `Community Manager (${redes} redes${dms ? ' + DMs' : ''})`, precio: `$${base.toLocaleString('es-MX')}` })
  }

  // Posts estáticos
  if (services.includes('posts')) {
    hasMonthly = true
    const count = data.postsCount as string
    const map: Record<string, number> = { 'hasta-12': 900, '13-20': 1600, '21-30': 2300, 'mas-30': 3000 }
    const price = map[count] || 900
    total += price
    breakdown.push({ item: `Diseño de posts (${count.replace('-', ' a ').replace('hasta-', 'hasta ').replace('mas-', 'más de ')}/mes)`, precio: `$${price.toLocaleString('es-MX')}` })
  }

  // Reels
  if (services.includes('reels')) {
    hasMonthly = true
    const count = data.reelsCount as string
    const map: Record<string, number> = { '1-4': 1200, '5-8': 2000, '9-12': 2800, 'mas-12': 3800 }
    const price = map[count] || 1200
    total += price
    breakdown.push({ item: `Reels y video (${count.replace('-', ' a ').replace('mas-', 'más de ')}/mes)`, precio: `$${price.toLocaleString('es-MX')}` })
  }

  // Ads management
  if (services.includes('ads')) {
    hasMonthly = true
    const platforms = (data.adsPlatforms as string[]) || []
    const priceMap: Record<string, number> = { meta: 1500, google: 1500, tiktok: 1200 }
    const nameMap: Record<string, string> = { meta: 'Meta Ads', google: 'Google Ads', tiktok: 'TikTok Ads' }
    platforms.forEach(p => {
      const price = priceMap[p] || 0
      total += price
      breakdown.push({ item: `Gestión ${nameMap[p]} (fee — pauta aparte)`, precio: `$${price.toLocaleString('es-MX')}` })
    })
  }

  // Foto y video terrestre
  if (services.includes('produccion')) {
    hasProject = true
    const items = (data.produccionItems as string[]) || []
    const map: Record<string, { name: string; price: number }> = {
      foto: { name: 'Fotografía profesional', price: 3500 },
      video: { name: 'Video / Reel profesional', price: 4500 },
    }
    items.forEach(i => {
      if (map[i]) {
        total += map[i].price
        breakdown.push({ item: `${map[i].name} (por proyecto)`, precio: `$${map[i].price.toLocaleString('es-MX')}` })
      }
    })
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

  const min = total
  const max = Math.round(total * 1.15)
  const type = hasMonthly && hasProject ? 'mixto' : hasMonthly ? 'mensual' : 'por proyecto'

  return { min, max, breakdown, type }
}

/* ─── Labels ─────────────────────────────────────────────────────────── */
const serviceLabels: Record<string, string> = {
  cm: 'Community Manager',
  posts: 'Diseño de posts estáticos',
  reels: 'Reels y video',
  ads: 'Publicidad digital (Ads)',
  produccion: 'Fotografía y video profesional',
  drone: 'Tomas con drone',
  tour360: 'Recorrido virtual 360°',
}

const clientTypeLabels: Record<string, string> = {
  agente: 'Agente / asesor inmobiliario',
  empresa: 'Empresa o marca',
  otro: 'Negocio / emprendimiento',
}

/* ─── Email HTML for JUN (internal) ─────────────────────────────────── */
function buildAdminEmail(data: Record<string, unknown>, estimate: ReturnType<typeof calcEstimate>): string {
  const services = (data.services as string[]) || []
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

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:12px;padding:24px;margin-bottom:16px;text-align:center;">
      <p style="margin:0;font-size:28px;font-weight:900;color:#fff;letter-spacing:-1px;">jún</p>
      <p style="margin:8px 0 0;font-size:11px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Nueva solicitud de cotización</p>
    </div>

    <!-- Cliente -->
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 12px;font-size:11px;color:#8b5cf6;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Cliente</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;width:120px;">Nombre</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;font-weight:700;">${data.nombre}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Empresa</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">${data.empresa}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Perfil</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">${clientTypeLabels[data.clientType as string] || data.clientType}</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">WhatsApp</td><td style="padding:4px 0;"><a href="https://wa.me/${String(data.whatsapp).replace(/\D/g, '')}" style="color:#a3e635;font-size:13px;">${data.whatsapp}</a></td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Email</td><td style="padding:4px 0;"><a href="mailto:${data.email}" style="color:#06b6d4;font-size:13px;">${data.email}</a></td></tr>
      </table>
    </div>

    <!-- Servicios -->
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:16px 20px;border-bottom:1px solid #2a2a3a;">
        <p style="margin:0;font-size:11px;color:#06b6d4;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Servicios solicitados</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${servicesHtml}
      </table>
    </div>

    <!-- Desglose + Estimado -->
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
            <span style="font-size:18px;font-weight:900;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              $${estimate.min.toLocaleString('es-MX')} – $${estimate.max.toLocaleString('es-MX')} MXN
            </span>
          </td>
        </tr>
      </table>
    </div>

    ${data.notas ? `
    <!-- Notas -->
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:11px;color:#71717a;letter-spacing:2px;text-transform:uppercase;">Notas del cliente</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.6;">${data.notas}</p>
    </div>` : ''}

    <!-- CTA -->
    <div style="text-align:center;padding:8px 0 16px;">
      <a href="https://wa.me/${String(data.whatsapp).replace(/\D/g, '')}"
        style="display:inline-block;padding:12px 28px;border-radius:100px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:14px;font-weight:700;text-decoration:none;">
        Responder por WhatsApp →
      </a>
    </div>

    <p style="text-align:center;color:#3f3f46;font-size:11px;margin-top:8px;">junmkt.com · Solicitud recibida automáticamente</p>
  </div>
</body>
</html>`
}

/* ─── Confirmation email for client ─────────────────────────────────── */
function buildClientEmail(nombre: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:16px;padding:32px 24px;margin-bottom:20px;text-align:center;">
      <p style="margin:0 0 8px;font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">jún</p>
      <p style="margin:0;font-size:12px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Agencia de Marketing Digital</p>
    </div>

    <!-- Body -->
    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:16px;padding:28px 24px;margin-bottom:16px;">
      <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#fff;">Hola, ${nombre.split(' ')[0]} 👋</p>
      <p style="margin:0 0 14px;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Recibimos tu solicitud. Estamos revisando los servicios que seleccionaste para prepararte una <strong style="color:#e4e4e7;">propuesta personalizada</strong>.
      </p>
      <p style="margin:0 0 14px;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Te contactamos en <strong style="color:#e4e4e7;">menos de 24 horas</strong> por WhatsApp o correo para platicar los detalles.
      </p>
      <p style="margin:0;color:#a1a1aa;font-size:15px;line-height:1.7;">
        Si tienes alguna duda antes, escríbenos directo:
      </p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:20px;">
      <a href="https://wa.me/529851089671?text=Hola%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n"
        style="display:inline-block;padding:14px 32px;border-radius:100px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:15px;font-weight:700;text-decoration:none;">
        Escribirnos por WhatsApp
      </a>
    </div>

    <!-- Footer -->
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

/* ─── Route handler ─────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, empresa, whatsapp, email } = body

    if (!nombre || !empresa || !whatsapp || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const estimate = calcEstimate(body)

    // Email to JUN
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@junmkt.com',
      to: 'informes@junmkt.com',
      replyTo: email as string,
      subject: `📋 Nueva cotización — ${nombre} · ${empresa}`,
      html: buildAdminEmail(body, estimate),
    })

    // Confirmation to client
    await transporter.sendMail({
      from: `JUN <${process.env.SMTP_FROM || 'noreply@junmkt.com'}>`,
      to: email as string,
      subject: 'JUN recibió tu solicitud',
      html: buildClientEmail(nombre as string),
    })

    return NextResponse.json({ message: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Quote API error:', error)
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
