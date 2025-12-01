// frontend/src/components/PromoPopup.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PromoPopup.css';

const PromoPopup = () => {
  const [promoProduct, setPromoProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 1. Verificar si ya lo cerramos antes (para no ser molestos)
    const hasSeenPromo = sessionStorage.getItem('seenPromo');
    
    if (!hasSeenPromo) {
      // 2. Buscar si hay producto en promoción
      const fetchPromo = async () => {
        try {
          // Usamos la variable de entorno o localhost
          const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
          const response = await axios.get(`${apiUrl}/api/products`);
          
          if (response.data.success) {
            // Buscamos el primero que tenga en_promocion = true
            const promoted = response.data.products.find(p => p.en_promocion === true);
            if (promoted) {
              setPromoProduct(promoted);
              // Pequeño retraso para que aparezca suavemente
              setTimeout(() => setShowPopup(true), 1000);
            }
          }
        } catch (error) {
          console.error("Error buscando promo:", error);
        }
      };
      fetchPromo();
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    // Guardamos en sessionStorage (se borra al cerrar la pestaña) 
    // para que no salga en cada recarga, pero sí en la próxima visita.
    sessionStorage.setItem('seenPromo', 'true');
  };

  if (!promoProduct || !showPopup) return null;

  return (
    <div className="promo-overlay">
      <div className="promo-content">
        <button className="close-btn" onClick={handleClose}>&times;</button>
        
        <div className="promo-badge">🔥 OFERTA FLASH</div>
        
        <div className="promo-image">
            <img src={promoProduct.image_url} alt={promoProduct.name} />
        </div>
        
        <h3>{promoProduct.name}</h3>
        <p className="promo-price">${promoProduct.price}</p>
        
        {promoProduct.sabor && <p className="promo-detail">Sabor: {promoProduct.sabor}</p>}
        
        <Link to={`/product/${promoProduct.id}`} className="promo-cta" onClick={handleClose}>
          COMPRAR AHORA
        </Link>
      </div>
    </div>
  );
};

export default PromoPopup;