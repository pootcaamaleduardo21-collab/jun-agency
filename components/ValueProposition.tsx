'use client';

import { motion } from 'framer-motion';

const ValueProposition = () => {
  return (
    <section className="section section-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-10"
        >
          {/* Main Title */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              No hacemos marketing por hacerlo.
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="gradient-text">
                Construimos una presencia digital con intención.
              </span>
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-white text-xl"
            >
              JUN une <span className="font-bold">estrategia</span>, <span className="font-bold">producción de contenido</span> y{' '}
              <span className="font-bold">ejecución digital</span> para que proyectos, espacios y marcas se posicionen
              como referentes en un mercado competitivo.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Entendemos que comunicar valor en Riviera Maya es complejo. El mercado es exigente, la competencia es
              visual, y los prospectos buscan proyectos que transmitan claridad, seguridad y diferenciación real.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Por eso cada estrategia comienza con un diagnóstico profundo. Identificamos qué comunicas, cómo lo
              comunicas, y qué ajustes necesitas para convertir mejor.
            </motion.p>
          </div>

          {/* Key Phrase */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mac-window p-8 md:p-10"
          >
            <div className="mac-header -mx-8 -mt-10 md:-mx-10 md:-mt-10 mb-6">
              <div className="mac-dot mac-dot-red" />
              <div className="mac-dot mac-dot-yellow" />
              <div className="mac-dot mac-dot-green" />
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">
                Más que presencia: dirección, percepción y crecimiento digital.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
