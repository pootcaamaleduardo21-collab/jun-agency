'use client';
import { useState } from 'react';

interface FormData {
  nombre: string;
  empresa: string;
  tipoProyecto: string;
  whatsapp: string;
  email: string;
  necesidades: string;
}

const INITIAL: FormData = {
  nombre: '', empresa: '', tipoProyecto: '', whatsapp: '', email: '', necesidades: '',
};

const TIPO_OPCIONES = [
  { value: 'inmobiliario',    label: 'Inmobiliario / Real estate' },
  { value: 'turismo',         label: 'Turismo / Hospedaje' },
  { value: 'arquitectura',    label: 'Arquitectura / Interiorismo' },
  { value: 'gastronomia',     label: 'Gastronomía / Beach club' },
  { value: 'broker',          label: 'Broker / Firma comercial' },
  { value: 'marca',           label: 'Marca / Empresa' },
  { value: 'otro',            label: 'Otro' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!formData.nombre.trim())    e.nombre = 'Campo requerido';
    if (!formData.empresa.trim())   e.empresa = 'Campo requerido';
    if (!formData.tipoProyecto)     e.tipoProyecto = 'Selecciona una opción';
    if (!formData.whatsapp.trim())  e.whatsapp = 'Campo requerido';
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      e.email = 'Correo inválido';
    }
    if (!formData.necesidades.trim()) e.necesidades = 'Campo requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        setFormData(INITIAL);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-transparent border-b py-4 text-white placeholder-white/25 text-sm transition-colors duration-300 outline-none ${
      errors[field]
        ? 'border-red-400/60'
        : 'border-white/15 focus:border-[var(--sand)]'
    }`;

  return (
    <section id="formulario" className="bg-[#080808] py-24 px-6 md:px-12" aria-label="Formulario de contacto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Left col ── */}
          <div className="lg:sticky lg:top-28">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--sand)', fontWeight: 700 }}
            >
              Hablemos
            </p>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              Hablemos de tu proyecto
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Cuéntanos qué necesitas. Te contactamos en menos de 24 horas con
              una propuesta inicial.
            </p>

            <div className="space-y-6">
              <a
                href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-link"
                className="flex items-center gap-4 group"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <span style={{ color: 'var(--sand)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.945 9.945 0 01-4.964-1.32l-.357-.212-3.678.964.981-3.595-.232-.369A9.941 9.941 0 012.06 12.03c0-5.493 4.478-9.971 9.971-9.971s9.971 4.478 9.971 9.971-4.478 9.97-9.973 9.85z"/>
                  </svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/25 mb-0.5" style={{ fontWeight: 700 }}>WhatsApp</div>
                  <div className="text-sm group-hover:text-[var(--sand)] transition-colors" style={{ fontWeight: 600 }}>+52 985 108 9671</div>
                </div>
              </a>

              <a
                href="mailto:informes@junmkt.com"
                className="flex items-center gap-4 group"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <span style={{ color: 'var(--sand)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/25 mb-0.5" style={{ fontWeight: 700 }}>Correo</div>
                  <div className="text-sm group-hover:text-[var(--sand)] transition-colors" style={{ fontWeight: 600 }}>informes@junmkt.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Right col: Form ── */}
          <div>
            {status === 'success' ? (
              <div className="border border-[var(--sand)]/25 rounded-2xl p-14 text-center">
                <div className="mb-5" style={{ color: 'var(--sand)' }}>
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>Mensaje recibido</h3>
                <p className="text-white/50 text-base">Te contactamos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="nombre" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>Nombre completo</label>
                  <input id="nombre" type="text" name="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} className={inputClass('nombre')} autoComplete="name" />
                  {errors.nombre && <p className="text-red-400 text-xs mt-1.5">{errors.nombre}</p>}
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="empresa" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>Empresa o proyecto</label>
                  <input id="empresa" type="text" name="empresa" placeholder="Nombre de tu empresa o proyecto" value={formData.empresa} onChange={handleChange} className={inputClass('empresa')} autoComplete="organization" />
                  {errors.empresa && <p className="text-red-400 text-xs mt-1.5">{errors.empresa}</p>}
                </div>

                {/* Tipo de proyecto */}
                <div>
                  <label htmlFor="tipoProyecto" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>Tipo de proyecto</label>
                  <select
                    id="tipoProyecto"
                    name="tipoProyecto"
                    value={formData.tipoProyecto}
                    onChange={handleChange}
                    className={`${inputClass('tipoProyecto')} bg-[#080808]`}
                    style={{ appearance: 'none' }}
                  >
                    <option value="">Selecciona...</option>
                    {TIPO_OPCIONES.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.tipoProyecto && <p className="text-red-400 text-xs mt-1.5">{errors.tipoProyecto}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>WhatsApp</label>
                  <input id="whatsapp" type="tel" name="whatsapp" placeholder="+52 985 000 0000" value={formData.whatsapp} onChange={handleChange} className={inputClass('whatsapp')} autoComplete="tel" />
                  {errors.whatsapp && <p className="text-red-400 text-xs mt-1.5">{errors.whatsapp}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>Correo electrónico</label>
                  <input id="email" type="email" name="email" placeholder="tu@correo.com" value={formData.email} onChange={handleChange} className={inputClass('email')} autoComplete="email" />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                {/* Necesidades */}
                <div>
                  <label htmlFor="necesidades" className="block text-xs uppercase tracking-widest text-white/30 mb-2" style={{ fontWeight: 700 }}>¿Qué necesitas mejorar hoy?</label>
                  <textarea
                    id="necesidades"
                    name="necesidades"
                    placeholder="Describe brevemente tu situación actual y qué buscas lograr..."
                    rows={4}
                    value={formData.necesidades}
                    onChange={handleChange}
                    className={`${inputClass('necesidades')} resize-none`}
                  />
                  {errors.necesidades && <p className="text-red-400 text-xs mt-1.5">{errors.necesidades}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">
                    Hubo un error al enviar. Escríbenos por{' '}
                    <a
                      href="https://wa.me/9851089671"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      WhatsApp
                    </a>.
                  </p>
                )}

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black text-sm rounded-lg transition-all duration-300 hover:bg-[var(--sand)] disabled:opacity-50"
                  style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar diagnóstico'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
