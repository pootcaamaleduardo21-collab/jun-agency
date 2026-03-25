# 📋 Mantenimiento y Actualizaciones - JUN Landing Page

## 🔄 Ciclo de mantenimiento recomendado

### Diario
- Revisar formularios enviados
- Monitorear WhatsApp
- Responder leads calificados

### Semanal
- Revisar Google Search Console
- Monitorear formularios
- Verificar no hay errores en servidor
- Actualizar contenido si necesita

### Mensual
- Revisar métricas de conversión
- Analizar Google Analytics
- Verificar Core Web Vitals
- Actualizar dependencias (npm)

### Trimestral
- Revisar SEO performance
- A/B testing si aplica
- Actualizar copy si necesita
- Evaluar cambios en mercado

### Anual
- Gran revisión de diseño
- Actualizar Next.js
- Renovar certificados SSL
- Revisar estrategia global

---

## 📝 Cómo actualizar contenido

### Cambiar Copy/Texto

**1. Archivo a modificar:**
```
Componente específico en /components/
```

**2. Ejemplo: Cambiar headline del hero**

```tsx
// components/Hero.tsx

// ANTES:
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
  Haz que tu proyecto sea la{' '}
  <span className="gradient-text">primera opción</span> en Riviera Maya.
</h1>

// DESPUÉS:
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
  Tu headline nuevo aquí
</h1>
```

**3. Guardar y ver cambios**
```bash
# El servidor hot-reloads automáticamente
# Abre http://localhost:3000
```

### Cambiar Colores

**1. Archivo: `app/globals.css`**

```css
:root {
  --color-black: #0a0a0a;      /* Fondo */
  --color-cream: #f5f1ed;      /* Texto principal */
  --color-sand: #d4af9a;       /* Acentos */
  --color-gray: #7a7a7a;       /* Grises */
  --color-dark-gray: #2a2a2a;  /* Secciones */
}
```

**2. Cambiar en Tailwind** (`tailwind.config.ts`):

```ts
colors: {
  black: '#0A0A0A',
  cream: '#F5F1ED',
  sand: '#D4AF9A',
  // Agregar nuevos colores aquí
}
```

### Cambiar Tipografía

**1. Archivo: `app/layout.tsx`**

```tsx
// Cambiar fuentes importadas
import { Inter, Sora } from 'next/font/google';

// O agregar nuevas:
import { Outfit, DM_Sans } from 'next/font/google';
```

**2. Actualizar en layout:**
```tsx
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
```

---

## 🖼️ Cómo agregar imágenes

### Opción 1: Agregar logo o imágenes estáticas

**1. Guardar imagen en:**
```
public/images/logo.png
public/images/hero-bg.jpg
```

**2. Usar en componentes:**
```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo JUN"
  width={200}
  height={50}
/>
```

### Opción 2: Agregar imagen de fondo

**En CSS:**
```css
.hero {
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

**En Tailwind:**
```tsx
<div className="bg-cover bg-center" style={{
  backgroundImage: 'url(/images/hero-bg.jpg)'
}}>
```

### Optimizar imágenes

```bash
# Usar herramientas como:
# - TinyPNG (tinypng.com)
# - ImageOptim
# - Squoosh (squoosh.app)

# Formatos recomendados:
# - WebP (mejor compresión)
# - PNG (con transparencia)
# - JPG (fotos)
```

---

## 🔧 Actualizar componentes

### Ejemplo: Agregar nueva sección

**1. Crear componente:**
```tsx
// components/NewSection.tsx

'use client';

import { motion } from 'framer-motion';

const NewSection = () => {
  return (
    <section className="section section-dark">
      <div className="container">
        <h2>Contenido nuevo</h2>
        {/* Contenido */}
      </div>
    </section>
  );
};

export default NewSection;
```

**2. Importar en page.tsx:**
```tsx
import NewSection from '@/components/NewSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBand />
      <NewSection /> {/* Nueva sección */}
      {/* resto */}
    </main>
  );
}
```

**3. Guardar y verificar**

---

## 🐛 Resolver errores comunes

### Error: "Module not found"

**Causa:** Import incorrecto
**Solución:** Verificar ruta

```tsx
// ❌ INCORRECTO
import Hero from './Hero';

// ✅ CORRECTO
import Hero from '@/components/Hero';
```

### Error: "Cannot read property..."

**Causa:** Variable no inicializada
**Solución:** Agregar default

```tsx
// ✅ Verificar existencia
const color = colors?.[0] || 'black';
```

### Formulario no envía

**Causa:** Formspree ID incorrecto
**Solución:** Verificar en ContactForm.tsx

```tsx
// Verificar esta línea:
const response = await fetch('https://formspree.io/f/xyzwvu', {
  // xyzwvu = tu ID
});
```

---

## 📦 Actualizar dependencias

### Ver actualizaciones disponibles

```bash
npm outdated
```

### Actualizar todas

```bash
npm update
```

### Actualizar específica

```bash
npm install framer-motion@latest
npm install react-hook-form@latest
```

### Actualizar Next.js

```bash
npm install next@latest
```

**Después:**
```bash
npm run build
npm run dev
```

---

## 🧪 Testear antes de deployar

### Testear localmente

```bash
# Development
npm run dev

# Producción (como desplegará)
npm run build
npm run start
```

### Checklist antes de push

- [ ] Sin errores en console
- [ ] Sin warnings en build
- [ ] Responsive en mobile (375px)
- [ ] Responsive en tablet (768px)
- [ ] Responsive en desktop (1920px)
- [ ] Formulario funciona
- [ ] Links funcionan
- [ ] Animaciones suaves
- [ ] Performance OK (Lighthouse > 90)

---

## 📊 Monitorear métricas

### Google Analytics

**Configurar eventos personalizados:**

```tsx
// Cuando se envía formulario
const analytics = window.gtag;
analytics('event', 'form_submit', {
  'event_category': 'engagement',
  'event_label': 'contact_form'
});
```

**Métricas importantes:**
- Pageviews
- Scroll depth
- Time on page
- Form completions
- CTR en botones
- Conversión

### Google Search Console

**Acciones:**
- Enviar sitemap
- Verificar indexación
- Monitorear ranking keywords
- Revisar mobile usability
- Solucionar errores de crawl

### Core Web Vitals

**Herramientas:**
- PageSpeed Insights
- Lighthouse
- Vercel Analytics
- Web Vitals Extension

**Objetivos:**
- LCP: < 2.5s ✅
- CLS: < 0.1 ✅
- INP: < 200ms ✅

---

## 🎯 Optimizar conversión

### A/B Testing

**Cambiar elemento:**
```tsx
const useVariant = Math.random() > 0.5;

return (
  useVariant ? (
    <button>Variante A</button>
  ) : (
    <button>Variante B</button>
  )
);
```

**Medir en Analytics:**
- Cual variante convierte más
- Implementar ganador

### Elementos para testar

1. **Color de botón primario**
   - Blanco vs Negro vs Arena

2. **Copy de CTA**
   - "Solicitar diagnóstico" vs "Comenzar ahora"

3. **Posición de formulario**
   - Antes de FAQ vs Después
   - Sidebar vs Full width

4. **Hero headline**
   - Versión 1 vs Versión 2

### Herramientas de A/B Testing

- **Vercel A/B Testing**
- **Google Optimize** (deprecado, usa GA4)
- **Optimizely**
- **VWO**

---

## 🔐 Seguridad

### Verificar regularmente

- [ ] No hay secrets en código
- [ ] Todos los inputs validados
- [ ] HTTPS habilitado
- [ ] Security headers presentes
- [ ] Dependencies actualizadas (sin vulnerabilidades)

### Checkear vulnerabilidades

```bash
npm audit
npm audit fix
```

---

## 📈 Escalar el proyecto

### Agregar blog

```typescript
// app/blog/page.tsx - Listar posts
// app/blog/[slug]/page.tsx - Post individual
// lib/blog.ts - Funciones para leer markdown
```

### Agregar portafolio

```typescript
// app/casos-estudio/page.tsx
// app/casos-estudio/[slug]/page.tsx
```

### Agregar newsletter

```tsx
// Integrar con Brevo, Mailchimp o Substack
// Agregar en footer o sidebar
```

### Agregar chat

```tsx
// Integrar Intercom, Drift o Crisp
// Widget flotante para mensajes
```

---

## 📚 Recursos útiles

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

### Performance
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Web.dev](https://web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### SEO
- [Google Search Console](https://search.google.com/search-console)
- [Ahrefs](https://ahrefs.com)
- [SEMrush](https://www.semrush.com)

### Analytics
- [Google Analytics](https://analytics.google.com)
- [Hotjar](https://www.hotjar.com)
- [Vercel Analytics](https://vercel.com/analytics)

---

## 🆘 Soporte

**Si algo no funciona:**

1. Revisar console del navegador (F12)
2. Revisar terminal donde corre `npm run dev`
3. Buscar error en Google + "next.js"
4. Revisar documentación oficial
5. Consultar Stack Overflow

**Comunidades:**
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [Tailwind Discord](https://discord.gg/tailwindcss)

---

## ✅ Checklist de mantenimiento mensual

- [ ] Revisar formularios y leads
- [ ] Revisar Google Search Console
- [ ] Revisar Core Web Vitals
- [ ] Actualizar dependencias
- [ ] Revisar errores en servidor
- [ ] Verificar links funcionan
- [ ] Revisar copia necesita actualización
- [ ] Analizar conversiones
- [ ] Planear mejoras

---

**Última actualización:** 2024
**Próxima revisión:** Mensualmente
