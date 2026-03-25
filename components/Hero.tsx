'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    const drawTopographicMesh = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Add subtle noise texture
      ctx.fillStyle = 'rgba(212, 175, 154, 0.02)';
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(
          Math.random() * w,
          Math.random() * h,
          Math.random() * 2,
          Math.random() * 2
        );
      }

      // Draw topographic lines
      ctx.strokeStyle = 'rgba(212, 175, 154, 0.08)';
      ctx.lineWidth = 1;

      const spacing = 60;
      const amplitude = 15;
      const frequency = 0.01;

      // Horizontal waves
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 5) {
          const waveY = y + Math.sin(x * frequency + time * 0.001) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }

      // Vertical lines with subtle wave
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 5) {
          const waveX = x + Math.sin(y * frequency + time * 0.0008) * (amplitude * 0.5);
          if (y === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        ctx.stroke();
      }

      // Add organic flowing lines
      ctx.strokeStyle = 'rgba(212, 175, 154, 0.04)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const startY = (h / 3) * (i + 1);
        for (let x = 0; x <= w; x += 10) {
          const y =
            startY +
            Math.sin((x + time * 0.5) * 0.005) * 40 +
            Math.cos((x + time * 0.3) * 0.003) * 30;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0)');
      gradient.addColorStop(0.5, 'rgba(10, 10, 10, 0)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      time++;
      animationFrameId = requestAnimationFrame(drawTopographicMesh);
    };

    drawTopographicMesh();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Content */}
      <div className="relative z-10 container max-w-4xl px-5 md:px-12 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Posiciona tu proyecto{' '}
              <span className="gradient-text">como referencia</span> en el mercado.
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Estrategia digital y contenido premium para real estate, turismo y experiencias en Riviera Maya.
            </p>
          </motion.div>

          {/* Support text */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
              Combinamos estrategia, producción visual y ejecución digital para que tu marca
              comunique con claridad, genere confianza y atraiga clientes de mayor intención.
            </p>
          </motion.div>

          {/* Bullets */}
          <motion.div variants={itemVariants} className="space-y-4 pt-4">
            {[
              'Estrategia enfocada en posicionamiento y conversión',
              'Contenido pensado para comunicar con más claridad',
              'Enfoque alineado al mercado de Riviera Maya',
              'Soluciones visuales que elevan la percepción del proyecto',
            ].map((bullet, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                <p className="text-base text-gray-400">{bullet}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 pt-8">
            <a
              href="#contacto"
              className="btn btn-primary text-center md:text-left"
            >
              Solicita tu diagnóstico estratégico
            </a>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN!%20Quisiera%20conocer%20m%C3%A1s%20sobre%20vuestros%20servicios%20de%20crecimiento%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-center md:text-left"
            >
              Hablar por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-white/50 text-sm">
          <span>Desplázate para más</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
