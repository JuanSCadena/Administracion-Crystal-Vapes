# app/__init__.py
from flask import Flask
from app.extensions import db
from app.web_views import web_bp
from app.controllers.product_controller import product_bp 
from app.controllers.coupon_controller import coupon_bp
from config import Config # Asegúrate de importar Config si ya creaste ese archivo

def create_app():
    app = Flask(__name__)
    
    # Cargar configuración (Si usas el archivo config.py)
    app.config.from_object(Config)
    
    # Inicializar la base de datos
    db.init_app(app)
    
    # Registrar Blueprints
    app.register_blueprint(web_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(coupon_bp)
    
    with app.app_context():
        # Importar modelos
        from app.models.user import User
        from app.models.product import Product
        from app.models.supplier import Supplier
        from app.models.coupon import Coupon
        
        db.create_all()
        print("✅ Base de datos inicializada correctamente")
    
    # --- ¡ESTA ES LA LÍNEA QUE TE FALTA! ---
    return app