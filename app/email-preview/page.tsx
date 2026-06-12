// PREVIEW ONLY — delete before going to production
export default function EmailPreview() {
  const adminHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:12px;padding:24px;margin-bottom:16px;text-align:center;">
      <img src="https://junmkt.com/logo.png" alt="JUN" style="height:32px;width:auto;filter:invert(1) brightness(1.1);display:block;margin:0 auto 4px;" />
      <p style="margin:8px 0 0;font-size:11px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Nueva solicitud de cotización</p>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 12px;font-size:11px;color:#8b5cf6;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Cliente</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;width:120px;">Nombre</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;font-weight:700;">Carlos Mendoza</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Empresa</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">Inmobiliaria Del Mar</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Perfil</td><td style="padding:4px 0;color:#e4e4e7;font-size:13px;">Empresa o marca</td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">WhatsApp</td><td style="padding:4px 0;"><a href="https://wa.me/529981234567" style="color:#a3e635;font-size:13px;">+52 998 123 4567</a></td></tr>
        <tr><td style="padding:4px 0;color:#71717a;font-size:13px;">Email</td><td style="padding:4px 0;"><a href="mailto:carlos@delmar.mx" style="color:#06b6d4;font-size:13px;">carlos@delmar.mx</a></td></tr>
      </table>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:16px 20px;border-bottom:1px solid #2a2a3a;">
        <p style="margin:0;font-size:11px;color:#06b6d4;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Servicios solicitados</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:6px 12px;background:#1a1a24;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:14px;">Community Manager</td></tr>
        <tr><td style="padding:6px 12px;background:#1a1a24;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:14px;">Diseño de posts estáticos</td></tr>
        <tr><td style="padding:6px 12px;background:#1a1a24;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:14px;">Publicidad digital (Ads)</td></tr>
      </table>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:16px 20px;border-bottom:1px solid #2a2a3a;">
        <p style="margin:0;font-size:11px;color:#a3e635;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Desglose interno</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#a1a1aa;font-size:13px;">Community Manager (3 redes + DMs)</td>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:13px;text-align:right;white-space:nowrap;">$2,500</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#a1a1aa;font-size:13px;">Diseño de posts (13 a 20/mes)</td>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:13px;text-align:right;white-space:nowrap;">$1,600</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#a1a1aa;font-size:13px;">Gestión Meta Ads (fee — pauta aparte)</td>
          <td style="padding:6px 12px;border-bottom:1px solid #2a2a3a;color:#e4e4e7;font-size:13px;text-align:right;white-space:nowrap;">$1,500</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:1px;background:linear-gradient(90deg,#8b5cf6,#06b6d4);"></td>
        </tr>
        <tr style="background:#1a1a2e;">
          <td style="padding:12px;color:#fff;font-size:14px;font-weight:700;">Estimado (mensual)</td>
          <td style="padding:12px;text-align:right;">
            <span style="font-size:18px;font-weight:900;color:#a78bfa;">
              $5,600 – $6,440 MXN
            </span>
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:11px;color:#71717a;letter-spacing:2px;text-transform:uppercase;">Notas del cliente</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.6;">Tenemos 3 desarrollos activos en Tulum y queremos impulsar redes + anuncios para el lanzamiento de la nueva fase en mayo.</p>
    </div>

    <div style="text-align:center;padding:8px 0 16px;">
      <a href="https://wa.me/529981234567"
        style="display:inline-block;padding:12px 28px;border-radius:100px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:14px;font-weight:700;text-decoration:none;">
        Responder por WhatsApp →
      </a>
    </div>

    <p style="text-align:center;color:#3f3f46;font-size:11px;margin-top:8px;">junmkt.com · Solicitud recibida automáticamente</p>
  </div>
</body>
</html>`

  const clientHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#1a0a3a,#0a1a2a);border:1px solid #2a2a3a;border-radius:16px;padding:32px 24px;margin-bottom:20px;text-align:center;">
      <img src="https://junmkt.com/logo.png" alt="JUN" style="height:36px;width:auto;filter:invert(1) brightness(1.1);display:block;margin:0 auto 8px;" />
      <p style="margin:0;font-size:12px;color:#8b5cf6;letter-spacing:3px;text-transform:uppercase;">Agencia de Marketing Digital</p>
    </div>

    <div style="background:#111118;border:1px solid #2a2a3a;border-radius:16px;padding:28px 24px;margin-bottom:16px;">
      <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#fff;">Hola, Carlos</p>
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

    <div style="text-align:center;margin-bottom:20px;">
      <a href="https://wa.me/529851089671"
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

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-2">Preview de correos</h1>
          <p className="text-white/40 text-sm">Esta página es solo para previsualizar — elimínala antes de producción</p>
        </div>

        {/* Admin email */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">INTERNO</span>
            <p className="text-white/60 text-sm">Correo que recibe Jimmy en <span className="text-white">informes@junmkt.com</span></p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              srcDoc={adminHtml}
              className="w-full"
              style={{ height: '820px', background: '#09090b' }}
              title="Admin email preview"
            />
          </div>
        </div>

        {/* Client email */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">CLIENTE</span>
            <p className="text-white/60 text-sm">Confirmación automática que recibe el cliente</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 max-w-lg">
            <iframe
              srcDoc={clientHtml}
              className="w-full"
              style={{ height: '560px', background: '#09090b' }}
              title="Client email preview"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
