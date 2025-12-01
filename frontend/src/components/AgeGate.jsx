// frontend/src/components/AgeGate.jsx
import { useState, useEffect } from 'react';
import './AgeGate.css'; // Crearemos esto después

const AgeGate = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificamos si ya validó su edad anteriormente
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      setShowModal(true);
    }
  }, []);

  const handleYes = () => {
    // Guardamos en el navegador que el usuario es mayor
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
  };

  const handleNo = () => {
    // Si dice que NO, lo mandamos a Google o mostramos un mensaje
    window.location.href = "https://www.google.com";
  };

  if (!showModal) return null;

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <div className="warning-icon">🔞</div>
        <h2>Verificación de Edad</h2>
        <p>
          Debes tener 18 años o más para entrar a este sitio.
          Los productos contienen nicotina, una sustancia adictiva.
        </p>
        <p><strong>¿Eres mayor de edad?</strong></p>
        
        <div className="age-buttons">
          <button onClick={handleNo} className="btn-no">NO, SALIR</button>
          <button onClick={handleYes} className="btn-yes">SÍ, ENTRAR</button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;