# app/__init__.py
from flask import Flask
from app.extensions import db
from app.web_views import web_bp

#  IMPORTAR EL BLUEPRINT DE PRODUCTOS 
from app.controllers.product_controller import product_bp 

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'tu-clave-secreta-super-segura-12345'
    
    db.init_app(app)
    
    # Registramos las vistas web normales
    app.register_blueprint(web_bp)
    
    #  REGISTRAR EL BLUEPRINT DE LA API 
    
    app.register_blueprint(product_bp)
    
    with app.app_context():
        # Importamos los modelos para asegurar que SQLAlchemy los conozca
        from app.models.user import User
        from app.models.product import Product
        from app.models.supplier import Supplier
        
        db.create_all()
        print("✅ Base de datos inicializada correctamente")
    
    return app