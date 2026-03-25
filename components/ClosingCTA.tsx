'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const ClosingCTA = () => {
  return (
    <section className="section section-dark">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center space-y-10"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Tu proyecto no necesita verse como todos. Necesita una estrategia que lo haga avanzar mejor.
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            El primer paso es entender dónde estás hoy y hacia dónde necesitas llegar. Por eso ofrecemos
            un diagnóstico estratégico sin compromiso: un análisis profundo de tu situación digital y un
            plan claro de cómo JUN puede ayudarte.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col md:flex-row gap-4 justify-center pt-6"
          >
            <a href="#contacto" className="btn btn-primary">
              Solicita tu diagnóstico estratégico
            </a>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN!%20Quisiera%20conocer%20m%C3%A1s%20sobre%20vuestros%20servicios%20de%20crecimiento%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Hablar por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
