'use client';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  ['Servicios', '#servicios'],
  ['Proceso', '#como-trabajamos'],
  ['Para quién', '#para-quien'],
  ['Contacto', '#formulario'],
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
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logotype */}
        <a
          href="#"
          aria-label="JUN Agency — Inicio"
          className="text-xl tracking-[0.08em] text-white hover:text-[var(--sand)] transition-colors duration-300"
          style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif', letterSpacing: '0.1em' }}
        >
          JUN
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
              style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#formulario"
          id="nav-cta"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm rounded-lg hover:bg-[var(--sand)] transition-all duration-300"
          style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
        >
          Diagnóstico estratégico
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-md"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
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
          className="md:hidden bg-[#080808] border-t border-white/8 px-6 py-8 flex flex-col gap-6"
        >
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-white/80 text-lg hover:text-[var(--sand)] transition-colors"
              style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#formulario"
            onClick={closeMenu}
            className="mt-2 px-5 py-3.5 bg-white text-black text-center rounded-lg hover:bg-[var(--sand)] transition-all duration-300"
            style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
          >
            Diagnóstico estratégico
          </a>
        </div>
      )}
    </header>
  );
}
