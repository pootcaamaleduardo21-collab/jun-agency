# JUN - Agencia de Crecimiento Digital Riviera Maya

Landing page premium para JUN, agencia especializada en crecimiento digital para real estate y turismo en Riviera Maya.

## 🎯 Características

- **Hero dinámico** con fondo topográfico animado en Canvas
- **Mobile-first** completamente responsivo
- **Optimizado para SEO** con estructura semántica y schema.org
- **Animaciones fluidas** con Framer Motion
- **Formulario de conversión** integrado
- **Copy estratégico** enfocado en conversión
- **Performance** optimizado (Core Web Vitals)
- **Accesibilidad** WCAG 2.1 AA compliant

## 📋 Secciones

1. **Hero** - Con fondo dinámico y CTAs principales
2. **Trust Band** - Confianza inmediata
3. **Problema** - Identificación de problemas
4. **Propuesta de Valor** - Diferenciación de JUN
5. **Servicios** - 3 pilares principales
6. **Cómo Trabajamos** - Proceso de 4 pasos
7. **Conexión de Marca** - Narrativa territorial
8. **Para Quién** - Segmentación de clientes
9. **Cierre** - CTA final
10. **FAQ** - Preguntas frecuentes
11. **Formulario** - Lead capture
12. **Footer** - Información de contacto

## 🛠️ Tech Stack

- **Next.js 14** - React framework con App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utilidad CSS
- **Framer Motion** - Animaciones
- **React Hook Form** - Gestión de formularios
- **Canvas API** - Animación del hero

## 🚀 Instalación

```bash
# 1. Clonar o descargar el proyecto
cd jun-agency

# 2. Instalar dependencias
npm install

# 3. Variables de entorno (opcional para Formspree)
# Crear archivo .env.local si deseas usar un servicio de formularios diferente

# 4. Ejecutar desarrollo
npm run dev

# Visitar http://localhost:3000
```

## 📦 Dependencias principales

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^10.0.0",
  "react-hook-form": "^7.0.0"
}
```

## 🌐 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Asignar dominio personalizado en dashboard de Vercel
```

### Netlify

1. Conectar repositorio en Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Configurar variables de entorno si aplica

### AWS, DigitalOcean, etc.

```bash
# Build para producción
npm run build

# Start servidor
npm start
```

## 📊 SEO

### Meta Tags
- Title tag: Optimizado para conversión
- Meta description: Persuasiva y con keywords
- Open Graph tags: Para compartir en redes
- Twitter Card tags: Para Twitter
- Canonical URL: Evita contenido duplicado

### Schema Markup
- Organization schema
- FAQPage schema (opcional)
- LocalBusiness schema (puede agregarse)

### Keywords principales
- agencia marketing digital Riviera Maya
- marketing real estate
- marketing turístico
- agencia Playa del Carmen
- crecimiento digital

### Estructura
- HTML semántico (section, article, header, footer)
- Un solo H1
- Jerarquía correcta de headings
- URLs amigables
- Lazy loading de imágenes

## 🎨 Paleta de colores

- **Negro profundo**: #0A0A0A
- **Cream**: #F5F1ED
- **Arena dorada**: #D4AF9A
- **Grises cálidos**: #7A7A7A, #A0A0A0

## ✍️ Tipografía

- **Sora** (Headings): Geométrica, moderna, elegante
- **Inter** (Body): Legible, clara, profesional

## 📱 Responsividad

- Mobile: < 640px (iPhone, pequeños)
- Tablet: 640px - 1024px
- Desktop: > 1024px

Todas las secciones se adaptan automáticamente con Tailwind CSS.

## 🎬 Animaciones

- Fade-in al scroll
- Slide-in lateral
- Stagger animations
- Canvas animation (Hero)
- Micro-interacciones en botones y formularios

## 📧 Formulario de contacto

El formulario está configurado para enviar a **Formspree**. Para cambiar:

1. Actualizar URL en `components/ContactForm.tsx`
2. Cambiar ID de formulario: `https://formspree.io/f/YOUR_FORM_ID`

### Servicios alternativos
- Brevo
- Mailchimp
- Custom API

## 🔍 Performance

- Image optimization con Next.js
- Code splitting automático
- CSS purging con Tailwind
- Minificación automática
- Lighthouse score > 90

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## ♿ Accesibilidad

- WCAG 2.1 AA compliant
- Contraste de colores suficiente
- Iconos con aria-labels
- Formulario con labels asociadas
- Focus visible en todos los elementos interactivos
- Navegación por teclado

## 📝 Estructura de carpetas

```
jun-agency/
├── app/
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página home
│   ├── globals.css          # Estilos globales
│   └── favicon.ico
├── components/
│   ├── Hero.tsx             # Hero con Canvas
│   ├── TrustBand.tsx        # Franja de confianza
│   ├── ProblemSection.tsx   # Sección de problemas
│   ├── ValueProposition.tsx # Propuesta de valor
│   ├── Services.tsx         # Servicios
│   ├── HowWeWork.tsx        # Cómo trabajamos
│   ├── BrandConnection.tsx  # Conexión de marca
│   ├── ForWho.tsx           # Para quién
│   ├── ClosingCTA.tsx       # CTA final
│   ├── FAQ.tsx              # FAQ
│   ├── ContactForm.tsx      # Formulario
│   └── Footer.tsx           # Footer
├── public/                  # Imágenes y assets
├── tailwind.config.ts       # Configuración Tailwind
├── tsconfig.json            # Configuración TypeScript
├── package.json
└── README.md
```

## 🚦 Próximos pasos

1. **Actualizar Formspree ID** en `ContactForm.tsx`
2. **Añadir logo de JUN** en header (crear Header.tsx si aplica)
3. **Cargar imágenes** en sección públic/
4. **Configurar analytics** (Google Analytics, Hotjar)
5. **Configurar dominio** (jun.com.mx)
6. **SSL/HTTPS** (automático en Vercel)
7. **Monitoreo** de métricas y conversiones

## 💡 Tips de optimización

### Para mejorar conversión
- A/B testing en CTAs
- Cambiar color del botón primario
- Ajustar copy del hero
- Posición del formulario

### Para mejorar SEO
- Crear blog (Pages dinámicas)
- Caso de estudios
- Testimonios con schema
- Backlinks estratégicos

### Para mejorar performance
- Comprimir imágenes más
- Considerar WebP
- Lazy load en secciones abajo
- Cache headers en Vercel

## 📞 Contacto & Soporte

- **Email**: informes@jun.com.mx
- **WhatsApp**: +52 985 1089 671
- **Ubicación**: Riviera Maya, Quintana Roo, México

## 📄 Licencia

© 2024 JUN. Todos los derechos reservados.

---

**Hecho con ❤️ para agencias digitales premium**
