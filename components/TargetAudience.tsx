'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const TargetAudience = () => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const segments = [
    {
      id: 0,
      title: 'Real Estate',
      subtitle: 'Desarrollos e inversión',
      description: 'Proyectos residenciales, comerciales y de inversión que necesitan posicionarse en un mercado competitivo.',
      icon: '🏢',
      features: ['Campañas de presellido', 'Tours virtuales 360°', 'Estrategia de posicionamiento'],
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 1,
      title: 'Turismo & Experiencia',
      subtitle: 'Hoteles, restaurants, clubs',
      description: 'Conceptos turísticos, hospedajes y experiencias que compiten por atención en un mercado global.',
      icon: '✈️',
      features: ['Marketing de experiencia', 'Contenido inmersivo', 'Community building'],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 2,
      title: 'Marcas Profesionales',
      subtitle: 'Despachos, arquitectura, interiorismo',
      description: 'Profesionales que necesitan posicionarse como expertos y atraer clientes de calidad.',
      icon: '🎨',
      features: ['Portfolio digital', 'Thought leadership', 'Generación de leads'],
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      id: 3,
      title: 'Equipos Comerciales',
      subtitle: 'Brokers, agentes, firmas',
      description: 'Profesionales del sector que necesitan visibilidad y credibilidad para cerrar más negocios.',
      icon: '💼',
      features: ['Personal branding', 'Lead generation', 'Prospecting digital'],
      color: 'from-green-500/20 to-emerald-500/20',
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="para-quien" className="section section-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Hacia quién lo ofrecemos
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-lg text-gray-400 max-w-3xl mb-16"
        >
          Trabajamos con proyectos, marcas y profesionales que entienden que una estrategia digital
          sólida es la diferencia entre tener presencia y generar resultados.
        </motion.p>

        {/* Segments Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {segments.map((segment) => (
            <motion.div
              key={segment.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredSegment(segment.id)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`interactive-card cursor-pointer group ${
                hoveredSegment === segment.id
                  ? 'border-white/40 bg-white/10 scale-105'
                  : ''
              } relative overflow-hidden`}
            >
              {/* Mac Header */}
              <div className="mac-header -mx-6 -mt-6 mb-6">
                <div className="mac-dot mac-dot-red" />
                <div className="mac-dot mac-dot-yellow" />
                <div className="mac-dot mac-dot-green" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{segment.title}</h3>
                  <p className="text-gray-400 text-sm">{segment.subtitle}</p>
                </div>
                <div className="text-4xl">{segment.icon}</div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {segment.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {segment.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredSegment === segment.id ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Hover indicator */}
              {hoveredSegment === segment.id && (
                <motion.div
                  layoutId="segmentHighlight"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 p-8 md:p-12 mac-window text-center"
        >
          <div className="mac-header -mx-12 -mt-12 mb-8">
            <div className="mac-dot mac-dot-red" />
            <div className="mac-dot mac-dot-yellow" />
            <div className="mac-dot mac-dot-green" />
          </div>

          <h3 className="text-2xl font-bold mb-4">¿Tu proyecto encaja con nosotros?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Si ves que tu sector o tipo de proyecto no aparece en la lista, pero entiendes que necesitas
            una estrategia digital clara y diferenciada, definitivamente podemos ayudarte.
          </p>

          <a href="#contacto" className="btn btn-primary">
            Descubre si encajas con JUN
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;
