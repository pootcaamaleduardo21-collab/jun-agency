'use client'

import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-jun-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="JUN"
            className="h-12 w-auto"
            style={{ filter: 'invert(1) brightness(1.1)' }}
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
            Servicios
          </a>
          <a href="#como-trabajamos" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
            Cómo trabajamos
          </a>
          <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
            FAQ
          </a>
          <a href="#contacto" className="cta-primary text-sm py-2.5 px-5">
            Contacto
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-jun-dark border-t border-white/5 px-4 pb-5 pt-3 space-y-3">
          {['Servicios', 'Cómo trabajamos', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item === 'Cómo trabajamos' ? 'como-trabajamos' : item === 'FAQ' ? 'faq' : 'servicios'}`}
              className="block text-sm text-white/70 hover:text-white py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contacto"
            className="block cta-primary text-center text-sm py-3 mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  )
}
