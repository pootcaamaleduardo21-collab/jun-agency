# 📁 Estructura de Carpetas - JUN Agency

Esta es la estructura completa de tu proyecto. Entenderla te ayuda a mantener código organizado y escalable.

```
jun-agency/
├── 📂 app/                          # Next.js App Router (corazón de la app)
│   ├── layout.tsx                   # Layout global (meta tags, fonts, html)
│   ├── page.tsx                     # Página principal (/)
│   ├── globals.css                  # Estilos globales (Tailwind, animaciones)
│   └── favicon.ico                  # Icono del sitio (opcional)
│
├── 📂 components/                   # Componentes React reutilizables
│   ├── Hero.tsx                     # Sección hero con canvas animado
│   ├── TrustBand.tsx                # Proposiciones de valor
│   ├── InteractiveShowcase.tsx       # Pilares y estadísticas
│   ├── ProblemSection.tsx            # Problemas numerados
│   ├── ValueProposition.tsx          # Propuesta de valor principal
│   ├── ServicesShowcase.tsx          # Servicios con tabs interactivos
│   ├── TargetAudience.tsx            # Segmentos de audiencia
│   ├── HowWeWork.tsx                 # Proceso de trabajo (4 pasos)
│   ├── BrandConnection.tsx           # Narrativa de brand
│   ├── ClosingCTA.tsx                # Call-to-action final
│   ├── FAQ.tsx                       # Preguntas frecuentes
│   ├── ContactForm.tsx               # Formulario de contacto
│   └── Footer.tsx                    # Pie de página
│
├── 📂 public/                       # Archivos estáticos (para agregar)
│   ├── favicon.ico
│   ├── og-image.png                 # Para redes sociales
│   └── robots.txt                   # Para SEO
│
├── 📂 scripts/                      # Scripts útiles
│   ├── setup.sh                     # Instala dependencias
│   ├── build.sh                     # Compila para producción
│   └── deploy.sh                    # (Opcional) Deploy a hosting
│
├── 📂 .github/                      # GitHub específico
│   └── workflows/
│       └── deploy.yml               # GitHub Actions CI/CD
│
├── 📂 .claude/                      # Claude Code config
│   └── launch.json                  # Dev server config
│
├── 📄 Archivos de configuración    # Root level config files
│   ├── next.config.js               # Configuración Next.js
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.ts           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   ├── package.json                 # Dependencias y scripts
│   ├── package-lock.json            # Lock file (no editar)
│   ├── .env.example                 # Template de variables
│   ├── .gitignore                   # Qué NO subir a Git
│   ├── .editorconfig                # Configuración de editor
│   ├── .prettierrc.json             # Prettier formatter config
│   └── vercel.json                  # Configuración de Vercel
│
├── 📚 Documentación
│   ├── README.md                    # Inicio rápido
│   ├── QUICK_START.md               # 5 minutos para empezar
│   ├── GITHUB-SETUP.md              # Guía GitHub + Vercel completa
│   ├── GITHUB-ACTIONS-SECRETS.md   # Setup de CI/CD
│   ├── DEPLOYMENT.md                # Opciones de deployment
│   ├── HOSTINGER-DEPLOYMENT.md      # Guía específica Hostinger
│   ├── DESIGN_AND_SEO_STRATEGY.md   # Estrategia de diseño y SEO
│   ├── MAINTENANCE.md               # Mantenimiento futuro
│   ├── CAMBIOS_REALIZADOS.md        # Historial de cambios
│   ├── FOLDER-STRUCTURE.md          # Este archivo
│   └── PROJECT_SUMMARY.md           # Resumen del proyecto
│
└── 📦 node_modules/                 # Dependencias instaladas
                                     # (NO subir a Git - usar npm install)
```

---

## 📖 Explicación de directorios principales

### `/app` - Next.js App Router
Este es el corazón de tu Next.js 14. Contiene:
- **layout.tsx**: HTML global, meta tags, fonts, schemas
- **page.tsx**: La página principal que integra todos los componentes
- **globals.css**: Estilos globales, variables CSS, animaciones

**¿Por qué aquí?**
- Simplifica routing (estructura de carpetas = rutas automáticas)
- Permite Server Components por defecto (mejor performance)

**Estructura futura:**
```
app/
├── page.tsx                    # Página inicio /
├── layout.tsx                  # Layout global
├── globals.css
├── (marketing)/                # Rutas agrupadas
│   ├── about/page.tsx          # /about
│   ├── blog/page.tsx           # /blog
│   └── layout.tsx              # Layout para grupo
├── api/                        # Rutas API (backend)
│   └── contact/route.ts        # POST /api/contact
└── dashboard/                  # Rutas protegidas (futuro)
    ├── page.tsx                # /dashboard
    └── layout.tsx
```

### `/components` - Componentes React
Donde viven tus componentes reutilizables.

**Organización recomendada para el futuro:**
```
components/
├── hero/
│   ├── Hero.tsx                # Componente principal
│   ├── Hero.module.css         # Estilos específicos (opcional)
│   └── types.ts                # TypeScript types
│
├── forms/
│   ├── ContactForm.tsx
│   ├── Input.tsx               # Input reutilizable
│   └── Button.tsx              # Button reutilizable
│
├── ui/                         # Componentes genéricos
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── Tabs.tsx
│
├── sections/                   # Secciones de página
│   ├── Services.tsx
│   ├── Pricing.tsx
│   └── Testimonials.tsx
│
└── shared/                     # Componentes compartidos
    ├── Header.tsx
    ├── Navigation.tsx
    └── Footer.tsx
```

### `/scripts` - Automación
Scripts para automatizar tareas comunes:
- **setup.sh**: Instala dependencias
- **build.sh**: Compila para producción
- **deploy.sh**: Deploy a servidor (opcional)

### `.github/workflows/` - Automatización GitHub
**deploy.yml**: Se ejecuta automáticamente cuando haces push
- Instala dependencias
- Compila código
- Ejecuta tests
- Despliega a Vercel

### Configuración en `/root`
Todos los archivos de configuración en la raíz:
- **next.config.js**: Optimizaciones Next.js
- **tailwind.config.ts**: Colores, espacios, plugins
- **tsconfig.json**: Reglas TypeScript
- **postcss.config.js**: Procesamiento CSS
- **package.json**: Dependencias y scripts

---

## 🚀 Estructura para el futuro

### Si agregar un BLOG

```
app/
├── blog/
│   ├── page.tsx                # /blog (lista de posts)
│   ├── [slug]/
│   │   └── page.tsx            # /blog/mi-primer-post
│   ├── layout.tsx
│   └── mdx-components.tsx      # Para Markdown
│
├── content/
│   └── blog/
│       ├── post-1.mdx
│       ├── post-2.mdx
│       └── post-3.mdx
│
└── lib/
    ├── mdx.ts                  # Funciones para leer MDX
    └── blog.ts                 # Lógica de blog
```

**Dependencias a agregar:**
```bash
npm install next-mdx-remote
npm install gray-matter
```

### Si agregar un DASHBOARD

```
app/
├── dashboard/
│   ├── page.tsx                # /dashboard
│   ├── layout.tsx              # Layout con sidebar
│   ├── analytics/page.tsx       # /dashboard/analytics
│   ├── settings/page.tsx        # /dashboard/settings
│   └── components/
│       ├── Sidebar.tsx
│       └── Header.tsx
│
└── api/
    ├── auth/[...nextauth]/route.ts
    └── analytics/route.ts
```

**Dependencias a agregar:**
```bash
npm install next-auth
npm install @prisma/client prisma
```

### Si agregar un CMS

Opciones:
1. **Headless CMS (Recomendado)**
   - Contentful
   - Sanity
   - Strapi

2. **Markdown-based (Simple)**
   - MDX files
   - Frontmatter

3. **Database (Escalable)**
   - Prisma + PostgreSQL
   - MongoDB

**Estructura resultante:**
```
app/
├── api/
│   └── content/route.ts        # API para contenido
│
├── lib/
│   ├── cms/
│   │   ├── contentful.ts       # Client Contentful
│   │   └── fetch.ts            # Funciones fetch
│   │
│   └── types/
│       ├── post.ts
│       ├── page.ts
│       └── author.ts
│
└── utils/
    └── cache.ts                # Caching estrategia
```

---

## 📊 Flujo de archivos

```
Usuario visita jun.com.mx
        ↓
    layout.tsx (meta tags, fonts, global setup)
        ↓
    page.tsx (integra componentes)
        ↓
    13 Componentes en /components/
        ↓
    globals.css (estilos, animaciones, variables)
        ↓
    tailwind.config.ts (colores, espacios)
        ↓
    Página renderizada
```

---

## 🔧 Archivos clave a conocer

| Archivo | Qué hace | Cuándo editar |
|---------|----------|---------------|
| `app/page.tsx` | Integra componentes | Cuando cambias orden de secciones |
| `app/globals.css` | Estilos globales | Cuando cambias colores o animaciones |
| `components/*.tsx` | Cada sección | Para cambiar contenido o lógica |
| `tailwind.config.ts` | Configuración de estilos | Cuando cambias colores, fuentes, espacios |
| `next.config.js` | Optimizaciones Next.js | Casi nunca (solo expertos) |
| `package.json` | Dependencias | Cuando agregas librerías |
| `.env.example` | Template variables | Cuando agregas nuevas variables |

---

## ✅ Best Practices de estructura

### DO's ✅
- Componentes pequeños y reutilizables
- Tipos TypeScript definidos
- Estilos compartidos en globals.css
- Funciones útiles en `lib/` folder
- Archivos de configuración en raíz

### DON'Ts ❌
- Componentes muy grandes (>200 líneas)
- Estilos inline en componentes
- Lógica compleja en layout.tsx
- Dependencias sin propósito
- Archivos sin extensión .tsx o .ts

---

## 🎯 Cómo navegar el código

**Quiero cambiar colores:**
→ `tailwind.config.ts` o `app/globals.css`

**Quiero agregar sección:**
→ Crear archivo en `/components/` + agregar a `app/page.tsx`

**Quiero cambiar formulario:**
→ `components/ContactForm.tsx`

**Quiero agregar script (analytics, ads):**
→ `app/layout.tsx` en `<Script>`

**Quiero agregar página:**
→ Crear `app/nueva-pagina/page.tsx`

**Quiero agregar API:**
→ Crear `app/api/nombre/route.ts`

---

## 📈 Crecimiento recomendado

**Fase 1 (Ahora): Landing Page**
```
✅ Home + contacto
✅ SEO básico
✅ Formulario funcional
```

**Fase 2 (Próximo mes): Blog**
```
+ Sección blog
+ Artículos MDX
+ Categorías
+ Analytics
```

**Fase 3 (Trimestre): CMS Integrado**
```
+ Admin dashboard
+ Editor de contenido
+ Usuarios y roles
+ Base de datos
```

**Fase 4 (Futuro): Aplicación completa**
```
+ Membership
+ Pagos (Stripe)
+ Chat en vivo
+ Notificaciones
```

---

## 🔗 Relacionado

- [README.md](./README.md) - Tech stack y features
- [GITHUB-SETUP.md](./GITHUB-SETUP.md) - Publicar en GitHub
- [MAINTENANCE.md](./MAINTENANCE.md) - Mantener actualizado

**Última actualización:** 2026-03-24
**Estado:** Production Ready
