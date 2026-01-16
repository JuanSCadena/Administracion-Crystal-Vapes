<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import PayPalCheckout from '../components/PayPalCheckout.vue'

const cartStore = useCartStore()
const isCheckout = ref(false)

// Estados para Cupón
const couponCode = ref("")
const discountPercent = ref(0)
const couponMessage = ref("")

// Totales
const discountAmount = computed(() => (cartStore.total * discountPercent.value) / 100)
const finalTotal = computed(() => cartStore.total - discountAmount.value)

// Función para validar cupón
async function handleApplyCoupon() {
  if (!couponCode.value.trim()) return

  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001'
    const response = await axios.post(`${apiUrl}/api/coupons/validate`, {
      code: couponCode.value
    })

    if (response.data.success) {
      discountPercent.value = response.data.discount
      couponMessage.value = `✅ ${response.data.message}`
    }
  } catch (error) {
    discountPercent.value = 0
    couponMessage.value = "❌ Cupón inválido o expirado"
    console.error(error)
  }
}
</script>

<template>
  <div class="cart-container">
    <h1> Tu Pedido</h1>
    
    <!-- CARRITO VACÍO -->
    <div v-if="cartStore.cart.length === 0" class="empty-cart-container">
      <div class="empty-cart-box">
        <h2>Tu carrito está vacío </h2>
        <p>¡Parece que aún no has elegido tu vaper ideal!</p>
        <RouterLink to="/" class="continue-btn">Volver a la tienda</RouterLink>
      </div>
    </div>

    <!-- CONTENIDO DEL CARRITO -->
    <div v-else class="cart-content">
      <!-- LISTA DE PRODUCTOS -->
      <div class="cart-items">
        <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
          <img :src="item.image_url" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-spec">Sabor: {{ item.sabor || "Estándar" }}</p>
            <p class="item-price">${{ item.price }} x {{ item.quantity }}</p>
          </div>
          <div class="item-actions">
            <span class="item-subtotal">${{ (item.price * item.quantity).toFixed(2) }}</span>
            <button class="remove-btn" @click="cartStore.removeFromCart(item.id)">🗑️</button>
          </div>
        </div>
      </div>

      <!-- RESUMEN DE PAGO -->
      <div class="cart-summary">
        <h3>Resumen</h3>
        
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>

        <!-- SECCIÓN CUPÓN -->
        <div class="coupon-section">
          <div class="coupon-input-group">
              <input 
                  type="text" 
                  placeholder="Código (ej: PROMO2024)"
                  v-model="couponCode"
                  :disabled="discountPercent > 0" 
              />
              <button @click="handleApplyCoupon" :disabled="discountPercent > 0">
                  Aplicar
              </button>
          </div>
          <p v-if="couponMessage" class="coupon-msg">{{ couponMessage }}</p>
        </div>

        <!-- Descuento si existe -->
        <div v-if="discountPercent > 0" class="summary-row discount-row">
           <span>Descuento ({{ discountPercent }}%):</span>
           <span>- ${{ discountAmount.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        
        <hr />
        
        <div class="summary-total">
          <span>Total:</span>
          <span>${{ finalTotal.toFixed(2) }}</span>
        </div>

        <!-- LÓGICA DE PAGO -->
        <div v-if="!isCheckout" class="checkout-actions">
          <button class="checkout-btn" @click="isCheckout = true">
              PAGAR AHORA 💳
          </button>
          <button class="clear-btn" @click="cartStore.clearCart">
              Vaciar Carrito
          </button>
        </div>

        <div v-else class="paypal-container">
            <PayPalCheckout :total="finalTotal" />
            
            <button 
                class="clear-btn" 
                style="margin-top: 10px;" 
                @click="isCheckout = false"
            >
                Cancelar
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

/* Items List */
.cart-items {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  margin: 0;
  font-size: 1.1rem;
}

.item-spec {
  margin: 0.2rem 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  font-weight: bold;
  color: #2e7d32;
  margin: 0.2rem 0;
}

.item-actions {
  text-align: right;
  min-width: 100px;
}

.item-subtotal {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.2);
}

/* Summary Box */
.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08); /* Sombra elevada */
  height: fit-content;
}

.cart-summary h3 {
  margin-top: 0;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.05rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.coupon-section {
  margin: 1.5rem 0;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.coupon-input-group {
  display: flex;
  gap: 5px;
}

.coupon-input-group input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.coupon-input-group button {
  padding: 8px 12px;
  background: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.coupon-input-group button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.coupon-msg {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.discount-row {
  color: #2e7d32;
  font-weight: bold;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #000;
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background: #333;
}

.clear-btn {
  width: 100%;
  padding: 0.8rem;
  background: white;
  border: 1px solid #ccc;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
}

.clear-btn:hover {
  background: #f0f0f0;
  color: #333;
}

/* Empty State */
.empty-cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.empty-cart-box {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.continue-btn {
  display: inline-block;
  margin-top: 1.5rem;
  background: #000;
  color: white;
  padding: 0.8rem 2rem;
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
}
</style>
