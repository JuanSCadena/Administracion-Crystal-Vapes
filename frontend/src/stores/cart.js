import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cart = ref(JSON.parse(localStorage.getItem('vapeCart') || '[]'))

    watch(cart, (newCart) => {
        localStorage.setItem('vapeCart', JSON.stringify(newCart))
    }, { deep: true })

    const total = computed(() => {
        return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    })

    // Obtener cantidad total de items (para el badge del carrito)
    const totalItems = computed(() => {
        return cart.value.reduce((acc, item) => acc + item.quantity, 0)
    })

    function addToCart(product) {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }
        // No usamos alert para no interrumpir, pero podríamos añadir un toast
    }

    function removeFromCart(id) {
        cart.value = cart.value.filter(item => item.id !== id)
    }

    function clearCart() {
        cart.value = []
    }

    return { cart, total, totalItems, addToCart, removeFromCart, clearCart }
})
