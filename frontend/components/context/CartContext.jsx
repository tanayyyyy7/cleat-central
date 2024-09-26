import React, { createContext, useContext, useReducer, useCallback } from 'react';
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

  const addToCart = useCallback(async (item) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.post('/api/cart/add', item, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error adding item to cart' });
    }
  }, []);

  const removeFromCart = useCallback(async (productId, size) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.delete('/api/cart/remove', { productId, size }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error removing item from cart' });
    }
  }, []);

  const updateQuantity = useCallback(async (productId, size, quantity) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.put('/api/cart/update', { productId, size, quantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error updating item quantity' });
    }
  }, []);

  const clearCart = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.delete('/api/cart/clear', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: 'SET_CART', payload: response.data.items });
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error clearing cart' });
    }
  }, []);

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