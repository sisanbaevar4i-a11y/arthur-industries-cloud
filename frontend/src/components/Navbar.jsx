import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('q') || '';
    const [inputValue, setInputValue] = useState(urlQuery);

    const location = useLocation();
    const navigate = useNavigate();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        setInputValue(urlQuery);
        if (urlQuery) setIsSearchOpen(true);
    }, [urlQuery]);

    const scrollToCategory = (categoryId) => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') window.location.href = `/#${categoryId}`;
        else { const el = document.getElementById(categoryId); if(el) el.scrollIntoView({ behavior: 'smooth' }); }
    };

    const handleLiveSearch = (e) => {
        const val = e.target.value;
        setInputValue(val);

        if (val.trim() === '') {
            navigate('/', { replace: true });
        } else {
            navigate(`/?q=${encodeURIComponent(val)}`, { replace: true });
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!inputValue.trim()) setIsSearchOpen(false);
        }, 200);
    };

    return (
        <>
            <div className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
            <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
                <h3 className="sidebar-title">БЫТОВАЯ ТЕХНИКА</h3>
                <button className="sidebar-link" onClick={() => scrollToCategory('dyson')}>Dyson</button>

                <h3 className="sidebar-title">КАТАЛОГ</h3>
                <button className="sidebar-link" onClick={() => scrollToCategory('iphone')}>iPhone</button>
                <button className="sidebar-link" onClick={() => scrollToCategory('google-pixel')}>Google Pixel</button>
                <button className="sidebar-link" onClick={() => scrollToCategory('macbook')}>MacBook</button>

                <h3 className="sidebar-title">СИСТЕМА</h3>
                <Link to="/admin" className="sidebar-link" onClick={() => setIsMenuOpen(false)}>Админ Панель</Link>
            </div>

            <nav className="navbar">
                <div className="navbar-left">
                    <button className="pill-btn" onClick={() => setIsMenuOpen(true)}>МЕНЮ</button>
                </div>
                <div className="navbar-center">
                    <Link to="/" className="brand-name">ARTHUR INDUSTRIES</Link>
                </div>
                <div className="navbar-right">
                    {isSearchOpen ? (
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '0 15px', border: '1px solid #5a9df8', height: '36px' }}>
                            <input
                                type="text"
                                placeholder="ПОИСК..."
                                autoFocus
                                value={inputValue}
                                onChange={handleLiveSearch}
                                onBlur={handleBlur}
                                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '140px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
                            />
                        </div>
                    ) : (
                        <button className="pill-btn hide-mobile" onClick={() => setIsSearchOpen(true)}>ПОИСК</button>
                    )}
                    <button className="pill-btn hide-mobile">ОТЗЫВЫ</button>
                    <Link to="/cart" className="pill-btn">КОРЗИНА ({totalItems})</Link>
                </div>
            </nav>
        </>
    );
}