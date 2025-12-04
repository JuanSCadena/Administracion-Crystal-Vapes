// frontend/src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nuevo estado para errores
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
        
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("El producto no existe en la base de datos.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 1. Si está cargando, mostramos spinner
  if (loading) return <div className="detail-loading">Cargando detalles...</div>;

  // 2. Si hubo error o no hay producto, mostramos mensaje amigable
  if (error || !product) {
      return (
        <div className="detail-error">
            <h2>😕 Ups, algo salió mal</h2>
            <p>{error || "Producto no encontrado"}</p>
            <Link to="/" className="back-link">Volver al inicio</Link>
        </div>
      );
  }

  // 3. Renderizado seguro (usamos ?. para evitar explosiones)
  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Volver a la tienda</Link>
      
      <div className="detail-wrapper">
        <div className="detail-image">
          {/* Usamos una imagen por defecto si falla la URL */}
          <img 
            src={product.image_url || "https://via.placeholder.com/400"} 
            alt={product.name} 
          />
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>
          
          <div className="tech-specs">
            <h3>Especificaciones:</h3>
            <ul>
              <li><strong> Sabor:</strong> {product.sabor || "Estándar"}</li>
              <li><strong> Batería:</strong> {product.bateria || "No especificada"}</li>
              <li><strong> Color:</strong> {product.color || "Varios"}</li>
              <li><strong> Stock:</strong> {product.stock} unidades</li>
            </ul>
          </div>

          <button 
            className="buy-button"
            onClick={() => addToCart(product)}
          >
            AÑADIR AL CARRITO 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;