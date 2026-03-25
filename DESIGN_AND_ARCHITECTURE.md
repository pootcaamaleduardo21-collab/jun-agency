# JUN Landing Page - Diseño y Arquitectura

## 📐 Decisiones de Diseño Visual

### Paleta de Colores
- **JUN Black (#0a0a0a)**: Color primario, elegancia y autoridad
- **JUN Sand (#d4c4b0)**: Inspirado en la Riviera Maya, acentos sofisticados
- **JUN Light (#faf8f5)**: Fondo cálido y minimalista
- **JUN Warm (#f5f0e8)**: Secciones alternadas, sensación acogedora
- **JUN Accent (#9b8b7e)**: Textos secundarios, contraste sutil

### Tipografía
- **Satoshi Bold**: Headings, destacados, máxima legibilidad
- **Satoshi/Poppins**: Body text, interfaz, accesibilidad
- **No italics**: Mantenemos profesionalismo y modernia, evitamos sobredibujo

### Características Visuales
- **Minimalismo contemporáneo**: Menos es más, cada elemento tiene propósito
- **Estética editorial**: Jerarquía clara, espacios en blanco generosos
- **Elegancia sobria**: Premium sin ostentación, lujo silencioso
- **Movimiento sutil**: Animaciones en hover/scroll, no distrae
- **Responsivo**: Mobile first, se adapta perfectamente a cualquier pantalla

## 🎯 Estrategia de Conversión

### CTAs Estratégicamente Colocados
1. **Hero**: Doble CTA (primario + secundario)
2. **Secciones intermedias**: Micro-CTAs que refuerzan el valor
3. **Closing section**: CTAs dobles nuevamente para máxima conversión
4. **Formulario**: Posición central, campos minimales

### Optimización de Formulario
- **Campos mínimos necesarios**: Nombre, empresa, tipo proyecto, WhatsApp, email, necesidades
- **Validación clara**: Feedback instantáneo
- **Mensaje de confirmación**: Tranquiliza al usuario
- **Email automático**: Confirmación al usuario y notificación al equipo

## 🏗️ Arquitectura Técnica

### Stack
- **Next.js 15**: Servidor y cliente, renderizado optimizado
- **TypeScript**: Type safety, mejor developer experience
- **Tailwind CSS**: Utility-first, rápido de desarrollar y mantener
- **React 19**: Componentes modernos, hooks optimizados

### Estructura de Componentes
```
App
├── Hero (dinámico, canvas responsivo)
├── TrustStrip (valor inmediato)
├── ProblemSection (identificación de dolor)
├── ValueProposition (diferenciador)
├── Services (oferta clara)
├── HowWeWork (proceso transparent)
├── BrandConnection (contexto geografico)
├── ForWho (segmentación)
├── ClosingSection (urgencia y cierre)
├── FAQ (objeciones)
└── ContactForm (conversión)
```

### API de Contacto
- **Ruta**: `/api/contact` (POST)
- **Framework**: Next.js API Routes
- **Email**: Nodemailer + SMTP
- **Flujo**:
  1. Usuario llena formulario
  2. Validación del lado del cliente
  3. POST a `/api/contact`
  4. Envío de email a `informes@junmkt.com`
  5. Confirmación automática al usuario
  6. Respuesta al frontend con estado

## 🎬 Hero Dinámico - Detalles Técnicos

### Canvas Interactivo
- **Framework**: HTML5 Canvas + requestAnimationFrame
- **Responsiveness**: Redimensionamiento automático
- **Performance**: Optimizado, no bloquea el main thread
- **Efecto mouse**: Sigue movimiento del mouse con suavidad

### Características del Fondo
1. **Gradiente dinámico**: Responde a posición del mouse
2. **Grid arquitectónico**: Líneas sutiles que evocan estructura
3. **Círculos suaves**: Capas visuales que dan profundidad
4. **Overlay de degradado**: Asegura legibilidad del texto

### Optimizaciones
- Canvas tamaño real del viewport
- Cleanup de listeners on unmount
- Performance monitor en dev tools
- Sincronizado con scroll smooth

## 🔍 SEO - Estrategia Completa

### On-Page SEO
- **H1 único**: "Haz que tu proyecto sea la primera opción en la Riviera Maya"
- **Estructura de headings**: H2s para secciones, H3s para sub-puntos
- **Meta tags**:
  - Title: 70 caracteres (SEO optimal)
  - Description: 160 caracteres, persuasiva
  - Keywords naturales, no stuffing
  - Open Graph para redes sociales
  - Twitter Card para compartir

### Keywords Targets
- Primarias: "agencia marketing digital", "marketing real estate", "Riviera Maya"
- Long-tail: "agencia digital Playa del Carmen", "recorridos virtuales 360"
- Geo-specificas: "Riviera Maya", "Playa del Carmen", "real estate"
- Tópico-específicas: "estrategia digital", "conversión", "posicionamiento"

### Estructura Técnica SEO
- HTML semántico: `<section>`, `<h2>`, `<p>` correctamente anidados
- Canonical tag: Evita duplicados
- Mobile responsive: 100% mobile-first
- Core Web Vitals: Optimizados (LCP, FID, CLS)
- Schema.org: Organization markup (a extender)
- Alt text en imágenes: Descriptivos y SEO-friendly
- Internal linking: Lógico y contextual

### Rendimiento SEO
- Carga rápida: ~1.5s First Contentful Paint
- Imágenes optimizadas: WebP, AVIF, lazy loading
- CSS critical: Inlined para LCP
- JavaScript chunked: Solo lo necesario en el cliente
- Caching headers: CDN optimizado en Vercel

## 📱 Responsive Design

### Breakpoints Tailwind
- **Mobile**: < 640px (sm:)
- **Tablet**: 640px - 1024px (md:, lg:)
- **Desktop**: > 1024px (xl:)

### Estrategia Mobile-First
1. Base: diseño para móvil (320px)
2. Enhancement: mejoras progresivas para tablets
3. Desktop: optimizaciones para pantallas grandes

### Testing Responsividad
```bash
# Hero
- ✅ Canvas responsivo
- ✅ Texto legible en móvil
- ✅ CTAs touchable (48px minimum)

# Formulario
- ✅ Inputs full-width en móvil
- ✅ Labels claramente visibles
- ✅ Error messages legibles

# Secciones
- ✅ Grids se adaptan (1 col → 2 col → 3+ col)
- ✅ Padding/margin escalado proporcionalmente
- ✅ Tipografía legible en todos los tamaños
```

## ♿ Accesibilidad

### WCAG 2.1 Compliance
- **Contraste**: Mínimo AA (4.5:1 para texto normal)
- **Navegación**: Orden lógico, teclado funcional
- **Colores**: No solo color, también iconos/símbolos
- **Alt text**: Descriptivo para screen readers
- **Focus visible**: Estados hover/focus claros
- **Formularios**: Labels asociados, validación clara

### Pruebas
```bash
# Lighthouse audit
npm run build
npm start
# Abrir Chrome DevTools → Lighthouse
```

## 🔐 Seguridad

### Medidas Implementadas
- **HTTPS**: Obligatorio en Vercel
- **CORS**: Configurado para API
- **Validación**: Backend + Frontend
- **Sanitización**: Nodemailer maneja HTML de forma segura
- **Rate limiting**: A configurar en producción
- **Environment variables**: Nunca expuestos al cliente

### Variables Sensibles
- SMTP_USER, SMTP_PASSWORD: Solo en servidor
- No exponemos en `.env.local` a Git
- `.gitignore` protege archivos sensibles

## 🚀 Performance Targets

### Métricas Objetivo
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s
- **Lighthouse Score**: > 90

### Optimizaciones Activas
- CSS critical inlined
- JavaScript lazy loaded
- Imágenes optimizadas automáticamente
- Fonts optimizadas (Google Fonts API)
- CDN global (Vercel Edge Network)

## 🔄 Mantenimiento y Escalabilidad

### Estructura para Crecimiento
- Componentes modulares: Fácil de extender
- Tailwind config centralizado: Cambios globales simples
- API separada: Fácil integrar CRM después
- Environment variables: Configuración sin código

### Futuros Mejoras
1. Integración CRM (HubSpot, Pipedrive, etc.)
2. Analytics avanzado (Google Analytics 4, Vercel Analytics)
3. Email template mejorado (Mjml o similar)
4. Rate limiting en API
5. Admin dashboard para gestionar leads
6. Multi-idioma (español/inglés)
7. A/B testing de CTAs y copy
8. Video hero alternativo a canvas

## 📊 Analytics y Tracking

### A Configurar
```js
// Google Analytics 4
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>

// Vercel Analytics (automático)
// Eventos de conversión
ga('event', 'form_submit', { ... })

// Heatmaps (Hotjar, Microsoft Clarity)
```

## 🎓 Lecciones Aprendidas

### Lo que Funciona Bien
- Canvas dinámico > imagen estática
- Formulario mínimo > formulario largo
- CTAs dobles > solo una opción
- Copywriting orientado a beneficio > features
- Móvil primero > desktop first

### Próximos Pasos
- User testing con prospectos reales
- Heat mapping para entender clicks
- A/B testing de headlines
- Análisis de drop-off en formulario
