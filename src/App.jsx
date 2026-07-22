import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Chekout from "./pages/chekout";   // ✅ matches file name
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductDetail from "./pages/ProductDetail";   // ✅ matches file name

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Chekout />} /> 
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
