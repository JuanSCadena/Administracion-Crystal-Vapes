<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <img 
        :src="product.image_url || 'https://via.placeholder.com/300?text=Sin+Imagen'" 
        :alt="product.name" 
      />
    </div>
    
    <div class="card-details">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="description">
        {{ product.description ? product.description.substring(0, 50) + '...' : '' }}
      </p>
      
      <div class="price-row">
          <span class="price">${{ product.price }}</span>
          
          <RouterLink :to="`/product/${product.id}`" class="add-btn">
             Ver +
          </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08); /* Sombra más suave */
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.image-container {
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.card-details {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 700;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: auto; /* Empuja el precio hacia abajo */
  line-height: 1.4;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.price {
  font-size: 1.25rem;
  color: #2e7d32;
  font-weight: bold;
}

.add-btn {
  background-color: #000;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #444;
}
</style>
