# JUN - Landing Page Premium

Landing page moderna y estratégica para JUN, agencia de marketing digital especializada en real estate y turismo en la Riviera Maya.

## Características

- **Hero dinámico responsivo** con fondo interactivo que responde al movimiento del mouse
- **Optimizado para SEO** con estructura HTML semántica, metadatos completos y schema markup
- **100% responsivo** - Mobile first, tablet y desktop
- **Conversión orientada** - CTAs estratégicamente ubicados, formularios optimizados
- **Componentes reutilizables** - Arquitectura modular y escalable
- **Animaciones sutiles** - Transiciones elegantes sin distracciones
- **Performance optimizado** - Carga rápida, imágenes optimizadas, lazy loading
- **Accesibilidad** - WCAG compliant, contraste adecuado, navegación por teclado

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Tipografía**: Satoshi, Poppins
- **Formularios**: API nativa de Next.js con Nodemailer
- **Despliegue**: Vercel

## Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/pootcaamaleduardo21-collab/jun-mkt-landing.git
cd jun-mkt-landing
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
Crear archivo `.env.local` basado en `.env.example`:
```bash
cp .env.example .env.local
```

Luego completar con tus credenciales SMTP:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@junmkt.com
```

4. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Compilar para Producción

```bash
npm run build
npm start
```

## Configuración SMTP

El formulario de contacto envía emails usando Nodemailer. Necesitas configurar un servicio SMTP:

### Opciones recomendadas:
- **Gmail**: Usa contraseñas de aplicación
- **SendGrid**: Servicio SMTP confiable
- **Mailgun**: Buena alternativa
- **AWS SES**: Escalable
- **Hosting local**: Si tienes servidor SMTP propio

## Estructura del Proyecto

```
jun-mkt-landing/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API para formulario de contacto
│   ├── layout.tsx                 # Layout principal con metadatos SEO
│   ├── page.tsx                   # Página principal
│   └── globals.css                # Estilos globales
├── components/
│   ├── Hero.tsx                   # Sección hero con fondo dinámico
│   ├── TrustStrip.tsx             # Franja de confianza
│   ├── ProblemSection.tsx         # Sección de problemas
│   ├── ValueProposition.tsx       # Propuesta de valor
│   ├── Services.tsx               # Servicios
│   ├── HowWeWork.tsx              # Cómo trabajamos
│   ├── BrandConnection.tsx        # Conexión de marca
│   ├── ForWho.tsx                 # Para quién es JUN
│   ├── ClosingSection.tsx         # Sección de cierre
│   ├── FAQ.tsx                    # Preguntas frecuentes
│   └── ContactForm.tsx            # Formulario de contacto
├── public/                        # Activos estáticos
├── .env.example                   # Variables de entorno ejemplo
├── .gitignore                     # Archivos ignorados por git
├── package.json                   # Dependencias
├── tailwind.config.ts             # Configuración de Tailwind
├── tsconfig.json                  # Configuración de TypeScript
└── README.md                      # Este archivo
```

## Variables de Entorno

Crear archivo `.env.local` con:

```env
NEXT_PUBLIC_SITE_URL=https://junmkt.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@junmkt.com
```

## Despliegue en Vercel

1. **Conectar repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub

2. **Configurar variables de entorno**
   - En Vercel Dashboard → Settings → Environment Variables
   - Añade las mismas variables que en `.env.local`

3. **Desplegar**
   - Cada push a `main` se despliega automáticamente

## Optimización SEO

La landing incluye:

- ✅ H1 único y descriptivo
- ✅ Jerarquía correcta de headings (H2, H3)
- ✅ Title tag optimizado (70 caracteres)
- ✅ Meta description persuasiva (160 caracteres)
- ✅ Open Graph tags para redes sociales
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Keywords estratégicas naturalmente integradas
- ✅ Alt text en imágenes
- ✅ Estructura semántica HTML5
- ✅ Mobile responsive (mobile first)
- ✅ Core Web Vitals optimizados
- ✅ Lazy loading en imágenes
- ✅ Schema.org Organization markup

## Performance

- ✅ Imágenes optimizadas con formatos AVIF y WebP
- ✅ CSS purificado (Tailwind)
- ✅ JavaScript minimizado y splitteado
- ✅ Fuentes optimizadas
- ✅ Lazy loading estratégico
- ✅ Caching headers configurados
- ✅ CDN global con Vercel

## Customización

### Cambiar colores
Editar `tailwind.config.ts`:
```ts
colors: {
  'jun-black': '#0a0a0a',
  'jun-sand': '#d4c4b0',
  // ... etc
}
```

### Cambiar contenido
Cada componente contiene el contenido en texto. Editar directamente en los archivos TSX.

### Cambiar email de contacto
En `app/api/contact/route.ts` cambiar:
```ts
to: 'tu-email@junmkt.com',
```

## Testing

Para testear el formulario localmente:
1. Configurar SMTP válido en `.env.local`
2. Llenar y enviar formulario
3. Verificar que se reciba email en `informes@junmkt.com`

## Soporte

Para dudas o cambios, contactar al equipo de desarrollo.

## Licencia

Proyecto propietario de JUN Marketing Agency.
