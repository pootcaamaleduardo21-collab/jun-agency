# 🖥️ PASOS EN VISUAL STUDIO CODE

Copia y pega estos comandos exactos en la terminal de VS Code.

---

## 📖 ABRIR VISUAL STUDIO CODE

1. Abre Visual Studio Code
2. Ve a: **File** → **Open Folder**
3. Selecciona: `/Users/tu-usuario/jun-agency`
4. Click **Open**

O desde terminal:
```bash
code ~/jun-agency
```

---

## 🔧 ABRIR LA TERMINAL EN VS CODE

Atajo de teclado:
- **Mac:** `Control + ~` (tildan/backtick)
- O: **View** → **Terminal** → **New Terminal**

---

## 📋 PASOS PARA EJECUTAR

### PASO 1: Verificar que todo funciona

```bash
npm run build
```

**Espera a que termine sin errores** (debería decir "✓ Generating static pages")

---

### PASO 2: Configurar Git globalmente (SOLO LA PRIMERA VEZ)

Copia y pega en la terminal:

```bash
git config --global user.name "Tu Nombre Completo"
```

Luego:

```bash
git config --global user.email "tu.email@gmail.com"
```

Verifica:
```bash
git config --global --list
```

**Debería mostrar tu nombre y email**

---

### PASO 3: Inicializar Git en tu proyecto

Copia y pega:

```bash
git init
```

Luego:

```bash
git add .
```

Luego:

```bash
git commit -m "Initial commit: JUN Landing Page Production Ready"
```

**Espera a que termine** (debería mostrar archivos creados)

---

### PASO 4: Crear repositorio en GitHub

#### 4.1 Abre GitHub en tu navegador:
https://github.com/new

#### 4.2 Rellena el formulario:
- **Repository name:** `jun-agency`
- **Description:** `Premium marketing landing page - JUN Agency`
- **Visibility:** `Public` (si quieres que se vea)
- **Initialize this repository:** DEJAR VACÍO (sin checkear)
- Click **Create repository**

#### 4.3 GitHub te mostrará comandos

Verás algo como:
```
…or push an existing repository from the command line
```

Con estos comandos (pero con TU usuario):
```bash
git remote add origin https://github.com/TU_USUARIO/jun-agency.git
git branch -M main
git push -u origin main
```

---

### PASO 5: Conectar tu repo local a GitHub

En la terminal de VS Code, copia y pega **EXACTAMENTE** lo que GitHub te mostró:

**Reemplaza `TU_USUARIO` con tu usuario de GitHub:**

```bash
git remote add origin https://github.com/TU_USUARIO/jun-agency.git
```

Luego:

```bash
git branch -M main
```

Luego:

```bash
git push -u origin main
```

**Espera a que suba todo** (tarda ~30 segundos)

---

### PASO 6: Verificar en GitHub

1. Ve a: https://github.com/TU_USUARIO/jun-agency
2. Deberías ver todos tus archivos allí ✅

---

## 🚀 PASO 7: Conectar a Vercel

### 7.1 Abre Vercel en navegador:
https://vercel.com/new

### 7.2 Sigue estos pasos:
1. Click **"Import Project"**
2. Click **"Continue with GitHub"**
3. Autoriza Vercel
4. **Find Repository:** Busca `jun-agency`
5. Click **Import**

### 7.3 Configurar proyecto:
- **Project name:** `jun-agency` (debe estar pre-relleno)
- **Framework:** `Next.js` (auto-detectado)
- Click **Deploy**

**Espera ~2-3 minutos**

---

### 7.4 Agregar variables de entorno (IMPORTANTE)

Cuando Vercel termine el deploy:

1. Click en **Settings** (arriba)
2. Ir a **Environment Variables**
3. Agregar 3 variables (copy-paste los valores):

**Variable 1:**
```
NEXT_PUBLIC_DOMAIN = https://jun.com.mx
```

**Variable 2:**
```
NEXT_PUBLIC_WHATSAPP = 529851089671
```

**Variable 3:**
```
NEXT_PUBLIC_EMAIL = informes@jun.com.mx
```

4. Click **Save**

### 7.5 Hacer redeploy para que funcionen las variables

En Vercel Dashboard:
1. Click en **Deployments**
2. Click en el deployment fallido (si hay)
3. O click **Redeploy** en el último deployment

---

## ✅ VERIFICAR QUE FUNCIONA

Una vez Vercel termine:

1. Ve a: https://jun-agency.vercel.app
2. Deberías ver tu landing page ✅

---

## 🔄 WORKFLOW FUTURO (Cómo actualizar)

Cada vez que hagas cambios:

```bash
git add .
```

Luego:

```bash
git commit -m "Describe los cambios que hiciste"
```

Luego:

```bash
git push origin main
```

**Automáticamente:**
- GitHub recibe el cambio
- Vercel compila automáticamente
- Tu sitio se actualiza en ~1-2 minutos

---

## 🎯 RESUMEN DE COMANDOS (Copy-Paste en orden)

### Primera vez (Setup inicial):

```bash
# 1. Configurar Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# 2. Inicializar repositorio
git init
git add .
git commit -m "Initial commit: JUN Landing Page Production Ready"

# 3. Conectar a GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/jun-agency.git
git branch -M main
git push -u origin main
```

### Después (Actualizaciones):

```bash
git add .
git commit -m "Tu mensaje aquí"
git push origin main
```

---

## 📱 Atajos útiles en VS Code

| Acción | Atajo |
|--------|-------|
| Abrir terminal | `Control + ~` (Mac) o `Ctrl + ~` (Windows) |
| Nueva terminal | `Ctrl + Shift + ~` |
| Copiar línea | `Ctrl + C` (después de seleccionar) |
| Pegar | `Ctrl + V` |
| Clear terminal | `clear` (en terminal) |

---

## ❓ Errores comunes y soluciones

### Error: "fatal: not a git repository"
```bash
# Solución: Primero inicializa Git
git init
```

### Error: "Permission denied (publickey)"
**Solución:** Necesitas agregar tu SSH key a GitHub:
1. Ve a: https://github.com/settings/keys
2. Click "New SSH key"
3. Sigue instrucciones de GitHub

### Error: "Port 3000 in use"
```bash
# Solución: Mata el proceso
lsof -i :3000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
```

### Build falla
```bash
# Solución: Limpia y recompila
rm -rf .next
npm run build
```

---

## ✨ BONUS: Comandos útiles para desarrollo

```bash
# Iniciar servidor local
npm run dev

# Ir a http://localhost:3000

# Detener servidor
Control + C (en terminal)

# Ver estado de Git
git status

# Ver historial de commits
git log --oneline

# Ver cambios pendientes
git diff

# Deshacer último commit (local)
git reset HEAD~1
```

---

## 🎉 RESULTADO FINAL

Después de seguir estos pasos:

✅ Código en GitHub
✅ Sitio en vivo en Vercel
✅ Deploy automático configurado
✅ CERO complicaciones

**URL de tu sitio:** https://jun-agency.vercel.app

---

## 📝 Notas importantes

1. **Reemplaza valores:**
   - `TU_USUARIO` = Tu usuario de GitHub
   - `Tu Nombre` = Tu nombre completo
   - `tu@email.com` = Tu email

2. **Los comandos son exactos:**
   - Copy-paste tal cual
   - No cambies nada
   - Respeta espacios y caracteres

3. **Espera a que terminen:**
   - No presiones más comandos hasta que uno termine
   - Verifica que no hay errores

4. **GitHub vs Vercel:**
   - GitHub = Dónde vive tu código
   - Vercel = Dónde se ve tu sitio

---

**Última actualización:** 2026-03-24
**Para:** Visual Studio Code
**Nivel:** Paso a paso, sin errores
