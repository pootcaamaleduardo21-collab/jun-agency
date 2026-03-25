'use client';

import { motion } from 'framer-motion';

const HowWeWork = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Analizamos tu situación actual: estrategia, comunicación, presencia digital y oportunidades de mejora.',
    },
    {
      number: '02',
      title: 'Dirección estratégica',
      description: 'Diseñamos un plan claro con objetivos medibles, etapas definidas y resultados esperados.',
    },
    {
      number: '03',
      title: 'Producción y lanzamiento',
      description: 'Ejecutamos la estrategia: contenido, campañas, optimizaciones y todo lo necesario para tu crecimiento.',
    },
    {
      number: '04',
      title: 'Optimización continua',
      description: 'Monitoreamos, analizamos y ajustamos continuamente para maximizar resultados y ROI.',
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
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Una forma clara de trabajar, desde el diagnóstico hasta la ejecución
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6 md:space-y-8 mb-16"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-transparent hidden md:block" />
              )}

              <div className="mac-window p-6 md:p-8 hover:border-white/40 hover:bg-white/10 transition-all duration-300">
                {/* Mac Header */}
                <div className="mac-header -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6">
                  <div className="mac-dot mac-dot-red" />
                  <div className="mac-dot mac-dot-yellow" />
                  <div className="mac-dot mac-dot-green" />
                </div>

                <div className="flex gap-6 items-start">
                  {/* Number circle */}
                  <div className="flex-shrink-0">
                    <div className="number-badge w-14 h-14 flex items-center justify-center text-2xl">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
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
          <a href="#contacto" className="btn btn-primary">
            Solicita tu diagnóstico estratégico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
