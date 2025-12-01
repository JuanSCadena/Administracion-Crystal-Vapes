// frontend/src/components/Marketplace.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <--- IMPORTANTE
import { useCart } from '../context/CartContext'; // <--- IMPORTANTE
import ProductCard from './ProductCard';
import './Marketplace.css';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook del carrito para saber cuántos items tenemos
  const { cart } = useCart();
  
  // Calculamos la cantidad total de productos (ej: 2 vapers + 1 esencia = 3 items)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        const response = await axios.get(`${apiUrl}/api/products`);
        
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("El servidor respondió, pero sin éxito.");
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("No se pudo conectar con el servidor Flask.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="marketplace-container">
      {/* HEADER */}
      <header className="marketplace-header">
        <div className="header-content">
          <div className="brand">
            <h1>Crystal Vapes Shop</h1>
            <p>AHORA EN WEB!</p>
          </div>
          
          <nav className="header-actions">
            {/* 1. BOTÓN DEL CARRITO (Nuevo) */}
            <Link to="/cart" className="cart-btn">
              🛒 Carrito <span className="cart-count">({totalItems})</span>
            </Link>

            {/* 2. BOTÓN DE LOGIN (Existente) */}
            <a href="http://127.0.0.1:5000/login" className="admin-link">
              Login
            </a>
          </nav>
        </div>
      </header>

      {loading && <p className="loading-text">Cargando catálogo...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
