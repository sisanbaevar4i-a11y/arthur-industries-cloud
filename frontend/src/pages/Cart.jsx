import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, updateQuantity } = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + (item.selectedConfig.price * item.quantity), 0);

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#fff',
        padding: '18px 25px',
        borderRadius: '16px',
        marginBottom: '15px',
        fontSize: '13px',
        outline: 'none',
        width: '100%',
        transition: 'all 0.3s ease',
        letterSpacing: '0.5px'
    };

    const containerStyle = {
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '30px'
    };

    return (
        <div className="page-container">
            <h2 className="main-category-header" style={{ letterSpacing: '8px', wordSpacing: '4px' }}>
                ОФОРМЛЕНИЕ ЗАКАЗА
            </h2>

            {cart.length > 0 ? (
                <div className="cart-page-layout">
                    <div className="cart-items-list">
                        {cart.map((item, idx) => (
                            <div key={idx} style={{...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '90px', height: '90px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div className="cart-item-info" style={{ marginLeft: '25px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', letterSpacing: '0.5px' }}>{item.name}</div>
                                        <div style={{ color: '#5a9df8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' }}>{item.selectedConfig.memory}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '30px', padding: '8px 20px' }}>
                                        <button onClick={() => updateQuantity(item.id, item.selectedConfig.memory, -1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>-</button>
                                        <span style={{ fontSize: '14px', width: '20px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.selectedConfig.memory, 1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>+</button>
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: '400', width: '130px', textAlign: 'right' }}>
                                        {(item.selectedConfig.price * item.quantity).toLocaleString()} ₽
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{...containerStyle, borderRadius: '28px', position: 'sticky', top: '120px'}}>
                        <h3 style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '25px', marginBottom: '35px', fontWeight: '600' }}>
                            Ваша корзина
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                            <span>Товары ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                            <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                            <span>Доставка</span>
                            <span style={{color: '#5a9df8'}}>Рассчитывается</span>
                        </div>

                        <div>
                            <input type="text" style={inputStyle} placeholder="Имя получателя" onFocus={(e) => { e.target.style.borderColor = '#5a9df8'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.target.style.background = 'rgba(255, 255, 255, 0.03)'; }} />
                            <input type="text" style={inputStyle} placeholder="Номер телефона" onFocus={(e) => { e.target.style.borderColor = '#5a9df8'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.target.style.background = 'rgba(255, 255, 255, 0.03)'; }} />
                            <input type="text" style={inputStyle} placeholder="Адрес доставки" onFocus={(e) => { e.target.style.borderColor = '#5a9df8'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.target.style.background = 'rgba(255, 255, 255, 0.03)'; }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '24px', fontWeight: '400', color: '#fff' }}>
                            <span>ИТОГО:</span>
                            <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>

                        <button className="checkout-btn" onClick={() => alert('Заказ передан в обработку.')}>
                            ПОДТВЕРДИТЬ ЗАКАЗ
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px', color: '#555' }}>
                    <p style={{ fontSize: '14px', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px' }}>Ваша корзина пуста</p>
                    <Link to="/" className="pill-btn" style={{ padding: '15px 40px', fontSize: '12px' }}>ВЕРНУТЬСЯ В КАТАЛОГ</Link>
                </div>
            )}
        </div>
    );
}