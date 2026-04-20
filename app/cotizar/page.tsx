'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ─── Types ─────────────────────────────────────────────────────────── */
type ClientType = 'agente' | 'empresa' | 'otro' | ''
type ServiceKey = 'cm' | 'posts' | 'reels' | 'ads' | 'produccion' | 'drone' | 'tour360'
type AdsPlat = 'meta' | 'google' | 'tiktok'
type ProdItem = 'foto' | 'video'

interface QuoteForm {
  clientType: ClientType
  services: ServiceKey[]
  cmRedes: '1-2' | '3' | '4+' | ''
  cmDMs: 'si' | 'no' | ''
  postsCount: 'hasta-12' | '13-20' | '21-30' | 'mas-30' | ''
  reelsCount: '1-4' | '5-8' | '9-12' | 'mas-12' | ''
  adsPlatforms: AdsPlat[]
  produccionItems: ProdItem[]
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  notas: string
}

const INITIAL: QuoteForm = {
  clientType: '',
  services: [],
  cmRedes: '', cmDMs: '',
  postsCount: '', reelsCount: '',
  adsPlatforms: [], produccionItems: [],
  nombre: '', empresa: '', whatsapp: '', email: '', notas: '',
}

const TOTAL_STEPS = 4

/* ─── Small helpers ─────────────────────────────────────────────────── */
function OptionCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-white'
          : 'border-[#2a2a3a] bg-[#18181f] text-white/60 hover:border-[#8b5cf6]/40 hover:text-white/80'
      }`}
    >
      {children}
    </button>
  )
}

function ServiceCard({ id, icon, label, desc, selected, onToggle }: {
  id: ServiceKey; icon: React.ReactNode; label: string; desc: string; selected: boolean; onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
        selected
          ? 'border-[#8b5cf6] bg-[#8b5cf6]/10'
          : 'border-[#2a2a3a] bg-[#18181f] hover:border-[#8b5cf6]/40'
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' }}>
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <div className={`${selected ? 'text-[#8b5cf6]' : 'text-white/40'} transition-colors`}>{icon}</div>
      <div>
        <p className={`font-bold text-sm ${selected ? 'text-white' : 'text-white/70'}`}>{label}</p>
        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </button>
  )
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function CotizarPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<QuoteForm>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  const set = (key: keyof QuoteForm, val: unknown) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const toggleService = (s: ServiceKey) =>
    set('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s])

  const toggleArr = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  /* Validation per step */
  const canProceed = () => {
    if (step === 0) return form.clientType !== ''
    if (step === 1) return form.services.length > 0
    if (step === 2) {
      if (form.services.includes('cm') && !form.cmRedes) return false
      if (form.services.includes('posts') && !form.postsCount) return false
      if (form.services.includes('reels') && !form.reelsCount) return false
      if (form.services.includes('ads') && form.adsPlatforms.length === 0) return false
      if ((form.services.includes('produccion')) && form.produccionItems.length === 0) return false
      return true
    }
    if (step === 3) return !!(form.nombre && form.empresa && form.whatsapp && form.email)
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErr('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else setErr('Hubo un error. Por favor intenta de nuevo o escríbenos por WhatsApp.')
    } catch {
      setErr('Hubo un error de conexión. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Progress bar ── */
  const progress = ((step) / (TOTAL_STEPS - 1)) * 100

  if (submitted) return <SuccessScreen nombre={form.nombre} />

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="JUN" className="h-9 w-auto" style={{ filter: 'invert(1) brightness(1.1)' }} />
          <span className="text-xs text-white/35 font-medium tracking-wider uppercase">
            Solicitud de cotización
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-2xl">

          {/* Step label */}
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6 text-center">
            Paso {step + 1} de {TOTAL_STEPS}
          </p>

          {/* ── STEP 0: Tipo de cliente ── */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl font-black text-white text-center mb-2">
                ¿Cómo describes tu proyecto?
              </h1>
              <p className="text-white/45 text-center mb-8 text-sm sm:text-base">
                Esto nos ayuda a entender mejor lo que necesitas
              </p>
              <div className="space-y-3">
                {[
                  { val: 'agente' as ClientType, label: 'Soy agente o asesor inmobiliario', desc: 'Quiero promocionar mis propiedades y crecer mi presencia digital' },
                  { val: 'empresa' as ClientType, label: 'Represento una empresa o marca', desc: 'Hotel, restaurante, desarrolladora, marca o negocio establecido' },
                  { val: 'otro' as ClientType, label: 'Tengo un negocio o emprendimiento', desc: 'Tienda, servicio, consultora u otro tipo de proyecto' },
                ].map(opt => (
                  <OptionCard key={opt.val} selected={form.clientType === opt.val} onClick={() => set('clientType', opt.val)}>
                    <p className="font-bold text-sm mb-0.5">{opt.label}</p>
                    <p className="text-xs text-white/40">{opt.desc}</p>
                  </OptionCard>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Servicios ── */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl font-black text-white text-center mb-2">
                ¿Qué servicios necesitas?
              </h1>
              <p className="text-white/45 text-center mb-8 text-sm sm:text-base">
                Puedes seleccionar más de uno
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'cm' as ServiceKey, label: 'Community Manager',
                    desc: 'Gestión de cuentas y comunidad',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  },
                  {
                    id: 'posts' as ServiceKey, label: 'Diseño de posts',
                    desc: 'Piezas estáticas para feed',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  },
                  {
                    id: 'reels' as ServiceKey, label: 'Reels y video',
                    desc: 'Contenido en movimiento',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  },
                  {
                    id: 'ads' as ServiceKey, label: 'Publicidad digital',
                    desc: 'Meta, Google o TikTok Ads',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                  },
                  {
                    id: 'produccion' as ServiceKey, label: 'Foto y video',
                    desc: 'Sesión profesional en tierra',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  },
                  {
                    id: 'drone' as ServiceKey, label: 'Tomas con drone',
                    desc: 'Foto y video aéreo',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  },
                  {
                    id: 'tour360' as ServiceKey, label: 'Recorrido 360°',
                    desc: 'Tour virtual interactivo',
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  },
                ].map(svc => (
                  <ServiceCard
                    key={svc.id}
                    id={svc.id}
                    icon={svc.icon}
                    label={svc.label}
                    desc={svc.desc}
                    selected={form.services.includes(svc.id)}
                    onToggle={() => toggleService(svc.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Detalles ── */}
          {step === 2 && (
            <div className="animate-fade-in-up space-y-8">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Cuéntanos un poco más</h1>
                <p className="text-white/45 text-sm sm:text-base">Esto nos ayuda a preparar una propuesta precisa</p>
              </div>

              {/* CM */}
              {form.services.includes('cm') && (
                <DetailSection title="Community Manager" color="#8b5cf6">
                  <p className="text-xs text-white/40 mb-3">¿En cuántas redes sociales necesitas gestión?</p>
                  <div className="space-y-2">
                    {[
                      { val: '1-2', label: '1 o 2 redes', sub: 'Instagram + Facebook' },
                      { val: '3', label: '3 redes', sub: 'IG + FB + TikTok' },
                      { val: '4+', label: '4 o más redes', sub: 'Incluye LinkedIn u otras' },
                    ].map(o => (
                      <OptionCard key={o.val} selected={form.cmRedes === o.val} onClick={() => set('cmRedes', o.val)}>
                        <span className="font-semibold text-sm">{o.label}</span>
                        <span className="text-xs text-white/40 ml-2">{o.sub}</span>
                      </OptionCard>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-4 mb-3">¿Incluye respuesta a mensajes directos (DMs)?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ val: 'si', label: 'Sí, inclúyelo' }, { val: 'no', label: 'Solo comentarios' }].map(o => (
                      <OptionCard key={o.val} selected={form.cmDMs === o.val} onClick={() => set('cmDMs', o.val)}>
                        <span className="font-semibold text-sm">{o.label}</span>
                      </OptionCard>
                    ))}
                  </div>
                </DetailSection>
              )}

              {/* Posts */}
              {form.services.includes('posts') && (
                <DetailSection title="Diseño de posts" color="#06b6d4">
                  <p className="text-xs text-white/40 mb-3">¿Cuántos posts estáticos al mes necesitas aproximadamente?</p>
                  <div className="space-y-2">
                    {[
                      { val: 'hasta-12', label: 'Hasta 12 posts', sub: '~3 por semana' },
                      { val: '13-20', label: '13 a 20 posts', sub: '~4-5 por semana' },
                      { val: '21-30', label: '21 a 30 posts', sub: '~1 diario' },
                      { val: 'mas-30', label: 'Más de 30', sub: 'Volumen alto' },
                    ].map(o => (
                      <OptionCard key={o.val} selected={form.postsCount === o.val} onClick={() => set('postsCount', o.val)}>
                        <span className="font-semibold text-sm">{o.label}</span>
                        <span className="text-xs text-white/40 ml-2">{o.sub}</span>
                      </OptionCard>
                    ))}
                  </div>
                </DetailSection>
              )}

              {/* Reels */}
              {form.services.includes('reels') && (
                <DetailSection title="Reels y video" color="#a3e635">
                  <p className="text-xs text-white/40 mb-3">¿Cuántos reels o videos al mes?</p>
                  <div className="space-y-2">
                    {[
                      { val: '1-4', label: '1 a 4 reels', sub: '1 por semana' },
                      { val: '5-8', label: '5 a 8 reels', sub: '2 por semana' },
                      { val: '9-12', label: '9 a 12 reels', sub: '3 por semana' },
                      { val: 'mas-12', label: 'Más de 12', sub: 'Producción constante' },
                    ].map(o => (
                      <OptionCard key={o.val} selected={form.reelsCount === o.val} onClick={() => set('reelsCount', o.val)}>
                        <span className="font-semibold text-sm">{o.label}</span>
                        <span className="text-xs text-white/40 ml-2">{o.sub}</span>
                      </OptionCard>
                    ))}
                  </div>
                </DetailSection>
              )}

              {/* Ads */}
              {form.services.includes('ads') && (
                <DetailSection title="Publicidad digital" color="#8b5cf6">
                  <p className="text-xs text-white/40 mb-3">¿En qué plataformas? (puedes seleccionar varias)</p>
                  <div className="space-y-2">
                    {[
                      { val: 'meta' as AdsPlat, label: 'Meta Ads', sub: 'Facebook e Instagram' },
                      { val: 'google' as AdsPlat, label: 'Google Ads', sub: 'Search, Display y YouTube' },
                      { val: 'tiktok' as AdsPlat, label: 'TikTok Ads', sub: 'TikTok for Business' },
                    ].map(o => (
                      <OptionCard
                        key={o.val}
                        selected={form.adsPlatforms.includes(o.val)}
                        onClick={() => set('adsPlatforms', toggleArr(form.adsPlatforms, o.val))}
                      >
                        <span className="font-semibold text-sm">{o.label}</span>
                        <span className="text-xs text-white/40 ml-2">{o.sub}</span>
                      </OptionCard>
                    ))}
                  </div>
                  <p className="text-[11px] text-white/30 mt-3 leading-relaxed">
                    * El presupuesto de pauta (lo que se le paga a Meta/Google/TikTok) va aparte y lo defines tú.
                  </p>
                </DetailSection>
              )}

              {/* Producción terrestre */}
              {form.services.includes('produccion') && (
                <DetailSection title="Fotografía y video profesional" color="#06b6d4">
                  <p className="text-xs text-white/40 mb-3">¿Qué tipo de producción necesitas? (puedes elegir ambas)</p>
                  <div className="space-y-2">
                    {[
                      { val: 'foto' as ProdItem, label: 'Fotografía', sub: 'Fotos profesionales de espacios, propiedades o producto' },
                      { val: 'video' as ProdItem, label: 'Video / Reel', sub: 'Video promocional o contenido para redes' },
                    ].map(o => (
                      <OptionCard
                        key={o.val}
                        selected={form.produccionItems.includes(o.val)}
                        onClick={() => set('produccionItems', toggleArr(form.produccionItems, o.val))}
                      >
                        <span className="font-semibold text-sm">{o.label}</span>
                        <span className="text-xs text-white/40 ml-2">{o.sub}</span>
                      </OptionCard>
                    ))}
                  </div>
                </DetailSection>
              )}

              {/* Drone */}
              {form.services.includes('drone') && (
                <DetailSection title="Tomas con drone" color="#a3e635">
                  <p className="text-sm text-white/60 leading-relaxed">
                    Capturamos tomas aéreas en foto y video 4K. El costo varía según la duración del vuelo y la ubicación. Te prepararemos una cotización específica.
                  </p>
                </DetailSection>
              )}

              {/* 360° */}
              {form.services.includes('tour360') && (
                <DetailSection title="Recorrido virtual 360°" color="#8b5cf6">
                  <p className="text-sm text-white/60 leading-relaxed">
                    Tour interactivo embebible en tu sitio web. El costo depende del tamaño del espacio y número de puntos de captura. Te cotizamos en detalle.
                  </p>
                </DetailSection>
              )}
            </div>
          )}

          {/* ── STEP 3: Datos de contacto ── */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl font-black text-white text-center mb-2">Tus datos de contacto</h1>
              <p className="text-white/45 text-center mb-8 text-sm sm:text-base">
                Te enviamos la propuesta directamente
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={e => set('nombre', e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Empresa o proyecto *</label>
                    <input
                      type="text"
                      value={form.empresa}
                      onChange={e => set('empresa', e.target.value)}
                      placeholder="Nombre del proyecto"
                      className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">WhatsApp *</label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={e => set('whatsapp', e.target.value)}
                      placeholder="+52 984 000 0000"
                      className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Correo electrónico *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">¿Algo más que quieras contarnos? <span className="text-white/25 normal-case font-normal">(opcional)</span></label>
                  <textarea
                    value={form.notas}
                    onChange={e => set('notas', e.target.value)}
                    placeholder="Cuéntanos sobre tu proyecto, tus objetivos o cualquier detalle que consideres importante..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-[#18181f] border border-[#2a2a3a] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none"
                  />
                </div>

                {err && <p className="text-red-400 text-sm text-center">{err}</p>}
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className={`mt-8 flex gap-3 ${step === 0 ? 'justify-center' : 'justify-between'}`}>
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 rounded-2xl border border-[#2a2a3a] text-white/60 text-sm font-semibold hover:border-white/20 hover:text-white transition-all"
              >
                ← Atrás
              </button>
            )}
            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => canProceed() && setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-2xl text-white text-sm font-bold transition-all ${
                  canProceed()
                    ? 'opacity-100 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5'
                    : 'opacity-30 cursor-not-allowed'
                }`}
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' }}
              >
                Continuar →
              </button>
            ) : (
              <button
                onClick={() => canProceed() && handleSubmit()}
                disabled={!canProceed() || loading}
                className={`flex-1 sm:flex-none px-10 py-3 rounded-2xl text-white text-sm font-bold transition-all ${
                  canProceed() && !loading
                    ? 'opacity-100 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5'
                    : 'opacity-40 cursor-not-allowed'
                }`}
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' }}
              >
                {loading ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            )}
          </div>

          {/* Legal note on last step */}
          {step === TOTAL_STEPS - 1 && (
            <p className="text-center text-white/25 text-xs mt-4">
              Al enviar confirmas que deseas recibir una propuesta de JUN. Sin compromisos.
            </p>
          )}
        </div>
      </div>

      {/* Footer minimal */}
      <div className="border-t border-white/5 py-4 text-center">
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} JUN · <Link href="/" className="hover:text-white/40 transition-colors">junmkt.com</Link></p>
      </div>
    </div>
  )
}

/* ─── Detail section wrapper ─────────────────────────────────────────── */
function DetailSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-[#18181f] border border-[#2a2a3a]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full" style={{ background: color }} />
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
      {children}
    </div>
  )
}

/* ─── Success screen ─────────────────────────────────────────────────── */
function SuccessScreen({ nombre }: { nombre: string }) {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="JUN" className="h-10 w-auto mx-auto mb-8" style={{ filter: 'invert(1) brightness(1.1)' }} />
      </div>
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' }}>
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
        ¡Listo, {nombre.split(' ')[0]}!
      </h1>
      <p className="text-white/55 max-w-sm leading-relaxed mb-2">
        Recibimos tu solicitud. Revisamos los servicios que necesitas y te contactamos en menos de 24 horas con una propuesta personalizada.
      </p>
      <p className="text-white/30 text-sm mb-10">Revisa tu correo — también te enviamos una confirmación.</p>
      <Link
        href="/"
        className="px-8 py-3 rounded-2xl border border-[#2a2a3a] text-white/60 text-sm font-semibold hover:border-white/20 hover:text-white transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
