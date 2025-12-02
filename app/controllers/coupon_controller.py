# app/controllers/coupon_controller.py
from flask import Blueprint, request, jsonify
from app.models.coupon import Coupon
from app.models import db

coupon_bp = Blueprint('coupon_bp', __name__)

class CouponController:
    @staticmethod
    def create_coupon(code, discount):
        try:
            if Coupon.query.filter_by(code=code).first():
                return {'success': False, 'message': 'Este código ya existe'}
            
            new_coupon = Coupon(code=code.upper(), discount=discount, active=True)
            db.session.add(new_coupon)
            db.session.commit()
            return {'success': True, 'message': 'Cupón creado exitosamente'}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': str(e)}

    @staticmethod
    def get_all_coupons():
        try:
            coupons = Coupon.query.all()
            return {'success': True, 'coupons': coupons} 
        except Exception as e:
            return {'success': False, 'message': str(e)}

    @staticmethod
    def delete_coupon(coupon_id):
        try:
            coupon = Coupon.query.get(coupon_id)
            if coupon:
                db.session.delete(coupon)
                db.session.commit()
                return {'success': True, 'message': 'Cupón eliminado'}
            return {'success': False, 'message': 'Cupón no encontrado'}
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'message': str(e)}


@coupon_bp.route('/api/coupons/validate', methods=['POST', 'OPTIONS'])
def validate_coupon():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        return response

    data = request.get_json()
    code_input = data.get('code', '').strip().upper()
    
    try:
        coupon = Coupon.query.filter_by(code=code_input, active=True).first()
        
        if coupon:
            response = jsonify({
                'success': True,
                'discount': coupon.discount,
                'message': f'¡Cupón aplicado! {coupon.discount}% de descuento.'
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response, 200
        else:
            response = jsonify({'success': False, 'message': 'Código inválido o expirado.'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response, 404
            
    except Exception as e:
        response = jsonify({'success': False, 'message': str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500