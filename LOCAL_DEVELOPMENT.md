# Desarrollo Local - JUN Landing Page

## 🚀 Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 Checklist de Desarrollo

### ✅ Completado
- [x] Estructura de Next.js 15 con TypeScript
- [x] Tailwind CSS configurado
- [x] Componentes modulares creados
- [x] Hero con fondo dinámico responsivo (Canvas)
- [x] Todas las secciones diseñadas
- [x] Formulario de contacto funcional
- [x] API de email con Nodemailer
- [x] SEO optimizado (metadatos, estructura HTML)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Animaciones sutiles
- [x] Build exitoso sin errores
- [x] Documentación completa

### ⚠️ A Configurar Antes de Producción
- [ ] Configurar credenciales SMTP
- [ ] Cambiar email de contacto en `app/api/contact/route.ts`
- [ ] Crear repositorio en GitHub
- [ ] Conectar a Vercel
- [ ] Configurar dominio personalizado
- [ ] Agregar Google Analytics
- [ ] Testing de formulario completo
- [ ] Pruebas de rendimiento (Lighthouse)

## 🧪 Testing Local

### 1. Verificar que la página se ve bien
```bash
npm run dev
# Abre http://localhost:3000
# Verifica cada sección scrolleando
```

### 2. Probar formulario (sin email real)
```bash
# Llenar todos los campos
# Click en "Solicitar diagnóstico"
# Debería mostrar: "¡Gracias por tu interés!"
# (El email no se enviará sin SMTP configurado)
```

### 3. Probar responsividad
- Abre DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Prueba en:
  - iPhone 12/13 (390x844)
  - iPad (768x1024)
  - Desktop (1280x800)

### 4. Verificar hero dinámico
- El fondo debe cambiar color al mover el mouse
- Debe ser fluido, sin lag
- Debe ser responsive (no romperse en móvil)

### 5. Probar animaciones
- Scroll lentamente
- Los elementos deben aparecer con fade-in-up
- Las transiciones deben ser suaves

## 📁 Estructura de Archivos Importante

```
jun-mkt-landing/
├── app/
│   ├── api/contact/route.ts          ← CAMBIAR: email destino
│   ├── layout.tsx                     ← CAMBIAR: metadatos
│   ├── page.tsx                       ← Estructura principal
│   └── globals.css                    ← Estilos globales
├── components/                         ← Componentes reutilizables
│   ├── Hero.tsx                       ← MODIFICAR: fondo canvas
│   ├── ContactForm.tsx                ← MODIFICAR: campos adicionales
│   └── ...
├── public/                             ← Assets (favicon, og-image, etc.)
├── .env.example                        ← Copiar a .env.local
└── tailwind.config.ts                  ← Personalizaciones de color
```

## 🎨 Personalizar JUN

### Cambiar Colores
Editar `tailwind.config.ts`:
```ts
colors: {
  'jun-black': '#0a0a0a',     // Negro primario
  'jun-dark': '#1a1a1a',      // Negro más oscuro
  'jun-sand': '#d4c4b0',      // Arena/dorado
  'jun-light': '#faf8f5',     // Fondo cálido
  'jun-warm': '#f5f0e8',      // Secciones alternas
  'jun-accent': '#9b8b7e',    // Acentos
}
```

### Cambiar Email de Contacto
En `app/api/contact/route.ts` línea 24:
```ts
to: 'informes@junmkt.com',    // ← Cambiar aquí
```

### Cambiar WhatsApp
En `components/Hero.tsx` y `components/ClosingSection.tsx`:
```html
href="https://wa.me/9851089671?text=..."  <!-- Cambiar número -->
```

### Cambiar Copys
Cada componente tiene el texto directamente en el archivo TSX.
Buscar y reemplazar es seguro.

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Error: "Port 3000 already in use"
```bash
# Usar puerto diferente
npm run dev -- -p 3001
```

### Canvas no aparece en el hero
- Verificar que JavaScript esté habilitado
- Abrir DevTools → Console para ver errores
- Verificar navegador es moderno (Chrome, Firefox, Safari reciente)

### Formulario no envía email
- Sin SMTP configurado, los emails no se enviarán
- Cambiar SMTP_HOST en `.env.local` a un servidor real
- Probar con Gmail App Password
- Ver logs en DevTools → Network tab

## 📦 Build y Deployment

### Build local
```bash
npm run build
npm start
# Abre http://localhost:3000
```

### Deploy a Vercel
```bash
# Opción 1: Via CLI
npm i -g vercel
vercel

# Opción 2: Via GitHub
# Push a GitHub
# Conectar repo a Vercel
# Deploy automático
```

## 📊 Auditoría de Performance

```bash
npm run build
npm start
# Abre Chrome DevTools → Lighthouse
# Click "Generate report"
# Target: > 90 score
```

## 🎯 Próximos Pasos

1. **Configurar SMTP**
   - Gmail: Generar App Password
   - SendGrid: Crear API key
   - Mailgun: Obtener credenciales SMTP

2. **Conectar a CRM**
   - HubSpot: Integrar form
   - Pipedrive: Webhook en `/api/contact`
   - Zapier: Automatizar workflows

3. **Analytics**
   - Google Analytics 4
   - Vercel Analytics
   - Heatmaps (Hotjar)

4. **Testing**
   - User testing con clientes potenciales
   - A/B testing de headlines
   - Análisis de drop-off en formulario

## 📞 Soporte

Si algo no funciona:
1. Verificar logs en terminal
2. Abrir DevTools (F12) → Console
3. Revisar este documento
4. Contactar al equipo de desarrollo

---

**Happy coding! 🎉**
