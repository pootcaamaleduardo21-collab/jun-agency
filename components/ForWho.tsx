'use client';

import { motion } from 'framer-motion';

const ForWho = () => {
  const categories = [
    'Desarrollos inmobiliarios y proyectos de inversión',
    'Brokers, equipos comerciales y firmas del sector',
    'Arquitectos, despachos e interiorismo',
    'Hoteles, hospedaje y conceptos turísticos',
    'Restaurantes, beach clubs y marcas orientadas a experiencia',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section section-dark">
      <div className="container max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Trabajamos con proyectos, espacios y marcas que necesitan una presencia digital más estratégica
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            Si tu proyecto busca diferenciación en un mercado competitivo, si necesitas comunicar mejor el
            valor de lo que ofreces, o si ya tienes presencia pero sientes que no está generando los
            resultados que esperabas, JUN es para ti.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4"
        >
          {categories.map((category, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex gap-4 items-start p-4 md:p-5 border border-white/10 rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-white/40 mt-3 flex-shrink-0 group-hover:bg-white/60 transition-colors" />
              <p className="text-base md:text-lg text-gray-300 group-hover:text-white transition-colors">
                {category}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ForWho;
