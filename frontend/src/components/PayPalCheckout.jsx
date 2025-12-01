// frontend/src/components/PayPalCheckout.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const PayPalCheckout = ({ total }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '20px', minWidth: '300px' }}>
      {/* Configuración inicial de PayPal */}
      <PayPalScriptProvider options={{ 
          "client-id": "AdfVJVM8RIQZblsMGD8VsJmCcNUpYg5i1QNFqyHPJ3k2DbG82VCIwbgBHbGges8o-AF76kzqdGCFs9K5", 
          currency: "USD"
      }}>
        <PayPalButtons 
          style={{ layout: "vertical" }}
          
          // 1. Crear la orden: Le decimos a PayPal cuánto cobrar
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toFixed(2), // El total que viene del carrito
                  },
                },
              ],
            });
          }}

          // 2. Cuando el usuario aprueba el pago (se loguea y paga)
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const payerName = details.payer.name.given_name;
              alert(`✅ Pago realizado con éxito por ${payerName}`);
              
              // Limpiamos el carrito y volvemos al inicio
              clearCart();
              navigate("/");
            });
          }}
          
          // 3. Si hay error
          onError={(err) => {
            console.error("Error en PayPal:", err);
            alert("Hubo un error procesando el pago. Intenta de nuevo.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalCheckout;