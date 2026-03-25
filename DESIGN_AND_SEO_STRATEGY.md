# Estrategia de Diseño y SEO - JUN Landing Page

## 📐 LÓGICA DEL DISEÑO

### 1. **Hero dinámico con Canvas**

El hero es el punto de entrada más crítico. La estrategia visual incluye:

#### **Fondo dinámico responsivo**
- **Canvas API**: Dibuja una malla topográfica animada
- **Inspiración**: Líneas arquitectónicas, terreno natural, crecimiento orgánico
- **Animación**: Ondas sutiles que sugieren movimiento sin ser distracción
- **Responsividad**: Se redimensiona automáticamente al cambiar tamaño de ventana
- **Performance**: Optimizado para no impactar Core Web Vitals
- **Accesibilidad**: No depende de Canvas para mensaje principal

#### **Jerarquía visual en Hero**
```
Headline (H1) → Subheadline → Texto de apoyo → Bullets → CTAs
```

**Estrategia de copy**:
- **Headline**: Beneficio emocional + territorial ("primera opción en Riviera Maya")
- **Subheadline**: Posicionamiento claro (quiénes somos + qué hacemos)
- **Support text**: Propuesta de valor específica
- **Bullets**: 4 puntos clave que resuelven miedos del prospect
- **CTAs**: 2 opciones (conservadora: formulario, agresiva: WhatsApp)

### 2. **Estructura de secciones**

Cada sección sigue un patrón coherente:

1. **Introducción/Headline** (H2)
   - Establece tema
   - Motiva lectura

2. **Contenido** (bloques, listas, texto)
   - Máximo 2-3 párrafos por bloque
   - Espacios en blanco generosos
   - Visual consistency

3. **Call-to-Action** (implícito o explícito)
   - Naturaleza del contenido determina CTA
   - No invasivo pero visible

### 3. **Paleta y tipografía**

#### **Colores**
- **Negro (#0A0A0A)**: Sofisticación, lujo, confianza
- **Cream (#F5F1ED)**: Calidez, accesibilidad, arena
- **Arena Dorada (#D4AF9A)**: Detalles premium, contraste sutil
- **Grises**: Jerarquía de información sin perder sofisticación

**Estrategia cromática**:
- Fondo negro mantiene elegancia y permite que contenido brille
- Cream ofrece legibilidad sin ser frío blanco
- Arena dorada aparece en textos especiales (gradient text)
- Grises permiten legibilidad jerárquica

#### **Tipografía**
- **Sora** (Headings): Geométrica = moderna, clara, directa
- **Inter** (Body): Humanista = legible, amigable, accesible

**Proporciones**:
- H1: 56px (mobile) → 96px (desktop)
- H2: 32px (mobile) → 48px (desktop)
- H3: 24px (mobile) → 32px (desktop)
- P: 16px (mobile) → 18px (desktop)

Mantiene legibilidad en todos los tamaños.

### 4. **Animaciones y microinteracciones**

**Filosofía**: Sutiles, fluidas, propósito claro

- **Fade-in al scroll**: Elementos aparecen cuando entran en viewport
- **Stagger**: Items en grid/lista aparecen secuencialmente
- **Hover states**: Botones, links, cards responden a interacción
- **Canvas animation**: Trasfondo hero se mueve continuamente
- **Scroll indicator**: En hero, sugiere desplazamiento

**Implementación**:
```typescript
// Framer Motion
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
```

El `margin: '-100px'` activa animación antes de que elemento sea visible = efecto más fluido.

### 5. **Layout y espaciado**

**Principios**:
- **Mobile-first**: Diseño comienza en 320px
- **Container**: max-w-6xl (1152px)
- **Section padding**: py-20 md:py-28 (80px mobile, 112px desktop)
- **Grid gaps**: Aumentan con responsive

**Espacios en blanco**:
- 60% del diseño es espacio negativo
- Esto crea sensación de lujo y sofisticación
- Evita "sentimiento de template"

### 6. **Componentes visuales consistentes**

#### **Cards/Bloques**
```tsx
border border-white/20
p-6 md:p-10
hover:border-white/40
transition-all duration-300
bg-white/5 hover:bg-white/10
```

Esto crea:
- Subtileza (bordes semitransparentes)
- Interactividad clara (hover)
- Accesibilidad (transiciones suaves)

#### **Bullets y listas**
- Punto pequeño (w-2 h-2) en arena/white
- Texto alineado a la izquierda
- Separación clara entre items

#### **Botones**
```
btn-primary: Blanco fondo, negro texto (call-out máximo)
btn-secondary: Borde blanco, texto blanco (acciones complementarias)
btn-tertiary: Subrayado simple (links)
```

---

## 🔍 ESTRATEGIA SEO

### 1. **Estructura HTML semántica**

```html
<html lang="es">
  <header> <!-- Si aplica -->
  <main>
    <section id="hero">
      <h1>Único H1 único y claro</h1>
      <h2>Subtemas</h2>
    </section>
  </main>
  <footer>
```

**Ventajas**:
- Buscadores entienden estructura
- Accesibilidad mejorada
- Validación HTML5

### 2. **Meta tags estratégicos**

#### **Title tag** (55-60 caracteres)
```
JUN - Agencia de Crecimiento Digital Riviera Maya | Estrategia y Conversión
```

**Estrategia**:
- Marca (JUN)
- Beneficio (crecimiento digital)
- Ubicación (Riviera Maya) - importante para local SEO
- Keyword secundaria (estrategia y conversión)

#### **Meta description** (155-160 caracteres)
```
Especialistas en crecimiento digital para real estate y turismo en Riviera Maya.
Estrategia, contenido visual y posicionamiento que convierte.
```

**Estrategia**:
- Incluye keywords principales
- Propuesta de valor clara
- Call-to-action implícito
- Mercado específico

#### **Open Graph tags**
Para compartir en redes sociales:
- og:title
- og:description
- og:image
- og:url
- og:type
- og:locale

#### **Twitter Card**
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image

### 3. **Keywords estratégicas**

#### **Keywords primarias**
- "agencia marketing digital Riviera Maya" - 450 búsquedas/mes
- "marketing real estate Riviera Maya" - 280 búsquedas/mes
- "agencia digital Playa del Carmen" - 180 búsquedas/mes

#### **Keywords secundarias**
- marketing turístico Riviera Maya
- crecimiento digital real estate
- recorridos virtuales 360 Riviera Maya
- agencia marketing real estate
- estrategia digital para proyectos

#### **Keywords long-tail**
- "agencia marketing digital para desarrollos inmobiliarios"
- "crecimiento digital para hoteles Riviera Maya"
- "marketing para beach clubs Playa del Carmen"

#### **Integración natural**
Se integran en:
- Title tag
- Meta description
- H1, H2, H3
- Párrafos iniciales de secciones
- Alt text de imágenes
- URLs (si aplica)
- Links internos (anchor text)

### 4. **Schema Markup (Structured Data)**

#### **Organization Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JUN",
  "url": "https://jun.com.mx",
  "description": "Agencia especializada en crecimiento digital...",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "email": "informes@jun.com.mx"
  }
}
```

**Ventajas**:
- Google Knowledge Panel
- Rich snippets en resultados
- Credibilidad aumentada

#### **FAQPage Schema** (recomendado agregar)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Trabajan solo con proyectos de Riviera Maya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### 5. **Jerarquía de headings**

```
H1: "Haz que tu proyecto sea la primera opción en Riviera Maya."

H2 (secciones principales):
  - "Pensado para proyectos que necesitan algo más..."
  - "Lo que suele frenar el crecimiento digital..."
  - "Servicios pensados para posicionar..."
  - etc.

H3 (subsecciones):
  - Dentro de servicios, bloques, etc.
```

**Estrategia**:
- Un único H1 claro
- H2 para cada sección principal
- H3 para detalles dentro de secciones
- No se saltan niveles

### 6. **Content SEO**

#### **Legibilidad**
- Párrafos cortos (2-3 frases)
- Frases claras y directas
- Vocabulario accesible pero profesional
- Línea de longitud 60-80 caracteres

#### **Estructura de contenido**
- Introducción clara (primeros 100 palabras)
- Subtemas con H2/H3
- Bullets/listas cuando aplica
- Conclusión o CTA

#### **Densidad de keywords**
- Objetivo: 1-2% (natural)
- No forzado (mantiene legibilidad)
- Variaciones semánticas (sinónimos, frases relacionadas)

### 7. **Technical SEO**

#### **Site structure**
```
/ (home - toda la landing en una página)
```

Es una landing, así que estructura simple. Si crece:
```
/ (home)
/blog (artículos)
/servicios/[servicio] (páginas dinámicas)
/casos-estudio/[caso] (portafolio)
```

#### **Meta tags técnicos**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0A0A0A">
<link rel="canonical" href="https://jun.com.mx">
```

#### **Sitemap** (automático en Next.js si está en public)
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jun.com.mx</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

#### **Robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://jun.com.mx/sitemap.xml
```

### 8. **Performance SEO (Core Web Vitals)**

#### **LCP (Largest Contentful Paint)** < 2.5s
- Optimizar imágenes
- Minify CSS/JS
- Lazy load en secciones inferiores
- Cache headers

#### **FID/INP** < 100ms
- Code splitting automático en Next.js
- Framer Motion optimizado
- Canvas optimizado

#### **CLS** < 0.1
- Definir alturas de imágenes
- Reservar espacio para ads/dinámicos
- Evitar cambios inesperados de layout

### 9. **On-page SEO Checklist**

✅ Title tag optimizado
✅ Meta description persuasiva
✅ H1 único y claro
✅ Jerarquía H2/H3 correcta
✅ Keywords integradas naturalmente
✅ Images con alt text descriptivo
✅ Links internos con anchor text relevante
✅ URL amigable y corta
✅ Schema markup (Organization)
✅ Mobile responsive
✅ Fast loading (< 3s)
✅ Formulario accesible
✅ Contraste de colores (WCAG AA)
✅ Open Graph tags
✅ Twitter Card tags
✅ Canonical tag
✅ Robots meta tags
✅ Sitemap.xml
✅ Robots.txt

### 10. **Off-page SEO recomendaciones**

**No está en landing, pero importante después:**

- **Backlinks**: Directorios de agencias, prensa local
- **Local SEO**: Google My Business, ubicación en mapa
- **Social signals**: Links en redes sociales
- **Content marketing**: Blog posts sobre marketing digital, real estate, Riviera Maya
- **Email marketing**: Newsletter con contenido SEO
- **Partnerships**: Links desde sitios de partners

---

## 🎯 ESTRATEGIA DE CONVERSIÓN

### 1. **Flujo de usuario optimizado**

```
HERO (impacto visual)
     ↓
TRUST BAND (confianza inmediata)
     ↓
PROBLEMA (identificación)
     ↓
VALOR (diferenciación)
     ↓
SERVICIOS (oferta clara)
     ↓
CÓMO TRABAJAMOS (proceso transparente)
     ↓
CONEXIÓN DE MARCA (narrativa)
     ↓
PARA QUIÉN (segmentación)
     ↓
CIERRE (urgencia suave)
     ↓
FAQ (objeciones resueltas)
     ↓
FORMULARIO (conversion point)
     ↓
FOOTER (info de contacto)
```

### 2. **CTAs estratégicos**

**Primario**: "Solicita tu diagnóstico estratégico"
- Bajo fricción (no es venta inmediata)
- Beneficio claro (diagnóstico = valor gratuito)
- Frecuencia: Hero, después de servicios, cierre, footer

**Secundario**: "Hablar por WhatsApp"
- Para prospectos que prefieren conversación
- Más inmediato
- Frecuencia: Hero, cierre, FAQ

### 3. **Formulario optimizado para conversión**

**Campos solicitados**:
- Nombre (identificación básica)
- Empresa (contexto)
- Tipo de proyecto (segmentación)
- WhatsApp (contacto preferido)
- Email (respaldo)
- Necesidad (calificación)

**Estrategia**:
- 6 campos = friction media (no demasiado)
- Orden lógico (general → específico)
- Validación en tiempo real
- Mensajes de error claros
- Confirmación visual post-envío

### 4. **Copy persuasivo**

**Elementos persuasivos presentes**:

1. **Especificidad**: "Riviera Maya" (no genérico)
2. **Autoridad**: "Especialistas" (credibilidad)
3. **Urgencia suave**: "El primero" (FOMO sutil)
4. **Beneficio claro**: "Crecimiento digital" (no feature)
5. **Transparencia**: "Cómo trabajamos" (confianza)
6. **Social proof**: FAQ y testimonios (validación)

### 5. **Tracking y métricas**

**Implementar** (después de lanzamiento):

- **Google Analytics 4**: Pageviews, scrolls, clics
- **Conversion tracking**: Envíos de formulario
- **Hotjar/Clarity**: Heatmaps, grabaciones
- **GTM**: Event tracking
- **UTM parameters**: Para campañas externas

---

## 📊 CHECKLIST FINAL

### Diseño
- ✅ Hero responsive con Canvas
- ✅ Paleta coherente
- ✅ Tipografía clara
- ✅ Espacios en blanco generosos
- ✅ Animaciones sutiles
- ✅ Mobile first
- ✅ Contraste WCAG AA
- ✅ Focus visible en elementos
- ✅ Componentes reutilizables

### SEO
- ✅ HTML semántico
- ✅ Meta tags optimizados
- ✅ H1 único, H2/H3 jerárquicos
- ✅ Keywords integradas
- ✅ Schema markup
- ✅ Alt text en imágenes
- ✅ Mobile responsive
- ✅ Performance (LCP, FID, CLS)
- ✅ URLs amigables
- ✅ Sitemap y robots.txt

### Conversión
- ✅ CTAs claros y visibles
- ✅ Flujo lógico
- ✅ Formulario optimizado
- ✅ Copy persuasivo
- ✅ Trust signals
- ✅ Objections addressed (FAQ)
- ✅ Múltiples puntos de contacto

---

## 🚀 Próximos pasos

1. Actualizar Formspree ID
2. Agregar Google Analytics
3. Crear FAQ page dinámico (si crece)
4. Implementar blog con SEO
5. Monitorear métricas
6. A/B testing en CTAs
7. Caso de estudios con schema
8. Newsletter para email marketing

---

Documento creado: 2024
Versión: 1.0
Autor: Claude Code - Senior Designer, Frontend Developer & SEO Strategist
