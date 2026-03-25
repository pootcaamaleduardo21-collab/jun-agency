# 🚀 Guía de Despliegue - JUN Landing Page

## Opción 1: Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js y ofrece:
- Despliegue automático desde Git
- CDN global
- SSL automático
- Analytics incluido
- Serverless functions (si necesitas)
- Preview deployments

### Pasos

#### 1. Preparar repositorio Git

```bash
# Inicializar git si no está hecho
git init
git add .
git commit -m "Initial commit: JUN landing page"

# Push a GitHub (recomendado)
git remote add origin https://github.com/tu-usuario/jun-agency.git
git branch -M main
git push -u origin main
```

#### 2. Conectar a Vercel

**Opción A: Via CLI**
```bash
npm i -g vercel
vercel
# Sigue los pasos interactivos
```

**Opción B: Via Dashboard**
1. Ir a [vercel.com](https://vercel.com)
2. Sign up / Log in
3. Importar proyecto desde GitHub
4. Seleccionar repositorio
5. Dejar configuración por defecto
6. Deploy

#### 3. Configurar dominio

**En Vercel Dashboard:**
1. Proyecto → Settings → Domains
2. Agregar dominio: `jun.com.mx`
3. Vercel proporciona nameservers
4. Actualizar DNS en registrador (GoDaddy, Namecheap, etc.)

**Esperar 24-48 horas para propagación DNS**

#### 4. Variables de entorno (si aplica)

En Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_FORMSPREE_ID = tu_id_aqui
NEXT_PUBLIC_WHATSAPP = 9851089671
NEXT_PUBLIC_EMAIL = informes@jun.com.mx
```

#### 5. Configurar Analytics (opcional)

**Vercel Analytics:**
- Ya incluido en Vercel
- Dashboard → Analytics
- Ve Core Web Vitals

**Google Analytics:**
1. Crear cuenta en Google Analytics
2. Copiar ID (formato: G-XXXXXXXXXX)
3. Agregar a variables de entorno
4. Actualizar componentes si necesita tracking

### Verificar despliegue

```bash
# Vercel CLI
vercel ls
vercel inspect
vercel logs

# O accede a vercel.com/tu-proyecto
```

---

## Opción 2: Netlify

### Pasos

1. **Crear cuenta**: [netlify.com](https://netlify.com)

2. **Conectar Git**:
   - New site from Git
   - Seleccionar GitHub
   - Autorizar Netlify
   - Seleccionar repositorio

3. **Build Settings** (deben ser automáticas):
   ```
   Build command: npm run build
   Publish directory: .next
   Node version: 18 (o superior)
   ```

4. **Configurar dominio**:
   - Site settings → Domain management
   - Agregar tu dominio
   - Actualizar nameservers o crear records CNAME

5. **Deploy automático**:
   - Cada push a main dispara build
   - Preview automático para PRs

### Variables de entorno

Site settings → Build & deploy → Environment:
```
NEXT_PUBLIC_FORMSPREE_ID = ...
```

---

## Opción 3: AWS Amplify

### Pasos

1. **AWS Console**: [console.aws.amazon.com](https://console.aws.amazon.com)

2. **Amplify Console**:
   - Crear nueva app
   - Conectar repositorio GitHub
   - Autorizar Amplify

3. **Build Settings**:
   ```
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Dominio**:
   - App settings → Domains
   - Conectar dominio personalizado
   - Route 53 para DNS

---

## Opción 4: DigitalOcean App Platform

### Pasos

1. **DigitalOcean**: [digitalocean.com](https://digitalocean.com)

2. **Apps → Create App**:
   - Conectar GitHub
   - Seleccionar repositorio

3. **Configurar**:
   ```
   Name: jun-agency
   Source Repo: tu-repo
   Build Command: npm run build
   Run Command: npm start
   ```

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=...
   ```

5. **Domain**:
   - App settings → Domains
   - Agregar jun.com.mx
   - Actualizar DNS

---

## Post-despliegue: Checklist

### 1. Verificar funcionamiento

```bash
# Visitar sitio
https://jun.com.mx

# Verificar velocidad
https://pagespeed.web.dev

# Verificar SEO
https://www.seobility.net
```

### 2. Configurar monitoreo

**Google Search Console:**
1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad: jun.com.mx
3. Verificar dominio (DNS o archivo)
4. Esperar indexación
5. Monitorear keywords, clics, posiciones

**Google Analytics:**
1. Crear propiedad en Google Analytics
2. Copiar ID
3. Integrar en landing (o Vercel Analytics)

### 3. Monitorear Core Web Vitals

**Herramientas:**
- PageSpeed Insights
- Lighthouse
- Web Vitals Chrome Extension
- Vercel Analytics (si usas Vercel)

**Objetivo:**
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

### 4. Configurar SSL/HTTPS

✅ Automático en todas las plataformas mencionadas

### 5. Configurar seguridad

**Headers de seguridad** (Vercel):
```javascript
// next.config.js
headers: async () => {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

**Headers en otras plataformas:**
- Netlify: `_headers` file
- AWS: CloudFront headers
- DigitalOcean: App settings

### 6. Configurar email (formulario)

**Opción A: Formspree (recomendado)**
```bash
# 1. Ir a https://formspree.io
# 2. Sign up
# 3. Create new form
# 4. Copiar Form ID
# 5. Actualizar en ContactForm.tsx
```

**Opción B: Brevo (Sendinblue)**
```bash
# 1. Crear cuenta en brevo.com
# 2. API key
# 3. Actualizar ContactForm.tsx con Brevo SDK
```

**Opción C: Resend (moderno, Node.js)**
```bash
npm install resend
# Actualizar ContactForm.tsx para usar Resend
```

### 7. WhatsApp Business API (opcional)

Para automatizar respuestas por WhatsApp:
```bash
# 1. Registrarse en WhatsApp Business
# 2. Obtener API credentials
# 3. Integrar en backend
# 4. Automizar respuestas
```

Menos crítico: Links wa.me funcionan sin API.

---

## Optimizaciones post-lanzamiento

### 1. Mejorar SEO

**Crear Blog:**
```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }) {
  // Contenido dinámico
}
```

**Agregar Keywords:**
- Artículos sobre marketing digital
- Guías sobre real estate + marketing
- Caso de estudios

**Backlinks:**
- Directorios de agencias
- Prensa local
- Partnerships

### 2. Mejorar Conversión

**A/B Testing:**
- Colores de botones
- Textos de CTAs
- Posición de formulario
- Copy del hero

**Herramientas:**
- Vercel A/B testing
- Google Optimize
- Optimizely

### 3. Mejorar Performance

**Lazy Loading:**
```tsx
import Image from 'next/image'

<Image
  src="/..."
  loading="lazy"
/>
```

**Code Splitting:**
```tsx
const FAQ = dynamic(() => import('./FAQ'))
```

### 4. Recolectar Datos

**Leads:**
- Formulario (ya implementado)
- Chat bot (Intercom, Drift)
- Email subscription (opcional)

**Analytics:**
- Google Analytics 4
- Hotjar (heatmaps)
- Clarity (Microsoft)

---

## Troubleshooting

### Problema: Lento despliegue
**Solución:**
- Reducir tamaño de bundle
- Lazy load imágenes
- Revisar Canvas optimization
- Usar CDN

### Problema: Formulario no envía
**Solución:**
- Verificar Formspree ID
- Revisar console logs
- Validar campos requeridos
- Probar CORS

### Problema: SEO no indexa
**Solución:**
- Esperar 2-4 semanas
- Verificar robots.txt
- Enviar sitemap a Google Search Console
- Revisar noindex meta tags

### Problema: Core Web Vitals lentos
**Solución:**
- Optimizar imágenes (WebP)
- Minify CSS/JS
- Reducir JavaScript
- Habilitar caché

---

## Costo estimado

| Plataforma | Precio | Ideal para |
|-----------|--------|-----------|
| Vercel | $0-20/mes | Pequeños proyectos |
| Netlify | $0-19/mes | Pequeños a medianos |
| AWS Amplify | $0-5/mes + compute | Proyectos grandes |
| DigitalOcean | $4-12/mes | Usuarios con control |

**Recomendación**: Vercel ($0 para empezar)

---

## ¿Preguntas frecuentes?

**¿Cuánto tarda en deployar?**
- Vercel: 1-2 minutos
- Netlify: 2-3 minutos
- AWS: 5-10 minutos

**¿Puedo cambiar de plataforma después?**
- Sí, es solo un dominio apuntando a diferente IP

**¿Necesito comprar dominio antes?**
- No, puedes deployar con dominio Vercel/Netlify primero
- Luego cambiar a jun.com.mx cuando compres

**¿Puedo hacer cambios después de deployar?**
- Sí, actualiza código, haz push, auto-redeploy

---

**Para soporte:**
- Vercel Docs: vercel.com/docs
- Netlify Docs: netlify.com/blog/support
- AWS Amplify: aws.amazon.com/amplify

Éxito 🚀
