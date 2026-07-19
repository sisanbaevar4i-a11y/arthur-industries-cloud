import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product, configuration) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item.id === product.id && item.selectedConfig.memory === configuration.memory);
            if (existing) {
                return prevCart.map(item => (item.id === product.id && item.selectedConfig.memory === configuration.memory) ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevCart, { ...product, selectedConfig: configuration, quantity: 1 }];
        });
    };

    const updateQuantity = (id, memory, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id && item.selectedConfig.memory === memory) {
                return { ...item, quantity: item.quantity + delta };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
export const useCart = () => useContext(CartContext);