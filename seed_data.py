# seed_data.py
from app import create_app
from app.extensions import db
from app.models.product import Product
from app.models.supplier import Supplier
from app.models.coupon import Coupon

app = create_app()

with app.app_context():
    # 1. Limpiar base de datos
    db.drop_all()
    db.create_all()
    print("  Base de datos reiniciada (Campos en Español)...")

    # 2. Crear Proveedor
    supplier1 = Supplier(name="VapeWorld Distro", email="contact@vapeworld.com", phone="555-0199")
    db.session.add(supplier1)
    db.session.commit()

    # 3. Crear Productos
    products = [
        Product(
            name="Vaporesso Xros 3",
            description="Pod system compacto con sabor intenso.",
            price=35.00,
            stock=50,
            image_url="https://images.unsplash.com/photo-1574910403306-056dbf395775?auto=format&fit=crop&q=80&w=600",
            supplier_id=supplier1.id,
            sabor="Compatible con Sales de Nicotina",
            bateria="1000mAh (USB-C)",
            color="Negro, Plata, Azul Real",
            en_promocion=True
        ),
        Product(
            name="GeekVape Aegis Legend",
            description="Mod resistente al agua y golpes.",
            price=75.50,
            stock=20,
            image_url="https://images.unsplash.com/photo-1543788390-50346c268894?auto=format&fit=crop&q=80&w=600",
            supplier_id=supplier1.id,
            sabor="Tanque Zeus Sub-Ohm",
            bateria="Doble 18650 (No incluidas)",
            color="Camuflaje, Rojo Volcán",
            en_promocion=False
        ),
        Product(
            name="Elf Bar BC5000",
            description="Desechable de 5000 caladas.",
            price=18.00,
            stock=100,
            image_url="https://images.unsplash.com/photo-1616164283878-574d754f9a7d?auto=format&fit=crop&q=80&w=600",
            supplier_id=supplier1.id,
            sabor="Blue Razz Ice (Arándano Helado)",
            bateria="650mAh Recargable",
            color="Degradado Azul-Rosa",
            en_promocion=False
        ),
         Product(
            name="Voopoo Drag S",
            description="Elegante y potente en cuero.",
            price=45.00,
            stock=15,
            image_url="https://images.unsplash.com/photo-1527889392290-7538356942c7?auto=format&fit=crop&q=80&w=600",
            supplier_id=supplier1.id,
            sabor="Coils PnP VM1/VM5",
            bateria="2500mAh Integrada",
            color="Cuero Marrón, Fibra de Carbono",
            en_promocion=False
        )
    ]

    db.session.add_all(products)
    db.session.commit()
    print(" Productos creados.")

    # 4. Crear Cupones (FUERA de la lista de productos)
    coupon1 = Coupon(code="PROMO2024", discount=10, active=True)
    coupon2 = Coupon(code="VIP50", discount=50, active=True)
    
    db.session.add(coupon1)
    db.session.add(coupon2)
    db.session.commit()
    
    print(" ¡Cupones creados: PROMO2024 (10%) y VIP50 (50%)!")