import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки активировано
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    useEffect(() => {
        // Оптимизированный прямой канал связи (127.0.0.1)
        fetch('http://127.0.0.1:5000/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Ошибка архитектуры данных:', data);
                    setProducts([]);
                }
            })
            .catch(err => {
                console.error('Разрыв связи с ядром:', err);
                setProducts([]);
            })
            .finally(() => {
                // Отключение индикатора после получения данных
                setIsLoading(false);
            });
    }, []);

    const sections = useMemo(() => [
        { title: 'СМАРТФОНЫ', categories: ['iPhone', 'Google Pixel', 'Samsung'] },
        { title: 'НОУТБУКИ И АКСЕССУАРЫ', categories: ['MacBook', 'AirPods', 'Apple Watch', 'Аксессуары'] },
        { title: 'БЫТОВАЯ ТЕХНИКА', categories: ['Dyson'] }
    ], []);

    const filteredProducts = useMemo(() => {
        if (!query) return null;
        return products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            (p.slogan && p.slogan.toLowerCase().includes(query))
        );
    }, [products, query]);

    // Визуальный интерфейс синхронизации
    if (isLoading) {
        return (
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ width: '40px', height: '40px', border: '2px solid rgba(90, 157, 248, 0.1)', borderTopColor: '#5a9df8', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ marginTop: '25px', color: '#5a9df8', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700' }}>СИНХРОНИЗАЦИЯ С ОБЛАКОМ...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (query) {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                    <h2 className="main-category-header" style={{ marginBottom: 0, borderLeft: 'none', paddingLeft: 0 }}>
                        РЕЗУЛЬТАТЫ ПОИСКА: {query.toUpperCase()}
                    </h2>
                    <button onClick={() => setSearchParams({})} className="pill-btn" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)' }}>
                        ✕ СБРОСИТЬ
                    </button>
                </div>

                {filteredProducts && filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '80px', color: 'rgba(255,255,255,0.5)' }}>
                        <p style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Система не обнаружила совпадений в каталоге.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="page-container">
            {sections.map(section => (
                <div key={section.title}>
                    <h2 className="main-category-header">{section.title}</h2>
                    {section.categories.map(category => {
                        const categoryProducts = products.filter(p => p.category === category);
                        if (categoryProducts.length === 0) return null;
                        return (
                            <div key={category} id={category.replace(/\s+/g, '-').toLowerCase()}>
                                <h3 className="sub-category-header">{category}</h3>
                                <div className="product-grid">
                                    {categoryProducts.map(product => <ProductCard key={product.id} product={product} />)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}