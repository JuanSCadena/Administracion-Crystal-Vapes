// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './components/Marketplace';
import AgeGate from './components/AgeGate';
import ProductDetail from './components/ProductDetail';
import PromoPopup from './components/PromoPopup';
import CartPage from './components/CartPage';

function App() {
  return (
    <BrowserRouter>
      {/* Componentes Globales (Se ven en todas las páginas) */}
      <AgeGate /> 
      <PromoPopup /> 
      
      {/* Sistema de Rutas */}
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;