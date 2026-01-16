<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001'
    const id = route.params.id
    const response = await axios.get(`${apiUrl}/api/products/${id}`)
    
    if (response.data.success) {
      product.value = response.data.product
    } else {
      error.value = "El producto no existe en la base de datos."
    }
  } catch (err) {
    console.error("Error:", err)
    error.value = "Error de conexión con el servidor."
  } finally {
    loading.value = false
  }
})

function handleAddToCart() {
    if (product.value) {
        cartStore.addToCart(product.value)
        // Feedback visual simple
        alert(`¡${product.value.name} añadido al carrito! 🛒`)
    }
}
</script>

<template>
  <div v-if="loading" class="detail-loading">Cargando detalles...</div>

  <div v-if="error || (!loading && !product)" class="detail-error">
      <h2>😕 Ups, algo salió mal</h2>
      <p>{{ error || "Producto no encontrado" }}</p>
      <RouterLink to="/" class="back-link">Volver al inicio</RouterLink>
  </div>

  <div v-if="product" class="detail-container">
    <RouterLink to="/" class="back-link">← Volver a la tienda</RouterLink>
    
    <div class="detail-wrapper">
      <div class="detail-image">
        <img 
          :src="product.image_url || 'https://via.placeholder.com/400'" 
          :alt="product.name" 
        />
      </div>

      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p class="detail-price">${{ product.price }}</p>
        <p class="detail-description">{{ product.description }}</p>
        
        <div class="tech-specs">
          <h3>Especificaciones:</h3>
          <ul>
            <li><strong> Sabor:</strong> {{ product.sabor || "Estándar" }}</li>
            <li><strong> Batería:</strong> {{ product.bateria || "No especificada" }}</li>
            <li><strong> Color:</strong> {{ product.color || "Varios" }}</li>
            <li><strong> Stock:</strong> {{ product.stock }} unidades</li>
          </ul>
        </div>

        <button 
          class="buy-button"
          @click="handleAddToCart"
        >
          AÑADIR AL CARRITO 🛒
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  color: #666;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
  color: #000;
}

.detail-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .detail-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.detail-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa; /* Fondo gris claro suave */
  border-radius: 15px;
  padding: 2rem;
}

.detail-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  /* Efecto flotante */
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
}

.detail-info h1 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.detail-price {
  font-size: 2rem;
  color: #2e7d32;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.detail-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.tech-specs {
  background: #fcfcfc;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #eee;
  margin-bottom: 2rem;
}

.tech-specs h3 {
  margin-top: 0;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.tech-specs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-specs li {
  margin-bottom: 0.5rem;
  color: #444;
}

.buy-button {
  background: black;
  color: white;
  border: none;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.buy-button:hover {
  background: #333;
  transform: translateY(-2px);
}

.detail-loading, .detail-error {
  text-align: center;
  margin-top: 5rem;
  font-size: 1.2rem;
}

.detail-error h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
</style>
