// frontend/src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {/* Si la imagen viene vacía, ponemos una por defecto para que no se rompa */}
        <img 
          src={product.image_url || "https://via.placeholder.com/300?text=Sin+Imagen"} 
          alt={product.name} 
        />
      </div>
      
      <div className="card-details">
        <h3 className="product-title">{product.name}</h3>
        
        {/* Recortamos la descripción si es muy larga para que no deforme la tarjeta */}
        <p className="description">
          {product.description ? product.description.substring(0, 50) + '...' : ''}
        </p>
        
        <div className="price-row">
            <span className="price">${product.price}</span>
            <button className="add-btn">Ver +</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;