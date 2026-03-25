#!/bin/bash

# JUN Agency - Build Script
# Prepara el proyecto para producción

set -e

echo "🔨 Building JUN Agency..."
echo ""

# Clean previous build
echo "🧹 Limpiando build anterior..."
rm -rf .next
rm -rf out

# Build
echo "📦 Compilando Next.js..."
npm run build

echo ""
echo "✅ Build completado exitosamente!"
echo ""
echo "📊 Próximas acciones:"
echo "1. Verifica que no hay errores arriba"
echo "2. Ejecuta: npm run start"
echo "3. Prueba en: http://localhost:3000"
echo ""
