// frontend/src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Inicializar carrito desde LocalStorage (para no perder datos al recargar)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('vapeCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('vapeCart', JSON.stringify(cart));
  }, [cart]);

  // 3. Función: Añadir al carrito
  const addToCart = (product) => {
    setCart(currentCart => {
      // Verificamos si ya existe para sumar cantidad
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Si es nuevo, lo agregamos con cantidad 1
      return [...currentCart, { ...product, quantity: 1 }];
    });
    alert(`¡${product.name} añadido al carrito! 🛒`);
  };

  // 4. Función: Eliminar del carrito
  const removeFromCart = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  // 5. Función: Limpiar todo (útil al finalizar compra)
  const clearCart = () => setCart([]);

  // 6. Calcular Total
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};