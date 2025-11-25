# app/models/product.py
from app.extensions import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, default=0)
    
    # IMPORTANTE: Campo para React
    image_url = db.Column(db.String(500), nullable=True) 

    # Fíjate que aquí usamos 'suppliers.id' que coincide con el __tablename__ de supplier.py
    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'stock': self.stock,
            'image_url': self.image_url,
            'supplier_id': self.supplier_id
        }