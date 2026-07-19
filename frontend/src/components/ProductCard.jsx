import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductCard = memo(({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [activeConfigIndex, setActiveConfigIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddClick = (e) => {
        e.stopPropagation();
        addToCart(product, product.configurations[activeConfigIndex]);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleConfigSelect = (e, idx) => {
        e.stopPropagation();
        setActiveConfigIndex(idx);
    };

    const activeConfig = product.configurations[activeConfigIndex];

    return (
        <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} className="product-img" loading="lazy" onError={(e) => e.target.src = 'https://placehold.co/600x600/0a0a0a/333333?text=NO+IMAGE&font=monospace'} />
                {product.badge && <div className="product-badge">{product.badge}</div>}
            </div>

            <h3 className="product-title">{product.name}</h3>
            {product.slogan && <p className="product-slogan">{product.slogan}</p>}

            {product.configurations.length > 1 && (
                <div className="config-grid">
                    {product.configurations.map((config, idx) => (
                        <button key={idx} className={`config-btn ${activeConfigIndex === idx ? 'active' : ''}`} onClick={(e) => handleConfigSelect(e, idx)}>
                            {config.memory}
                        </button>
                    ))}
                </div>
            )}

            <p className="product-price">{Number(activeConfig.price).toLocaleString()} ₽</p>

            <button className={`add-to-cart-btn ${isAdded ? 'added' : ''}`} onClick={handleAddClick}>
                {isAdded ? 'ДОБАВЛЕНО В КОРЗИНУ' : 'В КОРЗИНУ'}
            </button>
        </div>
    );
});

export default ProductCard;