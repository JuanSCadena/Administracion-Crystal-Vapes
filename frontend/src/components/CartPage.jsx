// frontend/src/components/CartPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // <--- Necesitamos axios para validar el cupón
import { useCart } from '../context/CartContext';
import PayPalCheckout from './PayPalCheckout';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  
  // --- ESTADOS DEL CUPÓN ---
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Calcular totales
  const discountAmount = (total * discountPercent) / 100;
  const finalTotal = total - discountAmount;

  // Función para validar cupón con Python
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const response = await axios.post(`${apiUrl}/api/coupons/validate`, {
        code: couponCode
      });

      if (response.data.success) {
        setDiscountPercent(response.data.discount);
        setCouponMessage(`✅ ${response.data.message}`);
      }
    } catch (error) {
      setDiscountPercent(0);
      setCouponMessage("❌ Cupón inválido o expirado");
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-box">
          <h2>Tu carrito está vacío 😔</h2>
          <p>¡Parece que aún no has elegido tu vaper ideal!</p>
          <Link to="/" className="continue-btn">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>🛒 Tu Pedido</h1>
      
      <div className="cart-content">
        {/* LISTA DE PRODUCTOS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-spec">Sabor: {item.sabor || "Estándar"}</p>
                <p className="item-price">${item.price} x {item.quantity}</p>
              </div>
              <div className="item-actions">
                <span className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="cart-summary">
          <h3>Resumen</h3>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* --- SECCIÓN CUPÓN VISUAL --- */}
          <div className="coupon-section">
            <div className="coupon-input-group">
                <input 
                    type="text" 
                    placeholder="Código (ej: PROMO2024)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={discountPercent > 0} // Bloquear si ya se aplicó
                />
                <button onClick={handleApplyCoupon} disabled={discountPercent > 0}>
                    Aplicar
                </button>
            </div>
            {couponMessage && <p className="coupon-msg">{couponMessage}</p>}
          </div>

          {/* Mostrar Descuento si existe */}
          {discountPercent > 0 && (
             <div className="summary-row discount-row">
                <span>Descuento ({discountPercent}%):</span>
                <span>- ${discountAmount.toFixed(2)}</span>
             </div>
          )}

          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          
          <hr />
          
          <div className="summary-total">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          {/* LÓGICA DE PAGO (Actualizada con el nuevo total) */}
          {!isCheckout ? (
            <>
                <button className="checkout-btn" onClick={() => setIsCheckout(true)}>
                    PAGAR AHORA 💳
                </button>
                <button className="clear-btn" onClick={clearCart}>
                    Vaciar Carrito
                </button>
            </>
          ) : (
            <div className="paypal-container">
                <p style={{marginBottom: '10px', fontSize: '0.9rem'}}>Elige tu método de pago:</p>
                {/* Pasamos el total FINAL con descuento a PayPal */}
                <PayPalCheckout total={finalTotal} />
                
                <button 
                    className="clear-btn" 
                    style={{marginTop: '10px'}} 
                    onClick={() => setIsCheckout(false)}
                >
                    Cancelar
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;