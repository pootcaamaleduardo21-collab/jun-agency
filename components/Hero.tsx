'use client'

import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    const drawBackground = (mouse: MousePosition) => {
      const gradient = ctx.createLinearGradient(
        canvas.width * 0.5 + mouse.x * 50,
        canvas.height * 0.5 + mouse.y * 50,
        canvas.width * 0.3,
        canvas.height * 0.7
      )

      gradient.addColorStop(0, '#f5f0e8')
      gradient.addColorStop(0.4, '#e8dcc8')
      gradient.addColorStop(0.8, '#d4c4b0')
      gradient.addColorStop(1, '#f5f0e8')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar líneas arquitectónicas sutiles
      ctx.strokeStyle = 'rgba(154, 139, 126, 0.08)'
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 4) * i + mouse.x * 30
        const y = (canvas.height / 4) * i + mouse.y * 30
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Dibujar círculos suaves que responden al mouse
      const circles = 3
      for (let i = 0; i < circles; i++) {
        const radius = (canvas.width / 4) * (i + 1) + Math.abs(mouse.x * 100)
        const cx = canvas.width / 2 + mouse.x * 80
        const cy = canvas.height / 2 + mouse.y * 80

        ctx.strokeStyle = `rgba(154, 139, 126, ${0.04 - i * 0.01})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawBackground(mousePos)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jun-light/40 to-jun-light pointer-events-none" />

      <div className="relative z-10 container-max text-center">
        <div className="space-y-6 sm:space-y-8">
          <h1 className="heading-1 text-jun-black leading-tight max-w-4xl mx-auto animate-fade-in">
            Haz que tu proyecto sea la primera opción en Riviera Maya
          </h1>

          <p className="text-lg sm:text-xl text-jun-accent max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Especialistas en crecimiento digital para real estate y turismo
          </p>

          <p className="text-base sm:text-lg text-jun-black/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Diseñamos una presencia digital con dirección, para proyectos y marcas que necesitan comunicar con claridad, diferenciarse y convertir con más intención.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-2 text-left w-full sm:w-auto">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-jun-sand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-jun-black">Estrategia enfocada en posicionamiento y conversión</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-jun-sand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-jun-black">Contenido pensado para comunicar con más claridad</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-jun-sand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-jun-black">Enfoque alineado al mercado de la Riviera Maya</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-jun-sand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-jun-black">Soluciones visuales que elevan la percepción del proyecto</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="cta-primary">
              Solicita tu diagnóstico estratégico
            </button>
            <a
              href="https://wa.me/9851089671?text=Hola%20JUN%2C%20me%20gustaría%20recibir%20más%20detalles%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
