// routes/api/cartRoutes.js
import { Router } from 'express';
import addToCartHandler from './add-to-cart.js';
import updateQuantityHandler from './update-quantity.js';
import getCartHandler from './get-cart.js';
import removeItemHandler from './remove-item.js';
import clearCartHandler from './clear-cart.js';
import catchAll from '../catch-all.js';
import authMiddleware from '../../../utils/authMiddleware.js';

const router = Router();

// Get cart
router.get('/', authMiddleware, getCartHandler);

// Add item to cart
router.post('/add', authMiddleware, addToCartHandler)

// Update item quantity
router.put('/update', authMiddleware, updateQuantityHandler);

// Remove item from cart
router.delete('/remove', authMiddleware, removeItemHandler);

// Clear cart
router.delete('/clear', authMiddleware, clearCartHandler );

//Fallback route
router.use(catchAll);

export default router;