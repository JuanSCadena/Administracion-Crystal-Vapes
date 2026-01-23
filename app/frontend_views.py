from flask import Blueprint, send_from_directory, current_app
import os

frontend_bp = Blueprint('frontend', __name__)

@frontend_bp.route('/', defaults={'path': ''})
@frontend_bp.route('/<path:path>')
def serve(path):
    # Directorio donde Vite construye los archivos (configurado en vite.config.js como ../app/static/dist)
    dist_dir = os.path.join(current_app.root_path, 'static', 'dist')
    
    if path != "" and os.path.exists(os.path.join(dist_dir, path)):
        return send_from_directory(dist_dir, path)
    else:
        # Para SPA: Si no encuentra el archivo, devuelve index.html
        return send_from_directory(dist_dir, 'index.html')
