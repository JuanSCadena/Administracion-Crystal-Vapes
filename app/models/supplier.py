# app/models/supplier.py
from app.extensions import db

class Supplier(db.Model):
    __tablename__ = 'suppliers'  # Nombre explícito de la tabla en la BD

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    contact_person = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    
    # Esta relación permite acceder a los productos desde el proveedor (supplier.products)
    products = db.relationship('Product', backref='supplier_rel', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "contact_person": self.contact_person,
            "phone": self.phone,
            "email": self.email
        }