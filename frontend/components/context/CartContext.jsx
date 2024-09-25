import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false, error: null });

  const fetchCart = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching cart' });
    }
  }, []);

  const cartAction = useCallback(async (method, endpoint, data = null, err = '') => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const config = {
        method,
        url: `/api/cart/${endpoint}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data
      };
      const response = await axios(config);
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error(`Error ${endpoint}:`, error);
      dispatch({ type: 'SET_ERROR', payload: `${err}` });
    }
  }, []);

  const addToCart = useCallback((item) => cartAction('post', 'add', item, 'Error adding item in the cart'), [cartAction]);
  const removeFromCart = useCallback((productId, size) => cartAction('delete', 'remove', { productId, size }, 'Error removing item'), [cartAction]);
  const updateQuantity = useCallback((productId, size, quantity) => cartAction('put', 'update', { productId, size, quantity }, 'Error updating quantity of the item'), [cartAction]);
  const clearCart = useCallback(() => cartAction('delete', 'clear', 'Error clearing the cart'), [cartAction]);

  const value = {
    cart: state.items,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};