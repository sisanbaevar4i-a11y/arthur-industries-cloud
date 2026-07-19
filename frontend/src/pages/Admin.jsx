import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const initialFormState = { id: null, name: '', slogan: '', category: '', badge: '', image: '', specs: '', description: '', delivery: '', configurations: [{ memory: '', price: 0 }] };
    const [formData, setFormData] = useState(initialFormState);

    const fetchProducts = async () => {
        try { const res = await fetch('https://arthur-industries-api3.onrender.com/api/products'); const data = await res.json(); setProducts(data); } catch (e) {}
    };
    useEffect(() => { fetchProducts(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleConfigChange = (index, field, value) => {
        const newConfigs = [...formData.configurations];
        newConfigs[index] = { ...newConfigs[index], [field]: field === 'price' ? Number(value) : value };
        setFormData({ ...formData, configurations: newConfigs });
    };

    const handleMemoryBlur = (index, value) => {
        const newConfigs = [...formData.configurations];
        let val = value.trim();
        if (/^\d+$/.test(val)) {
            val = `${val} ГБ`;
        }
        newConfigs[index].memory = val;
        setFormData({ ...formData, configurations: newConfigs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, specs: typeof formData.specs === 'string' ? formData.specs.split(',') : formData.specs };

        if (!payload.id) delete payload.id;

        const url = formData.id ? `https://arthur-industries-api3.onrender.com/api/products/${formData.id}` : 'https://arthur-industries-api3.onrender.com/api/products';
        const method = formData.id ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        setFormData(initialFormState); setIsEditing(false); fetchProducts();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить товар?')) return;
        await fetch(`https://arthur-industries-api3.onrender.com/api/products/${id}`, { method: 'DELETE' }); fetchProducts();
    };

    const labelStyle = { fontSize: '9px', color: '#5a9df8', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '15px', marginBottom: '-10px', zIndex: 1, position: 'relative', fontWeight: '700' };

    return (
        <div className="page-container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                <h2 className="main-category-header" style={{ marginBottom: 0, borderLeft: 'none', paddingLeft: 0, letterSpacing: '8px' }}>ТЕРМИНАЛ АДМИНИСТРАТОРА</h2>
                <button onClick={() => navigate('/')} className="pill-btn" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)' }}>
                    ← ВЫЙТИ В КАТАЛОГ
                </button>
            </div>

            <div className="admin-container">
                {isEditing ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 className="summary-title" style={{ margin: 0, padding: 0, border: 'none' }}>{formData.id ? 'РЕДАКТИРОВАТЬ' : 'НОВЫЙ ТОВАР'}</h3>
                            <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', color: '#555', border: 'none', cursor: 'pointer', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>✕ ОТМЕНА</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={labelStyle}>Название товара</label>
                                <input name="name" className="checkout-input" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={labelStyle}>Слоган</label>
                                <input name="slogan" className="checkout-input" value={formData.slogan} onChange={handleChange} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={labelStyle}>Категория</label>
                                <select
                                    name="category"
                                    className="checkout-input"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    style={{ cursor: 'pointer', color: formData.category ? '#fff' : 'rgba(255,255,255,0.3)' }}
                                >
                                    <option value="" disabled>ВЫБЕРИТЕ ИЗ СПИСКА...</option>
                                    <option value="iPhone" style={{ color: '#000' }}>iPhone</option>
                                    <option value="Google Pixel" style={{ color: '#000' }}>Google Pixel</option>
                                    <option value="MacBook" style={{ color: '#000' }}>MacBook</option>
                                    <option value="AirPods" style={{ color: '#000' }}>AirPods</option>
                                    <option value="Аксессуары" style={{ color: '#000' }}>Аксессуары</option>
                                    <option value="Dyson" style={{ color: '#000' }}>Dyson</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={labelStyle}>Бейдж (ФЛАГМАН, НОВИНКА)</label>
                                <input name="badge" className="checkout-input" value={formData.badge} onChange={handleChange} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                                <label style={labelStyle}>URL Фотографии</label>
                                <input name="image" className="checkout-input" value={formData.image} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Полное описание</label>
                                <textarea name="description" className="checkout-input" value={formData.description} onChange={handleChange} required rows="3"></textarea>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Характеристики (через запятую)</label>
                                <textarea name="specs" className="checkout-input" value={formData.specs} onChange={handleChange} required rows="2"></textarea>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Условия доставки</label>
                                <input name="delivery" className="checkout-input" value={formData.delivery} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '30px', marginTop: '10px' }}>
                            <h4 style={{ color: '#5a9df8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Память и Цена</h4>
                            {formData.configurations.map((cfg, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <label style={labelStyle}>Объем (напишите число)</label>
                                        <input
                                            className="checkout-input"
                                            style={{ marginBottom: 0 }}
                                            placeholder="Напр. 256 (ГБ добавится само)"
                                            value={cfg.memory}
                                            onChange={(e) => handleConfigChange(idx, 'memory', e.target.value)}
                                            onBlur={(e) => handleMemoryBlur(idx, e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <label style={labelStyle}>Цена (₽)</label>
                                        <input type="number" className="checkout-input" style={{ marginBottom: 0 }} value={cfg.price} onChange={(e) => handleConfigChange(idx, 'price', e.target.value)} required />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => setFormData({...formData, configurations: [...formData.configurations, {memory:'', price:0}]})} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>+ ДОБАВИТЬ ПАМЯТЬ</button>
                        </div>

                        <button type="submit" className="admin-submit">ИНТЕГРИРОВАТЬ</button>
                    </form>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                            <button onClick={() => { setIsEditing(true); setFormData(initialFormState); }} style={{ background: '#5a9df8', color: '#000', border: 'none', padding: '12px 25px', borderRadius: '30px', cursor: 'pointer', fontSize: '10px', letterSpacing: '2px', fontWeight: '700' }}>+ ДОБАВИТЬ ТОВАР</button>
                        </div>
                        {products.map(p => (
                            <div key={p.id} className="admin-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#0a0a0a', borderRadius: '10px', padding: '5px' }}>
                                        <img src={p.image} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
                                    </div>
                                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{p.name} <span style={{ color: '#5a9df8', fontSize: '12px', marginLeft: '15px' }}>{p.configurations[0]?.price} ₽</span></span>
                                </div>
                                <div style={{ display: 'flex', gap: '25px' }}>
                                    <button className="admin-action-btn" style={{ color: '#5a9df8' }} onClick={() => { setFormData({...p, specs: p.specs.join(', ')}); setIsEditing(true); }}>РЕДАКТИРОВАТЬ</button>
                                    <button className="admin-action-btn" style={{ color: '#ff3b30' }} onClick={() => handleDelete(p.id)}>УДАЛИТЬ</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}