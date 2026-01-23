#!/bin/bash

# Salir si ocurre algún error
set -e

echo "🚀 Iniciando preparación para AWS..."

# 1. Instalar dependencias del Frontend
echo "📦 Instalando dependencias del Frontend..."
cd frontend
npm install

# 2. Construir el Frontend
echo "🏗️  Construyendo el Frontend (Vite)..."
npm run build

# Volver a la raíz
cd ..

echo "✅ Construcción completada."
echo "📂 Los archivos estáticos están en app/static/dist"
echo "🌐 Listo para deploy en AWS."
