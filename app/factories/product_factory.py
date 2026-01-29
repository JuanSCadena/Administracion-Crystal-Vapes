from app.models.product import Product

class ProductFactory:
    """Implementación del Patrón Factory para crear Productos.
    Esto permite encapsular la lógica de creación y facilita el cumplimiento de OCP
    (si añadimos nuevos tipos de productos, extendemos la fábrica).
    """
    @staticmethod
    def create(name, description, price, stock, image_url=None, supplier_id=None, sabor=None, bateria=None, color=None, en_promocion=False):
        return Product(
            name=name,
            description=description,
            price=price,
            stock=stock,
            image_url=image_url,
            supplier_id=supplier_id,
            sabor=sabor,
            bateria=bateria,
            color=color,
            en_promocion=en_promocion
        )
