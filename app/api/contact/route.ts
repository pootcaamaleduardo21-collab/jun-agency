import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface FormPayload {
  nombre: string;
  empresa: string;
  tipoProyecto: string;
  whatsapp: string;
  email: string;
  necesidades: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Servicio de email no configurado.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: FormPayload = await req.json();

    const { nombre, empresa, tipoProyecto, whatsapp, email, necesidades } = body;

    // Basic server-side validation
    if (!nombre || !empresa || !email || !whatsapp || !necesidades) {
      return NextResponse.json({ error: 'Campos requeridos incompletos.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    // ── 1. Send email via Resend ───────────────────────────────────
    const { error: emailError } = await resend.emails.send({
      from: 'JUN Agency <noreply@junmkt.com>',
      to: ['informes@junmkt.com'],
      replyTo: email,
      subject: `Nuevo diagnóstico estratégico — ${nombre} (${empresa})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-top:0;color:#080808">Nueva solicitud de diagnóstico</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;width:40%">Nombre</td><td style="padding:10px 0;border-bottom:1px solid #eee">${nombre}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700">Empresa / Proyecto</td><td style="padding:10px 0;border-bottom:1px solid #eee">${empresa}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700">Tipo de proyecto</td><td style="padding:10px 0;border-bottom:1px solid #eee">${tipoProyecto || 'No especificado'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #eee">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700">Correo</td><td style="padding:10px 0;border-bottom:1px solid #eee">${email}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px">
            <strong>¿Qué necesita mejorar?</strong>
            <p style="margin-top:8px;white-space:pre-wrap">${necesidades}</p>
          </div>
          <p style="margin-top:24px;color:#888;font-size:12px">Formulario enviado desde junmkt.com</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('[Resend error]', emailError);
      return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
    }

    // ── 2. Fire CRM webhook (optional) ────────────────────────────
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    if (crmWebhookUrl) {
      try {
        await fetch(crmWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'jun-agency-landing',
            timestamp: new Date().toISOString(),
            ...body,
          }),
        });
      } catch (webhookErr) {
        // Non-critical: log but don't fail the request
        console.error('[CRM webhook error]', webhookErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API error]', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
