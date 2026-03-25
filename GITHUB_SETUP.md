# Setup GitHub y Vercel

## 1. Crear repositorio en GitHub

### Opción A: Si tienes una organización `pootcaamaleduardo21-collab`
```bash
# El repositorio debe existir en: https://github.com/pootcaamaleduardo21-collab/jun-mkt-landing

# Una vez creado en GitHub, ejecutar:
git remote add origin https://github.com/pootcaamaleduardo21-collab/jun-mkt-landing.git
git branch -M main
git push -u origin main
```

### Opción B: Si quieres usar tu cuenta personal
```bash
git remote add origin https://github.com/tu-usuario/jun-mkt-landing.git
git branch -M main
git push -u origin main
```

## 2. Configurar autenticación GitHub

Si pide autenticación:
```bash
# Opción 1: Usar GitHub CLI
gh auth login

# Opción 2: Usar token de acceso personal
# Ver: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
```

## 3. Desplegar en Vercel

### Pasos:
1. Ir a [vercel.com](https://vercel.com)
2. Conectar con GitHub
3. Importar el repositorio `jun-mkt-landing`
4. Configurar variables de entorno:
   - `NEXT_PUBLIC_SITE_URL=https://jun-mkt-landing.vercel.app` (o tu dominio personalizado)
   - `SMTP_HOST=tu-smtp-host.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=tu-email@example.com`
   - `SMTP_PASSWORD=tu-contraseña-o-token`
   - `SMTP_FROM=noreply@junmkt.com`

5. Hacer clic en "Deploy"

### Usar dominio personalizado
1. En Vercel → Settings → Domains
2. Agregar `junmkt.com` o tu dominio
3. Seguir instrucciones de DNS

## Verificar que todo funciona

```bash
# Localmente
npm run dev

# Ir a http://localhost:3000
# Verificar que se vea bien
# Completar formulario de prueba
```

## Próximos pasos

- Configurar el SMTP correctamente para que los emails se envíen
- Agregar dominio personalizado en Vercel
- Conectar formulario con tu CRM (cambiar `/api/contact/route.ts`)
- Agregar analytics (Google Analytics, Vercel Analytics)
- Optimizar imágenes y assets
