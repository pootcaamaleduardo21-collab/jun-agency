export default function Footer() {
  return (
    <footer className="bg-jun-dark text-white py-16">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="JUN"
                className="h-10 w-auto"
                style={{ filter: 'invert(1) brightness(1.1)' }}
              />
            </div>
            <p className="text-sm text-white/60">
              Especialistas en crecimiento digital para real estate y turismo.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#servicios" className="hover:text-white transition">Servicios</a></li>
              <li><a href="#como-trabajamos" className="hover:text-white transition">Cómo trabajamos</a></li>
              <li><a href="#faq" className="hover:text-white transition">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Contacto</h3>
            <div className="text-sm text-white/60 space-y-2">
              <p>Email: informes@junmkt.com</p>
              <p>WhatsApp: +52 985 108 9671</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61583690176384"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-jun-sand hover:text-jun-dark rounded-2xl flex items-center justify-center transition"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/junmktmx/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-jun-sand hover:text-jun-dark rounded-2xl flex items-center justify-center transition"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.205.643c-.643.25-1.179.547-1.691 1.059-.509.512-.806 1.048-1.059 1.691-.31.7-.511 1.57-.571 2.848C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.571 2.848.25.643.547 1.179 1.059 1.691.513.509 1.048.806 1.691 1.059.7.31 1.57.511 2.847.571C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.848-.571.692-.25 1.179-.547 1.691-1.059.509-.512.806-1.048 1.059-1.691.31-.7.511-1.571.571-2.848.057-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.149-.571-2.848-.25-.692-.547-1.179-1.059-1.691-.512-.509-1.048-.806-1.691-1.059-.7-.31-1.571-.511-2.848-.571C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07l.029.002zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@junmktmx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-jun-sand hover:text-jun-dark rounded-2xl flex items-center justify-center transition"
                title="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/60">
            &copy; 2026 JUN. Todos los derechos reservados. Especialistas en crecimiento digital para Riviera Maya.
          </p>
        </div>
      </div>
    </footer>
  )
}
