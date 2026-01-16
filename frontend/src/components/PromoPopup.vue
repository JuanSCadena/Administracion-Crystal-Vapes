<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const promoProduct = ref(null)
const showPopup = ref(false)
const router = useRouter()

onMounted(async () => {
  const hasSeenPromo = sessionStorage.getItem('seenPromo')
  
  if (!hasSeenPromo) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'
      const response = await axios.get(`${apiUrl}/api/products`)
      
      if (response.data.success) {
        const promoted = response.data.products.find(p => p.en_promocion === true)
        if (promoted) {
          promoProduct.value = promoted
          setTimeout(() => {
            showPopup.value = true
          }, 1000)
        }
      }
    } catch (error) {
      console.error("Error buscando promo:", error)
    }
  }
})

function handleClose() {
  showPopup.value = false
  sessionStorage.setItem('seenPromo', 'true')
}

function handlePromoClick() {
  handleClose()
  router.push(`/product/${promoProduct.value.id}`)
}
</script>

<template>
  <div v-if="promoProduct && showPopup" class="promo-overlay">
    <div class="promo-content">
      <button class="close-btn" @click="handleClose">&times;</button>
      
      <div class="promo-badge"> OFERTA FLASH</div>
      
      <div class="promo-image">
          <img :src="promoProduct.image_url" :alt="promoProduct.name" />
      </div>
      
      <h3>{{ promoProduct.name }}</h3>
      <p class="promo-price">${{ promoProduct.price }}</p>
      
      <p v-if="promoProduct.sabor" class="promo-detail">Sabor: {{ promoProduct.sabor }}</p>
      
      <button class="promo-cta" @click="handlePromoClick">
        COMPRAR AHORA
      </button>
    </div>
  </div>
</template>

<style scoped>
.promo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

.promo-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.promo-badge {
  background: #ffc107;
  color: #000;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.promo-image img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.promo-price {
  font-size: 1.5rem;
  color: #2e7d32;
  font-weight: bold;
  margin: 10px 0;
}

.promo-cta {
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  width: 100%;
  display: inline-block;
}

.promo-cta:hover {
  background: #333;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
