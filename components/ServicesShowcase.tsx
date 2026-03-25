'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      title: 'Estrategia Digital & Crecimiento',
      subtitle: 'Dirección clara para tus campañas',
      items: [
        'Planeación estratégica enfocada en conversión',
        'Campañas publicitarias optimizadas',
        'Embudos de conversión y automatización',
        'Análisis y optimización continua',
        'Seguimiento de resultados en tiempo real',
      ],
      icon: '📊',
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      id: 1,
      title: 'Producción Visual & Contenido',
      subtitle: 'Contenido que vende',
      items: [
        'Fotografía y video profesional',
        'Creación de contenido alineado a tu marca',
        'Dirección visual estratégica',
        'Recorridos virtuales 360° inmersivos',
        'Diseño gráfico y motion graphics',
      ],
      icon: '🎬',
      color: 'from-purple-500/20 to-purple-500/5',
    },
    {
      id: 2,
      title: 'Posicionamiento & Marca',
      subtitle: 'Comunica tu verdadero valor',
      items: [
        'Desarrollo de mensajes diferenciadores',
        'Estructura comercial y narrativa',
        'Identidad digital coherente',
        'Piezas de elevación de percepción',
        'Estrategia de posicionamiento en mercado',
      ],
      icon: '✨',
      color: 'from-amber-500/20 to-amber-500/5',
    },
  ];

  const activeItem = services[activeService];

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="servicios" className="section section-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Lo que ofrecemos
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl">
            Tres pilares estratégicos para posicionar mejor tu proyecto y convertir con claridad.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: service.id * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`text-left transition-all duration-300 group ${
                activeService === service.id
                  ? 'mac-window border-white/40 bg-white/10'
                  : 'mac-window border-white/20 hover:border-white/40'
              } p-6 md:p-8`}
            >
              {/* Mac Window Header */}
              <div className="mac-header -mx-6 -mt-8 mb-6">
                <div className="mac-dot mac-dot-red" />
                <div className="mac-dot mac-dot-yellow" />
                <div className="mac-dot mac-dot-green" />
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-400 mb-0 group-hover:text-gray-300 transition-colors">
                {service.subtitle}
              </p>

              {/* Highlight on active */}
              {activeService === service.id && (
                <motion.div
                  layoutId="serviceHighlight"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Active Service Details */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mac-window p-8 md:p-12"
        >
          {/* Mac Header */}
          <div className="mac-header -mx-12 -mt-12 mb-8">
            <div className="mac-dot mac-dot-red" />
            <div className="mac-dot mac-dot-yellow" />
            <div className="mac-dot mac-dot-green" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{activeItem.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold">{activeItem.title}</h3>
                  <p className="text-gray-400 mt-1">{activeItem.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Cada servicio está diseñado para trabajar en conjunto, creando una estrategia
                integral que posiciona tu marca como referencia en el mercado.
              </p>

              <a
                href="#contacto"
                className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 active:scale-95"
              >
                Conocer más →
              </a>
            </div>

            {/* Service Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {activeItem.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4 items-start p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="number-badge flex-shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-300 pt-1">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mt-16"
        >
          <a href="#contacto" className="btn btn-primary text-lg">
            Ver cómo podemos ayudar tu proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
