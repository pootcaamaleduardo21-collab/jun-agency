#!/bin/bash

# JUN Agency - Setup Script
# Este script configura todo lo necesario para empezar a desarrollar

set -e # Exit on error

echo "🚀 JUN Agency Setup Script"
echo "=========================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Instalando dependencias..."
npm install
echo "✅ Dependencias instaladas"
echo ""

# Check .env file
if [ ! -f .env.local ]; then
    echo "📝 Creando archivo .env.local desde .env.example..."
    cp .env.example .env.local
    echo "⚠️  Importante: Abre .env.local y actualiza los valores"
fi

echo ""
echo "🎯 Setup completado!"
echo ""
echo "Próximos pasos:"
echo "1. Edita .env.local con tus valores"
echo "2. Ejecuta: npm run dev"
echo "3. Abre: http://localhost:3000"
echo ""
echo "Para más información, ve a: README.md"
