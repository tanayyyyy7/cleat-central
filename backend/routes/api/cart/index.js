// routes/api/cartRoutes.js
import { Router } from 'express';
import addToCartHandler from './add-to-cart.js';
import updateQuantityHandler from './update-quantity.js';
import accessCart from '../../../utils/accessCart.js';
import getCartHandler from './get-cart.js';
import removeItemHandler from './remove-item.js';
import clearCartHandler from './clear-cart.js';
import catchAll from '../catch-all.js';

const router = Router();

// Get cart
router.get('/', accessCart, getCartHandler);

// Add item to cart
router.post('/add', accessCart, addToCartHandler)

// Update item quantity
router.put('/update', accessCart, updateQuantityHandler);

// Remove item from cart
router.delete('/remove', accessCart, removeItemHandler);

// Clear cart
router.delete('/clear', accessCart, clearCartHandler );

//Fallback route
router.use(catchAll);

export default router;