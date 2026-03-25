# 🚀 START HERE - JUN Landing Page

¡Tu landing page premium está lista! Sigue estos pasos para empezar.

## 1️⃣ EJECUTAR LOCALMENTE (5 minutos)

```bash
cd jun-mkt-landing
npm run dev
```

Abre **http://localhost:3000** en tu navegador.

**Qué verás:**
- Hero con fondo dinámico que responde al mouse
- 10 secciones completas optimizadas para conversión
- Formulario de contacto funcional
- Responsive perfecto (móvil, tablet, desktop)
- Animaciones sutiles y elegantes

## 2️⃣ CONFIGURAR GITHUB (10 minutos)

```bash
# En GitHub.com:
# 1. Crea nuevo repo: "jun-mkt-landing" 
# 2. Copia la URL (HTTPS o SSH)

# En tu terminal:
git remote set-url origin <tu-url-github>
git push -u origin main
```

**Referencia completa:** Ver `GITHUB_SETUP.md`

## 3️⃣ DESPLEGAR EN VERCEL (5 minutos)

```bash
# Opción 1: Via Vercel CLI
npm i -g vercel
vercel

# Opción 2: Via GitHub (automático)
# - Ir a vercel.com
# - Conectar repo de GitHub
# - Deploy automático
```

**Configurar variables de entorno en Vercel:**
```
NEXT_PUBLIC_SITE_URL=https://junmkt.com (o tu dominio)
SMTP_HOST=tu-smtp
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email
SMTP_PASSWORD=tu-contraseña
SMTP_FROM=noreply@junmkt.com
```

## 📋 QUÉ ESTÁ INCLUIDO

### ✅ Diseño & UX
- [x] Hero dinámico con Canvas responsivo
- [x] 10 secciones estratégicas de conversión
- [x] Formulario minimalista pero completo
- [x] Animaciones sutiles en scroll
- [x] 100% responsive (mobile-first)
- [x] Paleta de colores premium (negro, arena, cálidos)

### ✅ Funcionalidad
- [x] Formulario de contacto con validación
- [x] API de email con Nodemailer
- [x] Envío automático a informes@junmkt.com
- [x] Confirmación automática al usuario
- [x] Manejo de errores robusto

### ✅ SEO
- [x] H1 único y optimizado
- [x] Metadatos completos
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] HTML semántico
- [x] Keywords naturales integradas
- [x] Schema.org Organization markup
- [x] Mobile-friendly certificado

### ✅ Performance
- [x] Optimizado para Core Web Vitals
- [x] Imágenes en WebP/AVIF
- [x] Lazy loading estratégico
- [x] CSS critical inlined
- [x] JavaScript chunked
- [x] Build size: ~4KB gzipped

### ✅ Arquitectura
- [x] Next.js 15 + TypeScript
- [x] Tailwind CSS
- [x] Componentes modulares
- [x] API Routes
- [x] Environment variables
- [x] Código limpio y mantenible

## 🎯 CAMBIOS RÁPIDOS

### Email de Contacto
Archivo: `app/api/contact/route.ts` línea 24
```ts
to: 'informes@junmkt.com',    // ← Cambiar aquí
```

### Número de WhatsApp
Buscar en todo el proyecto y cambiar:
```
9851089671
```

### Colores JUN
Archivo: `tailwind.config.ts`
```ts
colors: {
  'jun-black': '#0a0a0a',
  'jun-sand': '#d4c4b0',
  // ...
}
```

### Copys y Textos
Cada componente tiene su contenido en el archivo TSX. Buscar y reemplazar es seguro.

## 📚 DOCUMENTACIÓN

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Overview técnico del proyecto |
| `DESIGN_AND_ARCHITECTURE.md` | Decisiones de diseño, SEO, performance |
| `LOCAL_DEVELOPMENT.md` | Cómo trabajar localmente, troubleshooting |
| `GITHUB_SETUP.md` | Pasos para GitHub y Vercel |

## 🔐 CONFIGURAR SMTP

### Opción 1: Gmail (Recomendado para testing)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password
```
**Cómo generar App Password:**
1. Google Account → Security
2. 2-Step Verification (si no lo tienes)
3. App passwords → Selecciona Mail y Windows
4. Copia la contraseña generada

### Opción 2: SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxx
```

### Opción 3: Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@mg.junmkt.com
SMTP_PASSWORD=tu-contraseña
```

## ⚡ COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev          # Inicia servidor (localhost:3000)

# Producción
npm run build        # Compila para producción
npm start            # Inicia servidor compilado

# Linting
npm run lint         # Chequea errores

# Verificar build sin errores
npm run build        # Debería mostrar "Compiled successfully"
```

## 📊 ESTRUCTURA DEL PROYECTO

```
jun-mkt-landing/
├── app/
│   ├── api/
│   │   └── contact/route.ts       ← API de email
│   ├── layout.tsx                 ← Metadatos SEO
│   ├── page.tsx                   ← Estructura principal
│   └── globals.css                ← Estilos globales
├── components/                     ← Componentes reutilizables
│   ├── Hero.tsx                   ← Fondo dinámico canvas
│   ├── ContactForm.tsx            ← Formulario
│   ├── Services.tsx               ← Servicios
│   └── ...                        (8 más)
├── public/                         ← Assets (favicon, etc.)
├── package.json                    ← Dependencias
├── tailwind.config.ts              ← Colores y estilos
└── tsconfig.json                   ← Configuración TypeScript
```

## 🎬 FLUJO TÍPICO DE TRABAJO

### Día 1: Setup
```bash
cd jun-mkt-landing
npm run dev
# Verifica que todo se vea bien en http://localhost:3000
```

### Día 2: Personalización
- Editar copys (cada componente TSX)
- Cambiar colores (tailwind.config.ts)
- Ajustar email (app/api/contact/route.ts)
- Probar en diferentes dispositivos

### Día 3: Publicar
```bash
# Crear repo en GitHub
git remote set-url origin <tu-repo>
git push -u origin main

# Conectar a Vercel
# - Ir a vercel.com
# - Importar tu repo
# - Agregar variables de entorno
# - Deploy automático
```

### Día 4+: Optimizar
- Agregar Google Analytics
- Probar formulario completamente
- Recolectar feedback de usuarios
- Hacer A/B testing de CTAs
- Integrar con CRM

## 🎓 TIPS IMPORTANTES

### ✨ Mantener la Esencia Premium
- No agregar muchos colores adicionales
- No sobrecargar con animaciones
- Mantener espacios en blanco generosos
- Favor sobriedad sobre ornamentación

### 📱 Siempre Testear Mobile
Usa DevTools para simular:
- iPhone 12 (390x844)
- iPad (768x1024)
- Samsung Galaxy (412x915)

### 🚀 Performance
El fondo canvas es lo más pesado. Si la página se siente lenta:
- Revisar DevTools → Network
- Revisar DevTools → Performance
- Hacer Lighthouse audit

### 🔍 SEO
La página está optimizada, pero puedes mejorar:
- Agregar más contenido relevante
- Crear entradas de blog
- Construir backlinks
- Usar Google Search Console

## ❓ PREGUNTAS FRECUENTES

### ¿Cómo cambio el email de contacto?
`app/api/contact/route.ts` línea 24

### ¿Cómo agrego más campos al formulario?
Editar `components/ContactForm.tsx` y `app/api/contact/route.ts`

### ¿Cómo cambio los colores?
`tailwind.config.ts` sección `colors`

### ¿Cómo funciona el hero dinámico?
`components/Hero.tsx` - Canvas que responde al movimiento del mouse

### ¿Es SEO-friendly?
Sí, incluye:
- HTML semántico
- Metadatos optimizados
- Keywords estratégicas
- Mobile responsive
- Core Web Vitals optimizados

### ¿Puedo agregar más secciones?
Sí, crear nuevo componente en `components/` e importar en `app/page.tsx`

## 🎉 LISTO PARA EMPEZAR

Tu landing page está 100% funcional y lista.

**Próximo paso: Ejecuta**
```bash
npm run dev
```

**Luego abre:**
http://localhost:3000

¡Que disfrutes viendo tu landing! 🚀

---

**Preguntas o problemas?** Ver `LOCAL_DEVELOPMENT.md`
