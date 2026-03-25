'use client';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/junmktmx/',
    handle: '@junmktmx',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61583690176384',
    handle: 'JUN Agency',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@junmktmx',
    handle: '@junmktmx',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.08] px-6 md:px-12 py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="text-2xl text-white mb-4 tracking-[0.08em]"
              style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
            >
              JUN
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs mb-8">
              Agencia de marketing digital especializada en crecimiento,
              estrategia y conversión para real estate y turismo en la Riviera Maya.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Síguenos en ${s.label} — ${s.handle}`}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-white/45 border border-white/[0.12] hover:text-[var(--sand)] hover:border-[var(--sand)]/40 hover:bg-[var(--sand)]/5 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/45 mb-5" style={{ fontWeight: 700 }}>
              Navegación
            </p>
            <ul className="space-y-3">
              {[
                ['Servicios', '#servicios'],
                ['Proceso', '#como-trabajamos'],
                ['Para quién', '#para-quien'],
                ['Contacto', '#formulario'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-white/65 hover:text-[var(--sand)] transition-colors" style={{ fontWeight: 500 }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/45 mb-5" style={{ fontWeight: 700 }}>
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:informes@junmkt.com" className="text-sm text-white/65 hover:text-[var(--sand)] transition-colors">
                  informes@junmkt.com
                </a>
              </li>
              <li>
                <a href="tel:+529851089671" className="text-sm text-white/65 hover:text-[var(--sand)] transition-colors">
                  +52 985 108 9671
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--sand)', fontWeight: 700 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.945 9.945 0 01-4.964-1.32l-.357-.212-3.678.964.981-3.595-.232-.369A9.941 9.941 0 012.06 12.03c0-5.493 4.478-9.971 9.971-9.971s9.971 4.478 9.971 9.971-4.478 9.97-9.973 9.85z"/>
                  </svg>
                  Hablar por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">© {year} JUN Agency. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/35 hover:text-[var(--sand)] transition-colors"
                style={{ fontWeight: 500 }}
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/30">La Riviera Maya, México</p>
        </div>
      </div>
    </footer>
  );
}
