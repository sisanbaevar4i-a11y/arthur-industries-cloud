import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [activeConfigIndex, setActiveConfigIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        fetch(`https://arthur-industries-api3.onrender.com/api/products/${id}`)
            .then(res => {
                if(!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setActiveConfigIndex(0);
            })
            .catch(() => navigate('/'));
    }, [id, navigate]);

    const handleAddClick = () => {
        addToCart(product, product.configurations[activeConfigIndex]);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (!product || !product.configurations) return <div className="page-container">Инициализация...</div>;

    const activeConfig = product.configurations[activeConfigIndex];

    return (
        <div className="page-container" style={{ paddingTop: '25px', paddingBottom: '25px' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', marginBottom: '20px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}
            >
                ← НАЗАД В КАТАЛОГ
            </button>

            <div className="details-layout" style={{ alignItems: 'stretch', gap: '40px' }}>
                <div className="details-image-container" style={{ minHeight: '400px', padding: '40px' }}>
                    {product.badge && <div style={{position: 'absolute', top: '30px', right: '30px', background: '#fff', color: '#000', padding: '6px 14px', borderRadius: '20px', fontSize: '9px', fontWeight: '800', letterSpacing: '1px'}}>{product.badge}</div>}
                    <img src={product.image} alt={product.name} className="details-image" style={{ maxHeight: '380px' }} onError={(e) => e.target.style.display='none'} />
                </div>

                <div className="details-info-container" style={{ padding: '0', gap: '15px', justifyContent: 'space-between' }}>
                    <div>
                        {product.slogan && <p className="details-slogan" style={{ marginBottom: '8px' }}>{product.slogan}</p>}
                        <h1 className="details-title" style={{ fontSize: '32px' }}>{product.name}</h1>
                        <h2 className="details-price" style={{ fontSize: '24px', margin: '10px 0 15px 0' }}>{Number(activeConfig.price).toLocaleString()} ₽</h2>
                    </div>

                    {product.configurations.length > 1 && (
                        <div>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: '600' }}>КОНФИГУРАЦИЯ</p>
                            <div className="config-grid" style={{ marginBottom: '15px' }}>
                                {product.configurations.map((config, idx) => (
                                    <button key={idx} className={`config-btn ${activeConfigIndex === idx ? 'active' : ''}`} onClick={() => setActiveConfigIndex(idx)} style={{ padding: '10px 20px', fontSize: '11px' }}>
                                        {config.memory}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ flex: 1 }}>
                        <div className="tabs-header" style={{ marginTop: '0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')} style={{ paddingBottom: '10px' }}>ОПИСАНИЕ</button>
                            <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')} style={{ paddingBottom: '10px' }}>СПЕЦИФИКАЦИИ</button>
                            <button className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')} style={{ paddingBottom: '10px' }}>ДОСТАВКА</button>
                        </div>

                        <div className="tab-content" style={{ paddingTop: '20px', minHeight: '110px', fontSize: '13px', lineHeight: '1.6' }}>
                            {activeTab === 'description' && <p>{product.description || 'Описание отсутствует.'}</p>}
                            {activeTab === 'specs' && (
                                <ul style={{ gap: '8px' }}>
                                    {product.specs?.map((s, i) => <li key={i}>{s}</li>) || <li>Нет данных</li>}
                                </ul>
                            )}
                            {activeTab === 'delivery' && <p>{product.delivery || 'Уточняйте у менеджера.'}</p>}
                        </div>
                    </div>

                    <button className={`add-to-cart-btn ${isAdded ? 'added' : ''}`} style={{ padding: '16px', fontSize: '11px', letterSpacing: '2px', width: '100%', marginTop: '0' }} onClick={handleAddClick}>
                        {isAdded ? 'ДОБАВЛЕНО В КОРЗИНУ' : 'ДОБАВИТЬ В КОРЗИНУ'}
                    </button>
                </div>
            </div>
        </div>
    );
}