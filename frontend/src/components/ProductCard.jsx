// frontend/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <--- 1. Importamos Link
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img 
          src={product.image_url || "https://via.placeholder.com/300?text=Sin+Imagen"} 
          alt={product.name} 
        />
      </div>
      
      <div className="card-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="description">
          {product.description ? product.description.substring(0, 50) + '...' : ''}
        </p>
        
        <div className="price-row">
            <span className="price">${product.price}</span>
            
            {/*  Usamos Link en lugar de button */}
            {/* Esto le dice a React: "Ve a la página /product/EL_ID_DEL_PRODUCTO" */}
            <Link to={`/product/${product.id}`} className="add-btn">
               Ver +
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;