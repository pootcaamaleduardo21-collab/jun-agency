'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollReveal } from './useScrollReveal';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const TIPOS = [
  'Desarrollo inmobiliario',
  'Broker / Equipo inmobiliario',
  'Hotel o alojamiento',
  'Restaurante, beach club o bar',
  'Arquitectura / Interiorismo',
  'Marca de experiencia o lifestyle',
  'Otro',
];

export default function ContactForm() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fields, setFields] = useState({
    nombre: '', empresa: '', tipoProyecto: '', whatsapp: '', email: '', necesidades: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const update = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }));
  const touch  = (k: string) => setTouched(t => ({ ...t, [k]: true }));

  const errors: Record<string, string> = {};
  if (touched.nombre    && !fields.nombre.trim())    errors.nombre    = 'Escribe tu nombre';
  if (touched.email   && !/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Correo inválido';
  if (touched.tipoProyecto    && !fields.tipoProyecto)            errors.tipoProyecto    = 'Selecciona un tipo';

  const isValid = fields.nombre.trim() && fields.email && fields.tipoProyecto;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('server');
      // Navigate to thank you page with name as query param
      router.push(`/thank-you?name=${encodeURIComponent(fields.nombre)}`);
    } catch {
      setState('error');
      setErrorMsg('Ocurrió un problema. Usa el botón de WhatsApp para contactarnos directamente.');
    }
  };

  const inputClass = 'field-input';
  const labelClass = 'block text-sm mb-2 tracking-wide';
  const labelStyle = { fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontFamily: 'Satoshi, sans-serif' };

  return (
    <section
      ref={sectionRef}
      id="formulario"
      className="relative bg-[#080808] py-24 px-6 md:px-12 overflow-hidden"
      aria-labelledby="form-heading"
    >
      {/* Warm background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(212,175,154,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Context */}
          <div className="reveal">
            <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: 'var(--sand)', fontWeight: 700 }}>
              Hablemos
            </p>
            <h2 id="form-heading" className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700, lineHeight: 1.05 }}>
              Hablemos de<br />tu proyecto
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.70)' }}>
              Cuéntanos qué necesitas. Te contactamos en menos de 24 horas con una propuesta inicial.
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-10">
              <a
                href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[var(--sand)]/20"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--sand)' }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.945 9.945 0 01-4.964-1.32l-.357-.212-3.678.964.981-3.595-.232-.369A9.941 9.941 0 012.06 12.03c0-5.493 4.478-9.971 9.971-9.971s9.971 4.478 9.971 9.971-4.478 9.97-9.973 9.85z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 600 }}>WHATSAPP</div>
                  <div className="text-base group-hover:text-[var(--sand)] transition-colors" style={{ fontWeight: 700, color: '#fff' }}>+52 985 108 9671</div>
                </div>
              </a>

              <a href="mailto:informes@junmkt.com" className="flex items-center gap-4 group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[var(--sand)]/20"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--sand)' }} aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 600 }}>CORREO</div>
                  <div className="text-base group-hover:text-[var(--sand)] transition-colors" style={{ fontWeight: 700, color: '#fff' }}>informes@junmkt.com</div>
                </div>
              </a>
            </div>

            {/* Trust note */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(212,175,154,0.06)', border: '1px solid rgba(212,175,154,0.18)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                No te pedimos compromiso desde el primer mensaje. Primero entendemos tu situación,
                y si hay manera de ayudarte, te lo decimos con claridad.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="reveal reveal-delay-2 rounded-2xl p-8 md:p-10"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {state === 'success' ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(212,175,154,0.12)', border: '1px solid rgba(212,175,154,0.3)' }}
                >
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ color: 'var(--sand)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>Mensaje recibido</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Te contactaremos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="cf-nombre" className={labelClass} style={labelStyle}>Nombre completo *</label>
                  <input
                    id="cf-nombre"
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Tu nombre"
                    value={fields.nombre}
                    onChange={e => update('nombre', e.target.value)}
                    onBlur={() => touch('nombre')}
                    aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                    aria-invalid={!!errors.nombre}
                  />
                  {errors.nombre && <p id="error-nombre" className="mt-1.5 text-xs" style={{ color: '#f87171' }} role="alert">{errors.nombre}</p>}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="cf-empresa" className={labelClass} style={labelStyle}>Empresa o proyecto</label>
                  <input
                    id="cf-empresa"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="Nombre de tu empresa o proyecto"
                    value={fields.empresa}
                    onChange={e => update('empresa', e.target.value)}
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label htmlFor="cf-tipoProyecto" className={labelClass} style={labelStyle}>Tipo de proyecto *</label>
                  <select
                    id="cf-tipoProyecto"
                    className={inputClass}
                    value={fields.tipoProyecto}
                    onChange={e => update('tipoProyecto', e.target.value)}
                    onBlur={() => touch('tipoProyecto')}
                    aria-describedby={errors.tipoProyecto ? 'error-tipoProyecto' : undefined}
                    aria-invalid={!!errors.tipoProyecto}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Selecciona...</option>
                    {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.tipoProyecto && <p id="error-tipoProyecto" className="mt-1.5 text-xs" style={{ color: '#f87171' }} role="alert">{errors.tipoProyecto}</p>}
                </div>

                {/* WhatsApp + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-whatsapp" className={labelClass} style={labelStyle}>WhatsApp</label>
                    <input
                      id="cf-whatsapp"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+52 985 000 0000"
                      value={fields.whatsapp}
                      onChange={e => update('whatsapp', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={labelClass} style={labelStyle}>Correo *</label>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="tu@correo.com"
                      value={fields.email}
                      onChange={e => update('email', e.target.value)}
                      onBlur={() => touch('email')}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p id="error-email" className="mt-1.5 text-xs" style={{ color: '#f87171' }} role="alert">{errors.email}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="cf-necesidades" className={labelClass} style={labelStyle}>¿Qué necesitas mejorar hoy?</label>
                  <textarea
                    id="cf-necesidades"
                    rows={4}
                    className={inputClass}
                    style={{ resize: 'vertical', minHeight: '100px' }}
                    placeholder="Describe brevemente tu situación y qué buscas lograr..."
                    value={fields.necesidades}
                    onChange={e => update('necesidades', e.target.value)}
                  />
                </div>

                {/* Error */}
                {state === 'error' && (
                  <div
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)' }}
                    role="alert"
                  >
                    <p className="text-sm" style={{ color: '#fca5a5' }}>{errorMsg}</p>
                    <a
                      href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles%20para%20mi%20negocio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm"
                      style={{ color: 'var(--sand)', fontWeight: 700 }}
                    >
                      Abrir WhatsApp
                    </a>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'loading' || !isValid}
                  className="w-full py-4 rounded-xl text-sm transition-all duration-300"
                  style={{
                    fontWeight: 700,
                    fontFamily: 'Satoshi, sans-serif',
                    background: isValid ? 'var(--cream)' : 'rgba(255,255,255,0.08)',
                    color: isValid ? '#080808' : 'rgba(255,255,255,0.4)',
                    cursor: isValid ? 'pointer' : 'not-allowed',
                    border: isValid ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => { if (isValid) (e.currentTarget as HTMLButtonElement).style.background = 'var(--sand)'; }}
                  onMouseLeave={(e) => { if (isValid) (e.currentTarget as HTMLButtonElement).style.background = 'var(--cream)'; }}
                >
                  {state === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Solicitar diagnóstico estratégico'}
                </button>

                <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Sin compromiso. Respuesta en menos de 24 horas.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
