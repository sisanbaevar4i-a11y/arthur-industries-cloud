require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Инициализация защищенного канала связи с БД
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Получить весь каталог
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Получить конкретный товар
app.get('/api/products/:id', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ message: 'Объект не найден.' });
    res.json(data);
});

// Создать новый товар через Админ Панель
app.post('/api/products', async (req, res) => {
    const payload = { ...req.body };
    delete payload.id; // База данных сгенерирует ID автоматически

    const { data, error } = await supabase.from('products').insert([payload]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// Обновить товар
app.put('/api/products/:id', async (req, res) => {
    const payload = { ...req.body };
    delete payload.id;

    const { data, error } = await supabase.from('products').update(payload).eq('id', req.params.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Удалить товар
app.delete('/api/products/:id', async (req, res) => {
    const { error } = await supabase.from('products').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

app.listen(PORT, () => console.log(`[SYSTEM] Облачное ядро запущено на порту: ${PORT}. Связь с Supabase установлена.`));