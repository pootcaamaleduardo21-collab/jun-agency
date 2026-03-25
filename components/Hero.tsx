'use client';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   JUN Hero — Premium multi-layer canvas background
   Three independent layers rendered in one rAF loop:
     1. Organic topographic contour lines (slow bezier drift)
     2. Fine architectural grid (shifts subtly with mouse parallax)
     3. Ambient light halos (slow radial drift)
   Mouse: gentle parallax offset — not repulsion.
   Mobile: mouse tracking disabled, animation still runs.
   ───────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect touch
    isTouchRef.current = 'ontouchstart' in window;

    // ── Resize ──────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.current.x = canvas.width / 2;
      mouse.current.y = canvas.height / 2;
      mouse.current.targetX = canvas.width / 2;
      mouse.current.targetY = canvas.height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mouse tracking ───────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Layer 1: Topographic contour lines ──────────────────────────
    const CONTOUR_COUNT = 9;
    type Contour = {
      y: number;
      speed: number;
      amplitude: number;
      phase: number;
      freq: number;
      opacity: number;
    };
    const contours: Contour[] = Array.from({ length: CONTOUR_COUNT }, (_, i) => ({
      y: (canvas.height / (CONTOUR_COUNT + 1)) * (i + 1),
      speed: 0.00012 + i * 0.000025,
      amplitude: 28 + i * 7,
      phase: i * 0.7,
      freq: 0.004 + i * 0.0005,
      opacity: 0.055 - i * 0.003,
    }));

    // ── Layer 2: Grid ────────────────────────────────────────────────
    const GRID_SIZE = 80;

    // ── Layer 3: Ambient halos ───────────────────────────────────────
    type Halo = { x: number; y: number; r: number; vx: number; vy: number; opacity: number };
    const halos: Halo[] = [
      { x: canvas.width * 0.15, y: canvas.height * 0.35, r: 420, vx: 0.08, vy: 0.05, opacity: 0.045 },
      { x: canvas.width * 0.78, y: canvas.height * 0.65, r: 320, vx: -0.06, vy: 0.08, opacity: 0.03 },
      { x: canvas.width * 0.5,  y: canvas.height * 0.2,  r: 260, vx: 0.05, vy: -0.06, opacity: 0.025 },
    ];

    let time = 0;

    // ── Draw loop ─────────────────────────────────────────────────────
    const draw = () => {
      time += 1;
      const W = canvas.width;
      const H = canvas.height;

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

      const mx = mouse.current.x / W - 0.5; // -0.5 → 0.5
      const my = mouse.current.y / H - 0.5;
      const parallaxX = mx * 18;
      const parallaxY = my * 12;

      ctx.clearRect(0, 0, W, H);

      /* ── Layer 3: Halos (drawn first / bottom) ── */
      halos.forEach((h) => {
        h.x += h.vx;
        h.y += h.vy;
        if (h.x < -h.r || h.x > W + h.r) h.vx *= -1;
        if (h.y < -h.r || h.y > H + h.r) h.vy *= -1;

        const hx = h.x + parallaxX * 0.6;
        const hy = h.y + parallaxY * 0.6;
        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, h.r);
        grad.addColorStop(0, `rgba(212,175,154,${h.opacity})`);
        grad.addColorStop(1, 'rgba(212,175,154,0)');
        ctx.beginPath();
        ctx.arc(hx, hy, h.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* ── Layer 2: Grid ── */
      const gOffX = (parallaxX * 0.4) % GRID_SIZE;
      const gOffY = (parallaxY * 0.4) % GRID_SIZE;
      ctx.save();
      ctx.strokeStyle = `rgba(212,175,154,0.04)`;
      ctx.lineWidth = 0.5;
      for (let x = gOffX - GRID_SIZE; x < W + GRID_SIZE; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = gOffY - GRID_SIZE; y < H + GRID_SIZE; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      /* ── Layer 1: Topographic contour lines ── */
      contours.forEach((c) => {
        const baseY = c.y + parallaxY * 0.8;
        const pts: { x: number; y: number }[] = [];
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const x = (W / steps) * i + parallaxX * 0.5;
          const y =
            baseY +
            Math.sin(i * c.freq + time * c.speed + c.phase) * c.amplitude +
            Math.sin(i * c.freq * 2.1 + time * c.speed * 0.7) * (c.amplitude * 0.3);
          pts.push({ x, y });
        }

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const cpx = (pts[i].x + pts[i + 1].x) / 2;
          const cpy = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, cpx, cpy);
        }
        ctx.strokeStyle = `rgba(212,175,154,${c.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]"
      aria-label="Sección principal"
    >
      {/* Dynamic canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Gradient overlays for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 to-transparent pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-28">

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-10 bg-[var(--sand)]" aria-hidden="true" />
          <span
            className="text-[var(--sand)] text-xs font-satoshi tracking-[0.22em] uppercase"
            style={{ fontWeight: 700 }}
          >
            Riviera Maya — Estrategia Digital
          </span>
        </div>

        {/* H1 */}
        <h1
          className="mb-8 max-w-5xl"
          style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
        >
          Haz que tu proyecto sea la{' '}
          <span className="text-[var(--sand)]">primera opción</span>{' '}
          en la Riviera Maya.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/60 mb-4 max-w-2xl leading-relaxed">
          Especialistas en crecimiento digital para real estate y turismo en la Riviera Maya.
        </p>

        {/* Support text */}
        <p className="text-base text-white/45 mb-14 max-w-xl leading-relaxed">
          Diseñamos una presencia digital con dirección, para proyectos y marcas que necesitan
          comunicar con claridad, diferenciarse y convertir con más intención.
        </p>

        {/* Bullets */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-14 max-w-3xl"
          aria-label="Propuesta de valor"
        >
          {[
            'Estrategia enfocada en posicionamiento y conversión',
            'Contenido pensado para comunicar con más claridad',
            'Enfoque alineado al mercado de la Riviera Maya',
            'Soluciones visuales que elevan la percepción del proyecto',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white/65">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--sand)' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#formulario"
            id="hero-cta-diagnostico"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-sm rounded-lg transition-all duration-300 hover:bg-[var(--sand)]"
            style={{ fontWeight: 700, fontFamily: 'Satoshi, sans-serif' }}
          >
            Solicita tu diagnóstico estratégico
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#como-trabajamos"
            id="hero-cta-proceso"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white text-sm rounded-lg transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            style={{ fontWeight: 600, fontFamily: 'Satoshi, sans-serif' }}
          >
            Descubre cómo trabajamos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[var(--sand)]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
