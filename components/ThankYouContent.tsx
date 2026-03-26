'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Amigo';
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Trigger confetti immediately
    if (confettiRef.current) {
      confetti.create(confettiRef.current, {
        resize: true,
        useWorker: true,
      })({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF9A', '#F5F1ED', '#0A0A0A'],
      });

      // Second burst after 500ms
      setTimeout(() => {
        confetti.create(confettiRef.current!, {
          resize: true,
          useWorker: true,
        })({
          particleCount: 50,
          spread: 90,
          origin: { x: 0, y: 0.5 },
          colors: ['#D4AF9A', '#F5F1ED'],
        });
      }, 500);

      // Third burst from right
      setTimeout(() => {
        confetti.create(confettiRef.current!, {
          resize: true,
          useWorker: true,
        })({
          particleCount: 50,
          spread: 90,
          origin: { x: 1, y: 0.5 },
          colors: ['#D4AF9A', '#F5F1ED'],
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      {/* Confetti Canvas */}
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
      />

      {/* Thank You Content */}
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          {/* Success Icon */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse"
            style={{
              background: 'rgba(212,175,154,0.15)',
              border: '2px solid rgba(212,175,154,0.4)',
            }}
          >
            <svg
              width="56"
              height="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: 'var(--sand)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            ¡Gracias, {name}! 🎉
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 mb-3">
            Tu solicitud fue recibida correctamente
          </p>

          {/* Timeline Info */}
          <div
            className="rounded-xl p-6 md:p-8 mb-10 inline-block"
            style={{
              background: 'rgba(212,175,154,0.08)',
              border: '1px solid rgba(212,175,154,0.2)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: 'rgba(212,175,154,0.2)',
                    color: 'var(--sand)',
                  }}
                >
                  ✓
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Mensaje recibido</p>
                  <p className="text-sm text-white/60">
                    Tu solicitud fue enviada correctamente
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: 'rgba(212,175,154,0.2)',
                    color: 'var(--sand)',
                  }}
                >
                  📧
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">
                    Confirmación enviada
                  </p>
                  <p className="text-sm text-white/60">
                    Revisa tu correo (incluyendo spam)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: 'rgba(212,175,154,0.2)',
                    color: 'var(--sand)',
                  }}
                >
                  ⏱️
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">
                    Respuesta en 24 horas
                  </p>
                  <p className="text-sm text-white/60">
                    Te contactaremos con una propuesta inicial
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN%2C%20acabo%20de%20enviar%20mi%20solicitud%20de%20diagn%C3%B3stico%20estrat%C3%A9gico"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{
                background: '#25D366',
                color: '#fff',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.945 9.945 0 01-4.964-1.32l-.357-.212-3.678.964.981-3.595-.232-.369A9.941 9.941 0 012.06 12.03c0-5.493 4.478-9.971 9.971-9.971s9.971 4.478 9.971 9.971-4.478 9.97-9.973 9.85z" />
              </svg>
              Hablar por WhatsApp
            </a>

            {/* Back to Home */}
            <Link
              href="/"
              className="px-8 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(212,175,154,0.3)',
              }}
            >
              Volver al inicio
            </Link>
          </div>

          {/* Extra Info */}
          <div className="text-sm text-white/50 space-y-2">
            <p>¿Preguntas mientras tanto?</p>
            <p>
              Escríbenos a{' '}
              <a
                href="mailto:informes@junmkt.com"
                className="text-[var(--sand)] hover:underline font-semibold"
              >
                informes@junmkt.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
