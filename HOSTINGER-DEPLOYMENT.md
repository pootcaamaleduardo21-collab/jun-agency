# 🚀 GUÍA DE DEPLOYMENT - JUN LANDING PAGE EN HOSTINGER

## 📋 RESUMEN RÁPIDO

Tu landing page JUN está lista para montarse en cualquier hosting. Aquí te doy los pasos exactos para Hostinger.

---

## ✅ OPCIÓN 1: DEPLOYMENT RECOMENDADO (VERCEL - GRATIS)

### Por qué Vercel es mejor:
- ✅ Hosting especial para Next.js
- ✅ Deploypement automático desde Git
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Más rápido y fácil

### Pasos:

1. **Subir código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: JUN Landing Page"
   git remote add origin https://github.com/TU_USUARIO/jun-agency.git
   git branch -M main
   git push -u origin main
   ```

2. **Conectar a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Sign up con GitHub
   - Click "Import Project"
   - Selecciona tu repositorio `jun-agency`
   - Click "Deploy"
   - **¡Listo! Tu sitio está en vivo en ~60 segundos**

3. **Conectar dominio personalizado**
   - En Vercel Dashboard → Settings → Domains
   - Agregar tu dominio: `jun.com.mx`
   - Vercel te dará los nameservers
   - En Hostinger → Dominios → Cambiar nameservers a los de Vercel
   - Espera 24-48 horas

---

## 🔧 OPCIÓN 2: DEPLOYMENT EN HOSTINGER (MANUAL)

Si prefieres usar Hostinger directamente, sigue estos pasos:

### Requisitos:
- ✅ Plan Hostinger con Node.js habilitado
- ✅ Acceso SSH
- ✅ Manager de aplicaciones o cPanel

### PASO 1: Preparar archivos

Descarga los archivos que te proporcioné:

```
jun-agency-hostinger.tar.gz  (código fuente)
.env.example                  (variables)
```

### PASO 2: Conectar por SSH a Hostinger

```bash
# En tu terminal local
ssh tu_usuario@tu_servidor_hostinger.com

# Entrar en el directorio raíz
cd ~/public_html/

# O si usas subdominio
cd ~/public_html/jun/
```

### PASO 3: Descargar y descomprimir archivos

```bash
# Descargar el archivo (usando tu navegador o SCP)
# Luego en SSH:

tar -xzf jun-agency-hostinger.tar.gz

# Verificar estructura
ls -la
```

Deberías ver:
```
app/
components/
package.json
package-lock.json
next.config.js
tailwind.config.ts
tsconfig.json
postcss.config.js
```

### PASO 4: Instalar dependencias

```bash
# En el servidor Hostinger, vía SSH
node --version      # Verificar que Node.js esté instalado
npm --version       # Verificar npm

# Si no están instalados, instalar desde Hostinger cPanel
# Búsca "Node.js Selector" en cPanel

# Instalar dependencias del proyecto
npm install
```

### PASO 5: Crear archivo .env

```bash
# Copiar el ejemplo
cp .env.example .env

# Editar .env (puedes dejar los valores por defecto)
nano .env
```

Contenido de `.env`:
```
NEXT_PUBLIC_DOMAIN=https://jun.com.mx
NEXT_PUBLIC_WHATSAPP=9851089671
NEXT_PUBLIC_EMAIL=informes@jun.com.mx
```

### PASO 6: Build para producción

```bash
npm run build

# Esto genera la carpeta .next optimizada para producción
```

### PASO 7: Configurar Node.js App en Hostinger

En cPanel → Node.js Selector:

1. **Crear aplicación Node.js**
   - Versión: 18.x o superior
   - Aplicación: jun
   - Dominio: jun.com.mx (o tu dominio)
   - Puerto: 3000
   - Ruta: /home/usuario/public_html/
   - Script: `npm run start`

2. **Click "Create"**

3. **Esperar a que se inicie**

### PASO 8: Configurar nginx/apache reverse proxy

En Hostinger, crear proxy para puerto 3000:

Puedes hacerlo desde cPanel → Reverse Proxy o contactar a soporte.

### PASO 9: Verificar

Visita tu dominio: `https://jun.com.mx`

---

## ⚡ OPCIÓN 3: USAR HOSTINGER STATIC BUILD (RECOMENDADO SI NO TIENES NODE.JS)

Si Hostinger no tiene Node.js habilitado:

### PASO 1: Hacer build estático

En tu máquina local:

```bash
npm run build

# Esto crea la carpeta .next con todo compilado
```

### PASO 2: Usar servidor estático

Puedes usar un servidor Node.js lightweight o hacer export estático.

Alternativa: **Cambiar a Vercel** (opción 1) - es mucho más simple.

---

## 🔗 CONECTAR DOMINIO JUN.COM.MX

### En Hostinger:

1. **Ir a:** Dominios → Administrar
2. **Seleccionar:** jun.com.mx
3. **Nameservers:**
   - Si usas Vercel: Cambiar a nameservers de Vercel
   - Si usas Hostinger: Dejar como está
4. **Esperar:** 24-48 horas para propagación

### SSL (HTTPS):

✅ Automático en Hostinger
✅ Automático en Vercel

---

## 🛠️ SOLUCIONAR PROBLEMAS

### Error: "Cannot find module"
```bash
npm install
npm run build
```

### Error: "Port already in use"
```bash
# Matar proceso en puerto 3000
lsof -i :3000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
```

### Error: "npm: command not found"
- Contactar a Hostinger soporte
- Solicitar habilitar Node.js en la cuenta

### Sitio lento
- Vercel es más rápido (CDN global)
- Considera cambiar a Vercel

---

## 📊 COMPARATIVA: VERCEL vs HOSTINGER

| Feature | Vercel | Hostinger |
|---------|--------|-----------|
| **Precio** | Gratis | Incluido en plan |
| **Facilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Velocidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **SSL** | Automático | Automático |
| **CDN** | Sí | Sí |
| **Deploy automático** | Sí (Git) | No |
| **Soporte Node.js** | Nativo | Limitado |

**Recomendación: Usa VERCEL para máxima facilidad y performance.**

---

## 📧 CONFIGURAR FORMULARIO

El formulario usa **Formspree** por defecto.

### Para recibir emails:

1. **Ir a:** https://formspree.io
2. **Sign up** gratis
3. **Create form**
4. **Copiar ID** (formato: f_xxxyyy)
5. **En código:** `components/ContactForm.tsx` línea ~28
6. **Cambiar:** `f_xyzwvu` por tu ID

---

## 🎯 PASOS FINALES

### ✅ Checklist pre-deployment:

- [ ] Cambiar FormSpree ID (si quieres recibir leads)
- [ ] Verificar links de WhatsApp: `https://wa.me/9851089671`
- [ ] Verificar email: `informes@jun.com.mx`
- [ ] Revisar copy/textos
- [ ] Probar en mobile
- [ ] Probar formulario
- [ ] Probar enlaces

### ✅ Después de deployar:

- [ ] Verificar sitio carga correctamente
- [ ] Google Search Console → Agregar propiedad
- [ ] Google Analytics → Agregar código
- [ ] Prueba de formulario → Verifica que recibes email
- [ ] Prueba de WhatsApp link

---

## 🎉 CONCLUSIÓN

**La opción más fácil y rápida:**

👉 **VERCEL** (5 minutos, gratis, mejor performance)

**Pasos resumidos:**
1. `git init` → `git push` a GitHub
2. Ir a Vercel.com → "Import Project"
3. Seleccionar repo → "Deploy"
4. Cambiar nameservers a Vercel
5. ¡LISTO!

---

## 📞 SOPORTE

Si necesitas ayuda:

- **Vercel:** https://vercel.com/support
- **Hostinger:** Chat en cPanel
- **GitHub:** https://github.com/docs
- **Node.js:** https://nodejs.org/

---

**Versión:** 1.0
**Última actualización:** 2024-03-24
**Estado:** Production Ready
