'use client';

import { motion } from 'framer-motion';

const BrandConnection = () => {
  return (
    <section className="section section-dark">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-10 text-center"
        >
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Inspirados por una región que exige marcas mejor construidas
          </h2>

          {/* Description */}
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Riviera Maya no es solo un destino. Es un mercado competitivo donde{' '}
              <span className="font-bold text-white">el valor, la claridad y la diferenciación</span> definen quién
              prospera y quién queda atrás.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Los proyectos que ganan aquí son los que comunican con seguridad, que entienden su posicionamiento
              real y que construyen presencia digital con intención.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              JUN nace de esa realidad. Somos el aliado que entiende el mercado local, combina estrategia global
              con insights territoriales, y sabe cómo convertir claridad en crecimiento.
            </motion.p>
          </div>

          {/* Accent phrase */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mac-window p-8 md:p-12 mt-10"
          >
            <div className="mac-header -mx-8 -mt-12 md:-mx-12 md:-mt-12 mb-6">
              <div className="mac-dot mac-dot-red" />
              <div className="mac-dot mac-dot-yellow" />
              <div className="mac-dot mac-dot-green" />
            </div>
            <p className="text-2xl md:text-3xl font-bold mb-4">
              "El primero en su categoría. El que marca dirección."
            </p>
            <p className="text-sm text-gray-400">JUN significa "el primero" en la lengua maya.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandConnection;
