# app/models/coupon.py
from app.extensions import db

class Coupon(db.Model):
    __tablename__ = 'coupons'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), unique=True, nullable=False) 
    discount = db.Column(db.Integer, nullable=False) 
    active = db.Column(db.Boolean, default=True) 

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'discount': self.discount,
            'active': self.active
        }