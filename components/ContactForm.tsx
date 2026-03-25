'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  company: string;
  projectType: string;
  whatsapp: string;
  email: string;
  needs: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Send to Formspree or your backend
      const response = await fetch('https://formspree.io/f/xyzwvu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    'Desarrollo inmobiliario',
    'Proyecto de inversión',
    'Broker / Equipo comercial',
    'Arquitectura / Despacho',
    'Hotel / Hospedaje',
    'Restaurante / Beach club',
    'Marca / Experiencia',
    'Otro',
  ];

  const needsOptions = [
    'Estrategia digital completa',
    'Mejorar presencia actual',
    'Campañas publicitarias',
    'Contenido y producción visual',
    'Posicionamiento de marca',
    'No estoy seguro, necesito asesoría',
  ];

  return (
    <section id="contacto" className="section section-dark">
      <div className="container max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Hablemos de tu proyecto
          </h2>
          <p className="text-gray-400 mt-4">
            Completa este formulario y nos pondremos en contacto para conocer más sobre tus necesidades.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          onSubmit={handleSubmit(onSubmit)}
          className="mac-window p-8 md:p-12 space-y-6"
        >
          {/* Mac Header */}
          <div className="mac-header -mx-8 -mt-12 md:-mx-12 md:-mt-12 mb-6">
            <div className="mac-dot mac-dot-red" />
            <div className="mac-dot mac-dot-yellow" />
            <div className="mac-dot mac-dot-green" />
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              {...register('name', { required: 'El nombre es requerido' })}
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Empresa o proyecto
            </label>
            <input
              type="text"
              placeholder="Nombre del proyecto o empresa"
              {...register('company', { required: 'Este campo es requerido' })}
              className="w-full"
            />
            {errors.company && (
              <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de proyecto
            </label>
            <select
              {...register('projectType', { required: 'Selecciona un tipo de proyecto' })}
              className="w-full"
            >
              <option value="">Selecciona una opción</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              placeholder="+52 985 1089 671"
              {...register('whatsapp', { required: 'El WhatsApp es requerido' })}
              className="w-full"
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correo
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              {...register('email', {
                required: 'El correo es requerido',
                pattern: {
                  value: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
                  message: 'Correo inválido',
                },
              })}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Needs */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              ¿Qué necesitas mejorar hoy?
            </label>
            <div className="space-y-2">
              {needsOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value={option}
                    {...register('needs', { required: 'Selecciona una opción' })}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300 text-sm">{option}</span>
                </label>
              ))}
            </div>
            {errors.needs && (
              <p className="text-red-400 text-sm mt-1">{errors.needs.message}</p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-sm text-sm"
            >
              ¡Gracias! Nos pondremos en contacto pronto. Verifica tu WhatsApp también.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-sm text-sm"
            >
              Hubo un error al enviar el formulario. Por favor, intenta de nuevo o contacta por WhatsApp.
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar diagnóstico'}
          </button>

          {/* Alternative */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm mb-2">
              ¿Prefieres contactar por WhatsApp?
            </p>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN!%20Quisiera%20conocer%20m%C3%A1s%20sobre%20vuestros%20servicios%20de%20crecimiento%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm underline transition-colors"
            >
              Envíanos un mensaje por WhatsApp
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
