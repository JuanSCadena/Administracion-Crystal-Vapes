# config.py
import os

class Config:
    # 1. SEGURIDAD:
    # Intenta leer la clave de las variables de entorno (Nube).
    # Si no la encuentra (tu PC), usa la clave '12345'.
    SECRET_KEY = os.environ.get('SECRET_KEY') or '12345'
    
    # 2. BASE DE DATOS HÍBRIDA (La magia):
    # Render nos da la dirección de la base de datos en una variable llamada 'DATABASE_URL'.
    uri = os.environ.get('DATABASE_URL')
    
    if uri:
        # --- ESTAMOS EN LA NUBE (RENDER) ---
        # Pequeño arreglo técnico: Render a veces da la URL empezando con "postgres://"
        # pero la librería SQLAlchemy exige que empiece con "postgresql://"
        if uri.startswith("postgres://"):
            uri = uri.replace("postgres://", "postgresql://", 1)
        
        SQLALCHEMY_DATABASE_URI = uri
    else:
        # --- ESTAMOS EN TU PC (LOCAL) ---
        # Como no existe la variable DATABASE_URL, usamos tu SQLite de siempre.
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'database.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
