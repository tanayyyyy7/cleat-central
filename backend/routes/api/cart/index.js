// routes/api/cartRoutes.js
import { Router } from 'express';
import Cart from '../../../models/cart.js';
import addToCart from './addToCart.js';
import updateQuantity from './updateQuantity.js';
import accessCart from '../../../utils/accessCart.js';
import getCart from './getCart.js';

const router = Router();

// Get cart
router.get('/', accessCart, getCart);

// Add item to cart
router.post('/add', accessCart, addToCart)

// Update item quantity
router.put('/update', accessCart, updateQuantity);

// Remove item from cart
router.delete('/remove', accessCart, async (req, res) => {
  try {
    const { productId, size } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => !(item.productId.toString() === productId && item.size === size)
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

// Clear cart
router.delete('/clear', accessCart, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
});

export default router;