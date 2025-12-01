// frontend/src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css'; // Crearemos esto en el siguiente paso

const ProductDetail = () => {
  const { id } = useParams(); // Captura el ID de la URL (ej: /product/1)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        // OJO: Necesitamos asegurar que el Backend tenga esta ruta (Paso 4 de esta respuesta)
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
        
        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="detail-loading">Cargando detalles...</div>;
  if (!product) return <div className="detail-error">Producto no encontrado</div>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Volver a la tienda</Link>
      
      <div className="detail-wrapper">
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="detail-image">
          <img src={product.image_url} alt={product.name} />
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>
          
          <div className="tech-specs">
            <h3>Especificaciones:</h3>
            <ul>
              {/* Mostramos los datos si existen, si no, ponemos "N/A" */}
              <li><strong>🔥 Sabor:</strong> {product.sabor || "Estándar"}</li>
              <li><strong>🔋 Batería:</strong> {product.bateria || "No especificada"}</li>
              <li><strong>🎨 Color:</strong> {product.color || "Varios"}</li>
              <li><strong>📦 Stock:</strong> {product.stock} unidades</li>
            </ul>
          </div>

          <button className="buy-button">AÑADIR AL CARRITO 🛒</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;