# seed_data.py
from app import create_app
from app.extensions import db
from app.models.product import Product
from app.models.supplier import Supplier

app = create_app()

with app.app_context():
    # 1. Limpiar datos viejos 
    db.drop_all()
    db.create_all()

    print("Creando datos de prueba...")

    # 2. Crear Proveedor
    supplier1 = Supplier(name="VapeWorld Distro", email="contact@vapeworld.com", phone="555-0199")
    db.session.add(supplier1)
    db.session.commit()

    # 3. Crear Productos (Vapers) con imágenes
    products = [
        Product(
            name="Vaporesso Xros 3",
            description="Pod system compacto con batería de larga duración y sabor intenso.",
            price=35.00,
            stock=50,
            image_url="https://via.placeholder.com/300x300.png?text=Vaporesso+Xros+3",
            supplier_id=supplier1.id
        ),
        Product(
            name="GeekVape Aegis Legend",
            description="Mod resistente al agua y golpes, doble batería 18650.",
            price=75.50,
            stock=20,
            image_url="https://via.placeholder.com/300x300.png?text=GeekVape+Aegis",
            supplier_id=supplier1.id
        ),
        Product(
            name="Elf Bar BC5000",
            description="Desechable de 5000 caladas, sabor Blue Razz Ice.",
            price=18.00,
            stock=100,
            image_url="https://via.placeholder.com/300x300.png?text=Elf+Bar+5000",
            supplier_id=supplier1.id
        ),
         Product(
            name="Voopoo Drag S",
            description="Elegante y potente, ideal para iniciados y expertos.",
            price=45.00,
            stock=15,
            image_url="https://via.placeholder.com/300x300.png?text=Voopoo+Drag",
            supplier_id=supplier1.id
        )
    ]

    db.session.add_all(products)
    db.session.commit()

    print("¡Datos creados! 4 Vapers y 1 Proveedor añadidos.")