<script setup>
import { ref, onMounted } from 'vue'

const showModal = ref(false)

onMounted(() => {
  const isVerified = localStorage.getItem('ageVerified')
  if (!isVerified) {
    showModal.value = true
  }
})

function handleYes() {
  localStorage.setItem('ageVerified', 'true')
  showModal.value = false
}

function handleNo() {
  window.location.href = "https://www.google.com"
}
</script>

<template>
  <div v-if="showModal" class="age-gate-overlay">
    <div class="age-gate-box">
      <div class="warning-icon">🔞</div>
      <h2>Verificación de Edad</h2>
      <p>
        Debes tener 18 años o más para entrar a este sitio.
        Los productos contienen nicotina, una sustancia adictiva.
      </p>
      <p><strong>¿Eres mayor de edad?</strong></p>
      
      <div class="age-buttons">
        <button @click="handleNo" class="btn-no">NO, SALIR</button>
        <button @click="handleYes" class="btn-yes">SÍ, ENTRAR</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.age-gate-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.age-gate-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.warning-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  color: #d32f2f;
  margin-top: 0;
}

.age-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  gap: 1rem;
}

button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.btn-yes {
  background-color: #2e7d32;
  color: white;
}

.btn-no {
  background-color: #c62828;
  color: white;
}
</style>
