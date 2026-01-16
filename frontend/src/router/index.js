import { createRouter, createWebHistory } from 'vue-router'
import Marketplace from '../views/Marketplace.vue' // Crearé este archivo pronto
import ProductDetail from '../views/ProductDetail.vue' // Crearé este archivo pronto
import CartPage from '../views/CartPage.vue' // Crearé este archivo pronto

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Marketplace
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductDetail,
            props: true
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage
        }
    ]
})

export default router
