// frontend/src/components/CartPage.jsx
import { useState } from 'react'; // <--- NUEVO: Importar useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PayPalCheckout from './PayPalCheckout'; // <--- NUEVO: Importar PayPal
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [isCheckout, setIsCheckout] = useState(false); // <--- NUEVO: Estado para mostrar PayPal

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
        {/* LISTA DE PRODUCTOS (Igual que antes) */}
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
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* --- LÓGICA DE PAGO --- */}
          {!isCheckout ? (
            // Si NO ha dado clic a pagar, mostramos el botón normal
            <>
                <button className="checkout-btn" onClick={() => setIsCheckout(true)}>
                    PAGAR AHORA 💳
                </button>
                <button className="clear-btn" onClick={clearCart}>
                    Vaciar Carrito
                </button>
            </>
          ) : (
            // Si YA dio clic, mostramos los botones de PayPal
            <div className="paypal-container">
                <p style={{marginBottom: '10px', fontSize: '0.9rem'}}>Elige tu método de pago:</p>
                <PayPalCheckout total={total} />
                
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