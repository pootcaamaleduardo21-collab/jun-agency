'use client';

import { motion } from 'framer-motion';

const InteractiveShowcase = () => {
  const features = [
    {
      label: 'Estrategia',
      icon: '📊',
      description: 'Diagnóstico y dirección clara',
    },
    {
      label: 'Contenido',
      icon: '🎬',
      description: 'Producción visual premium',
    },
    {
      label: 'Conversión',
      icon: '✨',
      description: 'Optimización de resultados',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section section-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
            Cómo trabajamos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Tres pilares que trabajan en conjunto
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              <div className="mac-window p-8 h-full flex flex-col items-center text-center hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                {/* Mac Header */}
                <div className="mac-header absolute -left-px -top-px -right-px w-full">
                  <div className="mac-dot mac-dot-red" />
                  <div className="mac-dot mac-dot-yellow" />
                  <div className="mac-dot mac-dot-green" />
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 mt-2">{feature.icon}</div>

                {/* Label */}
                <h3 className="text-xl font-bold mb-2">{feature.label}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats or highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mac-window p-8 md:p-12"
        >
          {/* Mac Header */}
          <div className="mac-header -mx-8 -mt-12 md:-mx-12 md:-mt-12 mb-8">
            <div className="mac-dot mac-dot-red" />
            <div className="mac-dot mac-dot-yellow" />
            <div className="mac-dot mac-dot-green" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">100%</p>
              <p className="text-gray-400">Enfoque personalizado</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">+50</p>
              <p className="text-gray-400">Proyectos completados</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">3x</p>
              <p className="text-gray-400">ROI promedio en clientes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
