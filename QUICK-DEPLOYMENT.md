# ⚡ GUÍA RÁPIDA: GitHub + Vercel (5 MINUTOS)

Copy-paste commands. No te pierdas en detalles.

---

## 🚀 QUICK START (Copia y pega)

### 1️⃣ Configurar Git local
```bash
cd ~/tu-ruta/jun-agency

git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@gmail.com"

git init
git add .
git commit -m "Initial commit: JUN Landing Page"
```

### 2️⃣ Crear repositorio en GitHub
1. Ve a: https://github.com/new
2. Nombre: `jun-agency`
3. Click "Create repository"
4. Copia exactamente esto que GitHub te muestra:

```bash
git remote add origin https://github.com/TU_USUARIO/jun-agency.git
git branch -M main
git push -u origin main
```

### 3️⃣ Conectar Vercel
1. Ve a: https://vercel.com/new
2. Click "Import Project"
3. Conecta GitHub
4. Selecciona `jun-agency`
5. Click "Deploy"

**Espera ~2 minutos. ¡YA ESTÁ LISTO!** 🎉

Tu sitio está en: `https://jun-agency.vercel.app`

### 4️⃣ (Opcional) Conectar dominio
1. En Vercel: Settings → Domains → Add
2. Ingresa: `jun.com.mx`
3. Copiar nameservers
4. En Hostinger: Cambiar nameservers
5. Esperar 24h

---

## 📝 Variables de entorno

### Local
```bash
# Copiar template
cp .env.example .env.local

# Editar
nano .env.local
```

Dentro (.env.local):
```
NEXT_PUBLIC_DOMAIN=https://jun.com.mx
NEXT_PUBLIC_WHATSAPP=529851089671
NEXT_PUBLIC_EMAIL=informes@jun.com.mx
```

### En Vercel
1. Tu proyecto → Settings → Environment Variables
2. Agregar 3 variables (mismos valores)
3. No incluyas secretos aquí (es público)

---

## 🤖 Configurar GitHub Actions (CI/CD Automático)

### 1. Obtener 3 valores de Vercel

```bash
# VERCEL_TOKEN
# Ve a: https://vercel.com/account/tokens
# "Create token" → Copiar

# VERCEL_ORG_ID
# Ve a: https://vercel.com/account/general
# Busca "Team ID" → Copiar

# VERCEL_PROJECT_ID
# Tu proyecto → Settings → General
# Busca "Project ID" → Copiar
```

### 2. Agregar secretos a GitHub
```
Tu Repo → Settings → Secrets and variables → Actions
```

Agregar 3 secretos:
```
VERCEL_TOKEN = (valor de arriba)
VERCEL_ORG_ID = (valor de arriba)
VERCEL_PROJECT_ID = (valor de arriba)
```

### 3. Probar
```bash
git commit --allow-empty -m "Test Actions"
git push origin main
```

Ve a: `Tu Repo → Actions` y verifica que se ejecute.

---

## 🔄 Flujo de trabajo diario

```bash
# 1. Hacer cambios a tus archivos...
# 2. Cuando termines:

git add .
git commit -m "Descripción breve de cambios"
git push origin main

# ✅ GitHub Actions compila automáticamente
# ✅ Vercel despliega automáticamente
# ✅ Tu sitio se actualiza en ~1 minuto
```

---

## 📋 Checklist

- [ ] Git configurado: `git config --global user.name "Tu Nombre"`
- [ ] Repositorio creado en GitHub
- [ ] Código pusheado: `git push origin main`
- [ ] Vercel conectado
- [ ] `.env.local` creado localmente
- [ ] Variables en Vercel configuradas
- [ ] GitHub Secrets agregados (3 valores)
- [ ] Test push realizado
- [ ] GitHub Actions se ejecutó ✅
- [ ] Dominio conectado (si tienes)
- [ ] Sitio funcional en Vercel

---

## 🐛 Quick Fixes

| Problema | Solución |
|----------|----------|
| "fatal: not a git repository" | `cd ~/tu-ruta/jun-agency && git init` |
| Build falla en Vercel | Ver logs: Tu Proyecto → Deployments → Click fallido |
| Variables no funcionan | Reiniciar el servidor de Vercel: Redeploy |
| GitHub Actions error | Click en Actions → Ver logs de ejecución |
| Port 3000 en uso | `lsof -i :3000 \| awk '{print $2}' \| xargs kill -9` |

---

## 🎯 Próximas acciones

1. **Después de 1 semana:** Agregar Google Analytics
2. **Después de 2 semanas:** Verificar formulario recibe emails
3. **Después de 1 mes:** Revisar Vercel Analytics
4. **Cada 3 meses:** Actualizar dependencias

---

## 📞 Help

- **Vercel:** https://vercel.com/support
- **GitHub:** https://docs.github.com
- **Next.js:** https://nextjs.org/docs
- **Tu código:** Todo está comentado 💡

---

**¡Ahora tienes:**
- ✅ Código versionado en GitHub
- ✅ Deployment automático en Vercel
- ✅ CI/CD con GitHub Actions
- ✅ Zero complicaciones futuras

**Tiempo total: 5 minutos**
