# 🚀 QUICK START - 5 minutos para ver tu landing en vivo

## ⚡ Los 5 pasos esenciales

### **Paso 1: Instalar (1 min)**

```bash
cd jun-agency
npm install
```

### **Paso 2: Ejecutar localmente (1 min)**

```bash
npm run dev
```

Abre: **http://localhost:3000**

### **Paso 3: Deployar (2 min)**

**Opción recomendada: Vercel**

```bash
npm i -g vercel
vercel
# Sigue los pasos interactivos
```

Listo. Tu sitio está en línea en ~60 segundos.

### **Paso 4: Configurar formulario (1 min)**

1. Ir a [formspree.io](https://formspree.io)
2. Sign up gratis
3. Create form
4. Copiar el ID (formato: `f_xxxyyy`)
5. Abrir `components/ContactForm.tsx`
6. Línea 28: Cambiar `f_xyzwvu` por tu ID

### **Paso 5: Probar**

1. Visita tu dominio
2. Completa formulario
3. Recibe email en tu bandeja

✅ **¡Listo!**

---

## 📋 Lo que tienes

- ✅ Landing page 100% funcional
- ✅ Formulario que captura leads
- ✅ WhatsApp directo
- ✅ Optimizada para Google
- ✅ Mobile responsive
- ✅ Animaciones fluidas

---

## 🎨 Cambios rápidos si necesitas

### Cambiar texto del hero

Archivo: `components/Hero.tsx`

Busca esta línea:
```tsx
<h1>Haz que tu proyecto sea la primera opción en Riviera Maya.</h1>
```

Y cambias a tu texto.

### Cambiar color blanco a otro

Archivo: `app/globals.css`

Busca:
```css
--color-cream: #f5f1ed;
```

Cambias el código hexadecimal.

### Cambiar teléfono de WhatsApp

Busca `9851089671` en el proyecto y reemplaza por tu número.

---

## 📞 Próximas 24 horas

- [ ] Deploy en Vercel
- [ ] Configurar Formspree
- [ ] Cambiar WhatsApp a tu número
- [ ] Probar formulario

Eso es todo.

---

## 🤔 ¿Preguntas comunes?

**¿Cuánto cuesta?**
- Vercel: $0-20/mes
- Dominio: $10-15/año
- Formspree: $0 (o $50/mes plan pro)

**¿Necesito saber código?**
- Instalación: Copiar comandos
- Deploy: Siguiendo pasos
- Cambios básicos: Editar variables

**¿Puedo usar otro dominio?**
- Claro, compra en GoDaddy/Namecheap
- Apunta nameservers a Vercel
- Vercel lo configura automáticamente

**¿Dónde veo los leads?**
- Email de Formspree
- WhatsApp directo
- Dashboard de Vercel (analytics)

---

## 📚 Documentación

- **Leer primero:** `README.md`
- **Leer segundo:** `DESIGN_AND_SEO_STRATEGY.md`
- **Leer tercero:** `DEPLOYMENT.md`

---

**Hecho. Ya está. Deploy ahora.** 🚀

Cualquier cosa: revisar `README.md` o `DEPLOYMENT.md`
