// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './components/Marketplace';
import AgeGate from './components/AgeGate';
import ProductDetail from './components/ProductDetail';
import PromoPopup from './components/PromoPopup'; // <--- IMPORTAR

function App() {
  return (
    <BrowserRouter>
      <AgeGate /> 
      <PromoPopup /> {/* <--- AÑADIR AQUÍ */}
      
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
