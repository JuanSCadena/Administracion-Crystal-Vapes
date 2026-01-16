<script setup>
import { ref, onMounted } from 'vue'
import { loadScript } from "@paypal/paypal-js"
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
})

const cartStore = useCartStore()
const router = useRouter()
const paypalContainer = ref(null)

onMounted(async () => {
  try {
    const paypal = await loadScript({ 
      "client-id": "AdfVJVM8RIQZblsMGD8VsJmCcNUpYg5i1QNFqyHPJ3k2DbG82VCIwbgBHbGges8o-AF76kzqdGCFs9K5",
      currency: "USD"
    })

    if (paypal) {
      await paypal.Buttons({
        style: { layout: "vertical" },
        
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: props.total.toFixed(2), // Usamos el valor actual del prop
                },
              },
            ],
          })
        },

        onApprove: async (data, actions) => {
          const details = await actions.order.capture()
          const payerName = details.payer.name.given_name
          alert(`✅ Pago realizado con éxito por ${payerName}`)
          
          cartStore.clearCart()
          router.push("/")
        },

        onError: (err) => {
          console.error("Error en PayPal:", err)
          alert("Hubo un error procesando el pago. Intenta de nuevo.")
        }
      }).render(paypalContainer.value)
    }
  } catch (error) {
    console.error("failed to load the PayPal JS SDK script", error)
  }
})
</script>

<template>
  <div class="paypal-wrapper">
    <p class="payment-label">Elige tu método de pago:</p>
    <div ref="paypalContainer"></div>
  </div>
</template>

<style scoped>
.paypal-wrapper {
  margin-top: 20px;
  min-width: 300px;
}
.payment-label {
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #666;
}
</style>
