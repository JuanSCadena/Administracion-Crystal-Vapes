#!/bin/bash

# Función para matar procesos hijos al salir
cleanup() {
    echo "Deteniendo servidores..."
    # Matamos todo el grupo de procesos
    kill 0
}
trap cleanup EXIT SIGINT

# Activar entorno virtual
source venv/bin/activate

# Iniciar Backend (Flask) en puerto 5001 para evitar conflictos (AirPlay usa 5000)
echo "---------------------------------------"
echo "Iniciando Backend (Flask)..."
echo "URL: http://127.0.0.1:5001"
echo "---------------------------------------"
export FLASK_APP=wsgi.py
export FLASK_DEBUG=1
flask run --port=5001 &

# Esperar un momento
sleep 2

# Iniciar Frontend (Vite)
echo "---------------------------------------"
echo "Iniciando Frontend (Vite)..."
echo "---------------------------------------"
cd frontend  # Ahora 'frontend' es el proyecto Vue
npm run dev
