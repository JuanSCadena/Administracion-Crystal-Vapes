import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Marketplace.css';

const Marketplace = () => {
  // 1. Estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Efecto para cargar datos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/products');
        
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("El servidor respondió, pero sin éxito.");
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("No se pudo conectar con el servidor Flask (Puerto 5000).");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // 

  // 3. Renderizado
  return (
    <div className="marketplace-container">
      {/* HEADER CON NAVEGACIÓN */}
      <header className="marketplace-header">
        <div className="header-content">
          <div className="brand">
            <h1> Crystal Vapes Shop</h1>
            <p>Ahora en Web!</p>
          </div>
          
          {/* BOTÓN AL ADMIN */}
          <nav>
            <a href="http://127.0.0.1:5000/login" className="admin-link">
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* ESTADOS DE CARGA Y ERROR */}
      {loading && <p className="loading-text">Cargando catálogo...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* REJILLA DE PRODUCTOS */}
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
