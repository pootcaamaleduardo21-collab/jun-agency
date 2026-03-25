'use client';

import { motion } from 'framer-motion';

const TrustBand = () => {
  const items = [
    {
      title: 'Estrategia con dirección clara',
      desc: 'Planeación enfocada en tus objetivos específicos',
    },
    {
      title: 'Comunicación con intención',
      desc: 'Mensajes que generan confianza y conexión',
    },
    {
      title: 'Producción visual alineada',
      desc: 'Contenido que refleja el valor real del proyecto',
    },
    {
      title: 'Enfoque orientado a conversión',
      desc: 'Resultados medibles y optimizables',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="section section-dark">
      <div className="container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Pensado para proyectos que necesitan algo más que solo presencia digital.
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group mac-window p-6 md:p-8 hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {/* Mac Header */}
              <div className="mac-header -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6">
                <div className="mac-dot mac-dot-red" />
                <div className="mac-dot mac-dot-yellow" />
                <div className="mac-dot mac-dot-green" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBand;
