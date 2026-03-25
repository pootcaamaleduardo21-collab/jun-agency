export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-jun-accent/10">
      <div className="container-max flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-jun-black rounded-sm flex items-center justify-center">
            <span className="text-jun-sand font-bold text-lg">JUN</span>
          </div>
          <span className="text-lg font-bold text-jun-black">JUN</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm text-jun-black/70 hover:text-jun-black transition">
            Servicios
          </a>
          <a href="#como-trabajamos" className="text-sm text-jun-black/70 hover:text-jun-black transition">
            Cómo trabajamos
          </a>
          <a href="#faq" className="text-sm text-jun-black/70 hover:text-jun-black transition">
            FAQ
          </a>
          <button className="cta-primary text-sm py-2 px-6">
            Contacto
          </button>
        </nav>

        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
