# app/controllers/product_controller.py
from flask import Blueprint, jsonify
from app.models.product import Product
from app.models.supplier import Supplier
from app.models import db

# Definimos el Blueprint para las rutas de la API
product_bp = Blueprint('product_bp', __name__)

class ProductController:

    
    @staticmethod
    def get_product_by_id(product_id):
        try:
            product = Product.query.get(product_id)
            if not product:
                return {'success': False, 'message': 'Producto no encontrado'}
            # Devolvemos el objeto completo para que la vista web pueda usar product.name, product.id, etc.
            return {'success': True, 'product': product}
        except Exception as e:
            return {'success': False, 'message': str(e)}

    # --- MÉTODO PARA LA API (React) ---
    @staticmethod
    def get_all_products():
        try:
            products = Product.query.all()
            # Convertimos a diccionario para JSON
            return {'success': True, 'products': [p.to_dict() for p in products]}
        except Exception as e:
            print(f"Error en get_all_products: {e}")
            return {'success': False, 'message': 'Error al obtener productos'}

    # --- MÉTODOS DE GESTIÓN (Crear, Editar, Borrar) ---
    @staticmethod
    def create_product(name, description, price, stock, image_url=None, supplier_id=None):
        try:
            if Product.query.filter_by(name=name).first():
                return {'success': False, 'message': 'Ya existe un producto con ese nombre'}

            # Validar proveedor si se envía
            if supplier_id:
                supplier = Supplier.query.get(supplier_id)
                if not supplier:
                    return {'success': False, 'message': 'Proveedor no encontrado'}

            new_product = Product(
                name=name,
                description=description,
                price=price,
                stock=stock,
                image_url=image_url, # <--- IMPORTANTE: Guardamos la URL
                supplier_id=supplier_id
            )
            
            db.session.add(new_product)
            db.session.commit()
            
            return {'success': True, 'message': 'Producto creado exitosamente', 'product': new_product}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': f'Error al crear producto: {str(e)}'}

    @staticmethod
    def update_product(product_id, name=None, description=None, price=None, stock=None, image_url=None, supplier_id=None):
        try:
            product = Product.query.get(product_id)
            if not product:
                return {'success': False, 'message': 'Producto no encontrado'}

            if name: product.name = name
            if description is not None: product.description = description
            if price is not None: product.price = price
            if stock is not None: product.stock = stock
            if image_url is not None: product.image_url = image_url # <--- IMPORTANTE: Actualizamos la URL
            
            if supplier_id is not None:
                if supplier_id == '' or supplier_id == 0:
                    product.supplier_id = None
                else:
                    supplier = Supplier.query.get(supplier_id)
                    if not supplier:
                        return {'success': False, 'message': 'Proveedor no encontrado'}
                    product.supplier_id = supplier_id

            db.session.commit()
            return {'success': True, 'message': 'Producto actualizado exitosamente', 'product': product}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': f'Error al actualizar: {str(e)}'}

    @staticmethod
    def delete_product(product_id):
        try:
            product = Product.query.get(product_id)
            if not product:
                return {'success': False, 'message': 'Producto no encontrado'}
            
            db.session.delete(product)
            db.session.commit()
            return {'success': True, 'message': 'Producto eliminado exitosamente'}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': str(e)}

    @staticmethod
    def create_product(name, description, price, stock, image_url=None, supplier_id=None, sabor=None, bateria=None, color=None, en_promocion=False):
        try:
            if Product.query.filter_by(name=name).first():
                return {'success': False, 'message': 'Ya existe un producto con ese nombre'}

            if supplier_id:
                supplier = Supplier.query.get(supplier_id)
                if not supplier:
                    return {'success': False, 'message': 'Proveedor no encontrado'}

            new_product = Product(
                name=name,
                description=description,
                price=price,
                stock=stock,
                image_url=image_url,
                supplier_id=supplier_id,
                # ESPAÑOL
                sabor=sabor,
                bateria=bateria,
                color=color,
                en_promocion=en_promocion
            )
            
            db.session.add(new_product)
            db.session.commit()
            return {'success': True, 'message': 'Producto creado exitosamente', 'product': new_product.to_dict()}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': f'Error al crear producto: {str(e)}'}

    @staticmethod
    def update_product(product_id, name=None, description=None, price=None, stock=None, image_url=None, supplier_id=None, sabor=None, bateria=None, color=None, en_promocion=None):
        try:
            product = Product.query.get(product_id)
            if not product:
                return {'success': False, 'message': 'Producto no encontrado'}

            if name: product.name = name
            if description is not None: product.description = description
            if price is not None: product.price = price
            if stock is not None: product.stock = stock
            if image_url is not None: product.image_url = image_url
            
            # ESPAÑOL
            if sabor is not None: product.sabor = sabor
            if bateria is not None: product.bateria = bateria
            if color is not None: product.color = color
            if en_promocion is not None: product.en_promocion = en_promocion

            if supplier_id is not None:
                if supplier_id == '' or supplier_id == 0:
                    product.supplier_id = None
                else:
                    supplier = Supplier.query.get(supplier_id)
                    if not supplier:
                        return {'success': False, 'message': 'Proveedor no encontrado'}
                    product.supplier_id = supplier_id

            db.session.commit()
            return {'success': True, 'message': 'Producto actualizado exitosamente', 'product': product.to_dict()}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': f'Error al actualizar: {str(e)}'}
        

# --- RUTA DE LA API (Para React) ---
@product_bp.route('/api/products', methods=['GET'])
def api_get_products():
    response_data = ProductController.get_all_products()
    if response_data['success']:
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    else:
        return jsonify(response_data), 500
    



@product_bp.route('/api/products/<int:product_id>', methods=['GET'])
def api_get_single_product(product_id):
    """
    API para obtener el detalle de UN solo producto por su ID
    """
    response_data = ProductController.get_product_by_id(product_id)
    
    if response_data['success']:
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    else:
        return jsonify(response_data), 404
    