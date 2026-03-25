'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    projectType: '',
    whatsapp: '',
    email: '',
    needs: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          company: '',
          projectType: '',
          whatsapp: '',
          email: '',
          needs: '',
        })

        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-jun-warm section-padding">
      <div className="container-max max-w-2xl">
        <h2 className="heading-2 text-center text-jun-black mb-12">
          Hablemos de tu proyecto
        </h2>

        {submitted ? (
          <div className="p-8 bg-white border-2 border-jun-sand rounded-sm text-center">
            <h3 className="text-xl font-bold text-jun-black mb-2">
              ¡Gracias por tu interés!
            </h3>
            <p className="text-jun-black/80">
              Recibimos tu información. Nos pondremos en contacto en breve.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-sm border border-jun-accent/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-jun-black mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-jun-black mb-2"
                >
                  Empresa o Proyecto
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all"
                  placeholder="Nombre del proyecto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-semibold text-jun-black mb-2"
                >
                  Tipo de Proyecto
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="real-estate">Real Estate / Inmobiliario</option>
                  <option value="turismo">Turismo / Hotelería</option>
                  <option value="arquitectura">Arquitectura / Despacho</option>
                  <option value="f-b">Restaurante / Beach Club</option>
                  <option value="marca">Marca / Agencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-semibold text-jun-black mb-2"
                >
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all"
                  placeholder="+52 985 108 9671"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-jun-black mb-2"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="needs"
                className="block text-sm font-semibold text-jun-black mb-2"
              >
                ¿Qué necesitas mejorar hoy?
              </label>
              <textarea
                id="needs"
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-sm border border-jun-accent/20 focus:outline-none focus:border-jun-sand focus:ring-1 focus:ring-jun-sand transition-all resize-none"
                placeholder="Cuéntanos brevemente qué desafío enfrenta tu proyecto en digital..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cta-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Solicitar diagnóstico'}
            </button>

            <p className="text-xs text-jun-black/60 text-center mt-4">
              Al enviar este formulario aceptas que nos pongamos en contacto para discutir tu proyecto.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
