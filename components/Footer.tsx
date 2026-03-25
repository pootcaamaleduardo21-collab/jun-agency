'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12 md:py-16 px-5 md:px-12">
      <div className="container max-w-6xl">
        {/* Main Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 pb-12 border-b border-white/10"
        >
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">JUN</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Agencia especializada en crecimiento digital para real estate y turismo en Riviera Maya.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              JUN significa "el primero" en maya.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href="mailto:informes@jun.com.mx"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  informes@jun.com.mx
                </a>
              </div>
              <div>
                <p className="text-gray-400">WhatsApp</p>
                <a
                  href="https://wa.me/9851089671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  +52 985 1089 671
                </a>
              </div>
              <div>
                <p className="text-gray-400">Ubicación</p>
                <p className="text-white">Riviera Maya, Quintana Roo, México</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#contacto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Solicitar diagnóstico
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9851089671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hablar por WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servicios
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
          <p>
            © {currentYear} JUN. Todos los derechos reservados. Construimos presencia digital con intención.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacidad
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Términos
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
