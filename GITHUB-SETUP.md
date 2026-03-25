# 🚀 Guía Completa: GitHub + Vercel Deployment

Esta guía te lleva paso a paso para publicar tu landing page en GitHub y desplegarla automáticamente en Vercel.

---

## 📋 PASO 1: Preparar tu máquina local

### Verificar que tienes Git instalado:
```bash
git --version
```

Si no tienes Git, descárgalo desde: https://git-scm.com/download

### Configurar tu identidad en Git:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@gmail.com"

# Verificar configuración
git config --global --list
```

---

## 📦 PASO 2: Inicializar Git en tu proyecto

En la terminal, ve a tu carpeta del proyecto:

```bash
cd ~/tu-ruta/jun-agency
```

Inicializar Git:
```bash
git init
```

Agregar todos los archivos:
```bash
git add .
```

Crear primer commit:
```bash
git commit -m "Initial commit: JUN Landing Page - Production Ready"
```

---

## 🔑 PASO 3: Crear repositorio en GitHub

### 1. Ve a https://github.com/new

### 2. Llena el formulario:
- **Repository name:** `jun-agency` (o el nombre que quieras)
- **Description:** "Premium marketing landing page - JUN Agency"
- **Visibility:** Público (si quieres que sea visible)
- **DO NOT initialize** con README, .gitignore, o license (ya los tenemos)

### 3. Click "Create repository"

### 4. Copiar comandos que GitHub te da. Debería ser algo como:

```bash
# Agregar repositorio remoto (copia la URL exacta que GitHub te da)
git remote add origin https://github.com/TU_USUARIO/jun-agency.git

# Cambiar rama principal a main (importante para Vercel)
git branch -M main

# Hacer push del código
git push -u origin main
```

---

## ✅ PASO 4: Verificar que está en GitHub

- Ve a: https://github.com/TU_USUARIO/jun-agency
- Deberías ver todos tus archivos allí

---

## 🎯 PASO 5: Conectar a Vercel

### Opción A: Deployment automático (RECOMENDADO)

**1. Ve a:** https://vercel.com/new

**2. Click "Import Project"**

**3. Conecta tu GitHub:**
- Click "Continue with GitHub"
- Autoriza Vercel
- Selecciona tu repositorio `jun-agency`

**4. Configurar proyecto:**
- **Project name:** `jun-agency`
- **Framework:** Next.js (auto-detectado)
- **Root directory:** ./
- **Build command:** `npm run build`
- **Output directory:** `.next`
- Click "Deploy"

**5. Agregar variables de entorno:**
En Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_DOMAIN = https://jun.com.mx
NEXT_PUBLIC_WHATSAPP = 9851089671
NEXT_PUBLIC_EMAIL = informes@jun.com.mx
```

**6. Click "Deploy"**

🎉 **¡LISTO! Tu sitio está en vivo en ~2 minutos**

Vercel te dará una URL como: `https://jun-agency.vercel.app`

---

## 🌐 PASO 6: Conectar dominio personalizado

### Si tienes dominio en Hostinger:

**En Vercel:**
1. Ir a Dashboard → Settings → Domains
2. Click "Add"
3. Ingresa tu dominio: `jun.com.mx`
4. Vercel te dará los **nameservers**

**En Hostinger:**
1. Ir a Dominios → Administrar → Cambia los nameservers a los que Vercel te da
2. Esperar 24-48 horas para propagación

### Si tienes dominio en otro registrador:
- El proceso es similar: cambiar nameservers a los de Vercel

---

## 🔄 PASO 7: Configurar GitHub Actions (Automático)

Ya incluimos `.github/workflows/deploy.yml` que automáticamente:
- ✅ Compila tu código con cada push
- ✅ Ejecuta tests (si hay)
- ✅ Despliega a Vercel automáticamente

Para que funcione, necesitas agregar secretos a tu repositorio:

**En GitHub:**
1. Ve a: Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"

Agregar estos 3 secretos:

| Nombre | Valor |
|--------|-------|
| `VERCEL_TOKEN` | Token de Vercel (ver abajo) |
| `VERCEL_ORG_ID` | Organization ID de Vercel |
| `VERCEL_PROJECT_ID` | Project ID de Vercel |

**Cómo obtener los valores:**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Listar tus tokens
vercel env ls --scope=your_vercel_username
```

O desde Vercel Dashboard:
- Settings → Tokens → Create Token (Copia el valor)
- Settings → General → Org ID y Project ID

---

## 📝 PASO 8: Actualizar código (Workflow diario)

Una vez está en GitHub, actualizar es super simple:

```bash
# Hacer cambios a tus archivos...

# Cuando termines:
git add .
git commit -m "Describe los cambios que hiciste"
git push origin main
```

**¡Automáticamente:**
1. ✅ GitHub Actions compila tu código
2. ✅ Vercel ve el cambio en GitHub
3. ✅ Vercel despliega automáticamente
4. ✅ Tu sitio se actualiza en ~1 minuto

---

## 🛠️ Comandos rápidos para el futuro

```bash
# Ver estado de tu repo local
git status

# Ver historial de commits
git log --oneline

# Ver branches
git branch -a

# Crear una nueva rama para trabajar (SIN afectar main)
git checkout -b feature/mi-nueva-feature

# Cambiar a rama main
git checkout main

# Ver cambios pendientes
git diff

# Ver cambios que ya agregaste (staged)
git diff --cached

# Deshacer último commit (local, no publicado)
git reset HEAD~1
```

---

## ⚡ PASO 9: Optimizaciones para el futuro

### Agregar ESLint (Linting)
```bash
npm install --save-dev eslint eslint-config-next
```

### Agregar Prettier (Code formatter)
```bash
npm install --save-dev prettier
```

### Crear `.prettierrc.json`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Agregar scripts a `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{ts,tsx,md,json,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🚀 PASO 10: Integración de formulario (Formspree)

Tu formulario está configurado para usar **Formspree**.

Para empezar a recibir emails:

1. Ve a: https://formspree.io
2. Sign up (gratis)
3. Click "New form"
4. Ingresa tu email
5. Copiar el ID del formulario (formato: `f_xxxyyy`)
6. En `components/ContactForm.tsx` línea ~28, cambiar:
   ```typescript
   action: "https://formspree.io/f/AQUI_VA_TU_ID"
   ```

---

## 📊 PASO 11: Monitoreo y Analytics

### Google Analytics:
1. Ve a: https://analytics.google.com
2. Create property
3. Copiar el `MEASUREMENT_ID`
4. En `app/layout.tsx`, agregar:
```typescript
<Script strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXX`} />
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXX');
  `}
</Script>
```

### Uptime Monitoring:
- https://uptimerobot.com (gratis)
- Te alerta si tu sitio cae

### Performance Monitoring:
- Vercel Dashboard → Analytics (gratis)
- Ver performance de tu sitio

---

## 🎯 Checklist final

- [ ] Git configurado globalmente (`git config --global --list`)
- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub (`git push origin main`)
- [ ] Vercel conectado y deployado
- [ ] Dominio conectado (nameservers actualizados)
- [ ] Variables de entorno configuradas en Vercel
- [ ] GitHub Secrets agregados (VERCEL_TOKEN, etc.)
- [ ] Formulario Formspree ID configurado
- [ ] Google Analytics agregado
- [ ] Sitio funcional en tu dominio

---

## 🆘 Troubleshooting

### Error: "fatal: not a git repository"
```bash
cd /tu/ruta/jun-agency
git init
```

### Error: "Permission denied (publickey)"
- Necesitas agregar tu SSH key a GitHub
- https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Error: "Vercel deployment failed"
- Ve a Vercel Dashboard → Deployments
- Click en el deployment fallido
- Lee el error detallado
- Generalmente es falta de variables de entorno

### Sitio funciona en local pero no en Vercel
- Verifica variables de entorno en Vercel Settings
- Verifica el build log en Vercel Dashboard
- Revisa console.log en browser (F12)

---

## 📚 Recursos útiles

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Docs:** https://docs.github.com
- **Formspree:** https://formspree.io/help
- **Tailwind:** https://tailwindcss.com/docs

---

## 🎉 ¡Listo!

Ya tienes:
- ✅ Código versionado en GitHub
- ✅ Deployment automático en Vercel
- ✅ Dominio personalizado
- ✅ Formulario funcional
- ✅ Monitoreo de performance
- ✅ Zero complicaciones futuras

**Cada vez que hagas cambios, solo haz:**
```bash
git add .
git commit -m "Describe cambios"
git push origin main
```

**¡Vercel automáticamente despliega! 🚀**

---

**Última actualización:** 2026-03-24
**Estado:** Production Ready
