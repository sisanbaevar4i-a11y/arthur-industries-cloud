import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
                <footer className="footer">
                    <div className="footer-title">ARTHUR INDUSTRIES</div>
                    <div className="footer-subtitle">ИННОВАЦИИ. ЭСТЕТИКА. СОВЕРШЕНСТВО.</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}