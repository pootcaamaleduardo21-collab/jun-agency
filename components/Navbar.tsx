'use client';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  ['Servicios', '#servicios'],
  ['Proceso', '#como-trabajamos'],
  ['Para quién', '#para-quien'],
  ['Contacto', '#formulario'],
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/junmktmx/',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61583690176384',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@junmktmx',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z"/>
      </svg>
    ),
  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          aria-label="JUN Agency — Inicio"
          className="flex items-center h-14"
        >
          <img src="/logo.png" alt="JUN Agency" className="h-14 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/70 hover:text-white transition-colors tracking-wide"
              style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: social + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-4 mr-1">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Síguenos en ${s.label}`}
                className="text-white/40 hover:text-[var(--sand)] transition-colors duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href="#formulario"
            id="nav-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm rounded-lg hover:bg-[var(--sand)] transition-all duration-300"
            style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
          >
            Diagnóstico estratégico
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              <rect width="22" height="2" rx="1" fill="currentColor"/>
              <rect y="7" width="16" height="2" rx="1" fill="currentColor"/>
              <rect y="14" width="22" height="2" rx="1" fill="currentColor"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#080808] border-t border-white/[0.08] px-6 py-8 flex flex-col gap-6"
        >
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-white/85 text-lg hover:text-[var(--sand)] transition-colors"
              style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-1">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-white/50 hover:text-[var(--sand)] transition-colors"
                onClick={closeMenu}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href="#formulario"
            onClick={closeMenu}
            className="mt-1 px-5 py-3.5 bg-white text-black text-center rounded-lg hover:bg-[var(--sand)] transition-all duration-300"
            style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
          >
            Diagnóstico estratégico
          </a>
        </div>
      )}
    </header>
  );
}
