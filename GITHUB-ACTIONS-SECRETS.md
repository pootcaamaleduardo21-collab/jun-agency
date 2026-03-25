# 🔐 Configurar GitHub Actions para CI/CD Automático

Esta guía te muestra cómo configurar **GitHub Actions** para que automáticamente compile y despliegue tu landing page en Vercel cada vez que hagas push a GitHub.

---

## 🎯 ¿Qué es GitHub Actions?

GitHub Actions automatiza tareas:
- ✅ Compila tu código con cada push
- ✅ Ejecuta tests
- ✅ Despliega automáticamente a Vercel
- ✅ Todo gratis

**Flujo automático:**
```
git push → GitHub Actions compila → Vercel despliega → ¡Sitio actualizado!
```

---

## 📋 PASO 1: Obtener VERCEL_TOKEN

Este token autoriza a GitHub para desplegar en Vercel en tu nombre.

### 1.1 Ve a Vercel Settings
- Ve a: https://vercel.com/account/tokens
- O: Vercel Dashboard → Settings (esquina arriba-derecha) → Tokens

### 1.2 Create a new token
```
Name: "GitHub Actions"
Scope: "Full Account"
Expiration: 90 days (renovable)
```

### 1.3 Copiar el token
- ⚠️ Solo aparece una vez, cópialo inmediatamente
- Debería verse así: `abc123xyz789...`

---

## 📋 PASO 2: Obtener VERCEL_ORG_ID

Este es el ID de tu organización en Vercel.

### 2.1 Ve a Vercel Settings
- https://vercel.com/account/general

### 2.2 Buscar "Team ID" o "Organization ID"
- Debería estar visible en la sección General
- Debería verse así: `team_abc123xyz`

---

## 📋 PASO 3: Obtener VERCEL_PROJECT_ID

Este es el ID específico del proyecto "jun-agency".

### 3.1 Ve al proyecto en Vercel
- https://vercel.com/dashboard → Selecciona tu proyecto

### 3.2 Settings → General
- Busca "Project ID"
- Debería verse así: `prj_abc123xyz`

---

## 🔑 PASO 4: Agregar Secrets a GitHub

### 4.1 Ve a tu repositorio en GitHub
- https://github.com/TU_USUARIO/jun-agency

### 4.2 Ir a Settings → Secrets and variables → Actions
```
Tu Repo → Settings →
  ↓
Secrets and variables →
  ↓
Actions →
  ↓
"New repository secret"
```

### 4.3 Agregar tres secretos

**Primero: VERCEL_TOKEN**
```
Name: VERCEL_TOKEN
Value: (pega el token que copiaste en PASO 1)
Click "Add secret"
```

**Segundo: VERCEL_ORG_ID**
```
Name: VERCEL_ORG_ID
Value: (pega el ID que copiaste en PASO 2)
Click "Add secret"
```

**Tercero: VERCEL_PROJECT_ID**
```
Name: VERCEL_PROJECT_ID
Value: (pega el ID que copiaste en PASO 3)
Click "Add secret"
```

---

## ✅ PASO 5: Verificar que funciona

### 5.1 Haz un pequeño cambio en tu código
```bash
# Cambiar algo pequeño, ej: un typo
git add .
git commit -m "Test GitHub Actions"
git push origin main
```

### 5.2 Ve a GitHub Actions
- Tu Repo → Actions
- Deberías ver un workflow ejecutándose

### 5.3 Esperar a que termine
- Debería tardar ~2-3 minutos
- Si es verde ✅ = Éxito
- Si es rojo ❌ = Error (leer logs)

### 5.4 Verificar en Vercel
- Ve a https://vercel.com/dashboard
- Deberías ver un nuevo deployment
- Click para ver detalles

---

## 🐛 Troubleshooting

### Error: "Invalid token"
**Causa:** Token incorrecto o expirado
**Solución:**
1. Ir a https://vercel.com/account/tokens
2. Crear nuevo token
3. Actualizar en GitHub Secrets

### Error: "Project not found"
**Causa:** VERCEL_PROJECT_ID incorrecto
**Solución:**
1. Ve a tu proyecto en Vercel
2. Settings → General
3. Copia exactamente el Project ID
4. Actualiza en GitHub Secrets

### Error: "Unauthorized"
**Causa:** VERCEL_ORG_ID incorrecto o token sin permiso
**Solución:**
1. Verificar que el token tiene scope "Full Account"
2. Verificar que VERCEL_ORG_ID es correcto
3. Regenerar token si es necesario

### Build falla pero deploy no se intenta
**Causa:** `npm run build` falla
**Solución:**
1. Ir a Workflow → Ver logs
2. Buscar error en "Build Next.js" step
3. Arreglar localmente: `npm run build`
4. Push: `git add . && git commit -m "Fix build" && git push`

---

## 📊 Ver logs de GitHub Actions

### 1. Ir a Actions
- Tu Repo → Actions tab

### 2. Seleccionar workflow
- Click en el commit que quieres revisar

### 3. Click en "build" job
- Ver pasos paso a paso

### 4. Click en cada "step" para ver detalles
- "Build Next.js" - compilación
- "Deploy to Vercel" - deployment
- "Run linting" - validación

---

## 🎯 Próximas mejoras (Opcional)

### Agregar tests automáticos
```bash
npm install --save-dev jest @testing-library/react
```

**Crear `.github/workflows/test.yml`:**
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: npm
      - run: npm ci
      - run: npm test
```

### Agregar Lighthouse (performance)
```yaml
- name: Lighthouse Check
  uses: treosh/lighthouse-ci-action@v9
```

### Agregar Análisis de dependencias
GitHub lo hace automáticamente:
- Tu Repo → Security → Dependabot alerts

---

## 🔔 Notificaciones

GitHub puede notificarte cuando:
- ✅ Build exitoso
- ❌ Build falla
- 📝 Actions del repositorio

**Configurar notificaciones:**
- Tu Repo → Settings → Notifications
- O: https://github.com/settings/notifications

---

## 🔒 Seguridad

### Buenas prácticas
✅ **Hacer:**
- Regenerar tokens regularmente
- Usar tokens con scope mínimo necesario
- Mantener secretos en GitHub (no en código)
- Rotar secretos cada 3 meses

❌ **NO hacer:**
- Compartir tokens
- Guardar tokens en código
- Hacer public el repositorio si contiene secretos
- Usar mismos tokens para múltiples servicios

---

## 📚 Relacionado

- [GITHUB-SETUP.md](./GITHUB-SETUP.md) - Setup GitHub general
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)

---

## ✅ Checklist

- [ ] Creé token en Vercel
- [ ] Copié VERCEL_TOKEN
- [ ] Copié VERCEL_ORG_ID
- [ ] Copié VERCEL_PROJECT_ID
- [ ] Agregué 3 secrets a GitHub
- [ ] Hice test push
- [ ] GitHub Actions se ejecutó correctamente
- [ ] Deploy en Vercel fue exitoso

---

**Última actualización:** 2026-03-24
**Estado:** Production Ready
