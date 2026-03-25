'use client';

import { motion } from 'framer-motion';

const ProblemSection = () => {
  const problems = [
    'Una estrategia clara para que tu inversión en marketing tenga dirección',
    'Contenido pensado para generar confianza, no solo presencia',
    'Campañas orientadas a atraer prospectos con mejor intención',
    'Una identidad digital más sólida para diferenciarte en el mercado',
    'Mejor estructura comercial para que el proceso de venta avance con más claridad',
    'Una comunicación alineada con el valor real de tu proyecto o marca',
  ];

  return (
    <section className="section section-dark">
      <div className="container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Lo que suele frenar el crecimiento digital de un proyecto
          </h2>
          <p className="text-gray-400 text-lg">
            No es la falta de presencia. Es la falta de intención, claridad y dirección en cómo se comunica y se vende.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
              className="group mac-window p-6 md:p-8 hover:border-white/40 hover:bg-white/10 cursor-pointer"
            >
              {/* Mac Header */}
              <div className="mac-header -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6">
                <div className="mac-dot mac-dot-red" />
                <div className="mac-dot mac-dot-yellow" />
                <div className="mac-dot mac-dot-green" />
              </div>

              <div className="flex gap-4 items-start">
                <div className="number-badge flex-shrink-0 text-lg">{i + 1}</div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed pt-1 group-hover:text-white transition-colors">
                  {problem}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
