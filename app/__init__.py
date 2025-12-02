# app/__init__.py
from flask import Flask
from app.extensions import db
from app.web_views import web_bp
from config import Config
# 1. IMPORTAR LOS BLUEPRINTS (CONTROLADORES)
from app.controllers.product_controller import product_bp 
from app.controllers.coupon_controller import coupon_bp # <--- Nuevo

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'tu-clave-secreta-super-segura-12345'
    
    db.init_app(app)
    
    # 2. REGISTRAR LOS BLUEPRINTS (RUTAS)
    app.register_blueprint(web_bp)      # Vistas Web (Admin)
    app.register_blueprint(product_bp)  # API Productos
    app.register_blueprint(coupon_bp)   # API Cupones <--- Nuevo
    
    with app.app_context():
        # 3. IMPORTAR MODELOS (TABLAS)
        from app.models.user import User
        from app.models.product import Product
        from app.models.supplier import Supplier
        from app.models.coupon import Coupon # <--- Nuevo
        
        db.create_all()
        print("✅ Base de datos inicializada correctamente")
    
    return app
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)