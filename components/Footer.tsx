export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8 px-6 md:px-12 py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div
              className="text-xl text-white mb-4 tracking-[0.08em]"
              style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif', letterSpacing: '0.1em' }}
            >
              JUN
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Agencia de marketing digital especializada en crecimiento, estrategia
              y conversión para real estate y turismo en la Riviera Maya.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-white/25 mb-5"
              style={{ fontWeight: 700 }}
            >
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
                  <a
                    href={href}
                    className="text-sm text-white/50 hover:text-[var(--sand)] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-white/25 mb-5"
              style={{ fontWeight: 700 }}
            >
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:informes@junmkt.com"
                  className="text-sm text-white/50 hover:text-[var(--sand)] transition-colors"
                >
                  informes@junmkt.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+529851089671"
                  className="text-sm text-white/50 hover:text-[var(--sand)] transition-colors"
                >
                  +52 985 108 9671
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20detalles%20para%20mi%20negocio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--sand)', fontWeight: 700 }}
                >
                  Hablar por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} JUN Agency. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20">La Riviera Maya, México</p>
        </div>
      </div>
    </footer>
  );
}
