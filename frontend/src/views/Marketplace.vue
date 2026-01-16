<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const products = ref([])
const loading = ref(true)
const error = ref(null)

const cartStore = useCartStore()

// Usamos computed para reactividad del totalItems
const totalItems = computed(() => cartStore.totalItems)

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001'
    const response = await axios.get(`${apiUrl}/api/products`)
    
    if (response.data.success) {
      products.value = response.data.products
    } else {
      error.value = "El servidor respondió, pero sin éxito."
    }
  } catch (err) {
    console.error("Error cargando productos:", err)
    error.value = "No se pudo conectar con el servidor Flask."
  } finally {
    loading.value = false
  }
})

// Definimos la URL de login explicitamente en el script
const loginUrl = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001'}/login`
</script>

<template>
  <div class="marketplace-container">
    <!-- HEADER -->
    <header class="marketplace-header">
      <div class="header-content">
        <div class="brand">
          <h1>Crystal Vapes Shop</h1>
          <p>AHORA EN VUE 3!</p>
        </div>
        
        <nav class="header-actions">
          <RouterLink to="/cart" class="cart-btn">
             Carrito <span class="cart-count">({{ totalItems }})</span>
          </RouterLink>

          <a :href="loginUrl" class="admin-link">Login</a>
        </nav>
      </div>
    </header>

    <p v-if="loading" class="loading-text">Cargando catálogo...</p>
    <p v-if="error" class="error-text">{{ error }}</p>

    <div v-if="!loading && !error" class="products-grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<style scoped>
.marketplace-container {
  min-height: 100vh;
  padding-bottom: 2rem;
}

.marketplace-header {
  background: white;
  border-bottom: 1px solid #eaeaea;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand h1 {
  margin: 0;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #000, #444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.brand p {
  margin: 0;
  font-size: 0.8rem;
  color: #42b883; /* Vue Green */
  font-weight: bold;
  letter-spacing: 1px;
}

.header-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.cart-btn {
  text-decoration: none;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 20px;
  transition: all 0.2s;
}

.cart-btn:hover {
  background: #e9ecef;
}

.cart-count {
  background: #d32f2f;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.admin-link {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

.admin-link:hover {
  color: #000;
  text-decoration: underline;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.loading-text, .error-text {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
}

.error-text {
  color: #c62828;
}
</style>
