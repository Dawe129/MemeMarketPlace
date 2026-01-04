import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...state, { ...action.payload, count: 1 }];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'DECREASE_ITEM':
      const itemToDecrease = state.find(item => item.id === action.payload);
      if (itemToDecrease?.count > 1) {
        return state.map(item =>
          item.id === action.payload ? { ...item, count: item.count - 1 } : item
        );
      }
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [storedCart, setStoredCart] = useLocalStorage('cart', []);

  useEffect(() => setStoredCart(cart), [cart, setStoredCart]);

  const addItem = (meme) => dispatch({ type: 'ADD_ITEM', payload: meme });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const decreaseItem = (id) => dispatch({ type: 'DECREASE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.rating * 25 * item.count), 0).toFixed(2);

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{
      cart, addItem, removeItem, decreaseItem, clearCart, getTotalPrice, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
