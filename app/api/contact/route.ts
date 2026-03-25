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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, projectType, whatsapp, email, needs } = body

    // Validar que todos los campos requeridos estén presentes
    if (!name || !company || !projectType || !whatsapp || !email || !needs) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear el contenido del email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@junmkt.com',
      to: 'informes@junmkt.com',
      subject: `Nuevo contacto de ${name} - ${company}`,
      html: `
        <h2>Nuevo contacto desde JUN Landing</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa/Proyecto:</strong> ${company}</p>
        <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>¿Qué necesita mejorar?:</strong></p>
        <p>${needs.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Este mensaje fue enviado desde junmkt.com</small></p>
      `,
      replyTo: email,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    // Opcional: enviar un email de confirmación al usuario
    const confirmationEmail = {
      from: process.env.SMTP_FROM || 'noreply@junmkt.com',
      to: email,
      subject: 'Recibimos tu solicitud - JUN',
      html: `
        <h2>Hola ${name},</h2>
        <p>Gracias por tu interés en JUN. Recibimos tu solicitud y pronto nos pondremos en contacto contigo.</p>
        <p>En la Riviera Maya, construimos presencia digital con dirección.</p>
        <p>Hasta pronto,<br>El equipo JUN</p>
      `,
    }

    await transporter.sendMail(confirmationEmail)

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al enviar email:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
