<script setup>
import AgeGate from './components/AgeGate.vue'
import PromoPopup from './components/PromoPopup.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AgeGate />
  <PromoPopup />
  <RouterView />
</template>

<style>
/* Estilos globales básicos */
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 100%;
}
</style>
