'use client';

import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'Estrategia y crecimiento digital',
      items: [
        'Planeación estratégica',
        'Campañas publicitarias',
        'Embudos de conversión',
        'Optimización',
        'Seguimiento de resultados',
      ],
    },
    {
      title: 'Producción visual y contenido',
      items: [
        'Levantamiento de contenido',
        'Creación de contenido',
        'Dirección visual',
        'Recorridos virtuales 360°',
        'Enfoque inmersivo y comercial',
      ],
    },
    {
      title: 'Posicionamiento y comunicación',
      items: [
        'Desarrollo de mensajes',
        'Estructura comercial',
        'Presencia digital',
        'Piezas de percepción',
        'Identidad comunicativa',
      ],
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
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
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Servicios pensados para posicionar, comunicar y convertir mejor
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group border border-white/20 p-8 md:p-10 hover:border-white/40 transition-all duration-300 bg-white/5 hover:bg-white/10"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 items-start text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0 group-hover:bg-white/60 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <a href="#contacto" className="btn btn-secondary">
            Conoce qué necesita tu proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
