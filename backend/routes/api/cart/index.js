// routes/api/cartRoutes.js
import { Router } from 'express';
import Cart from '../../../models/cart.js';
import { getUserIDfromToken } from '../../../controllers/userController.js';
import addToCart from './addToCart.js';
import updateQuantity from './updateQuantity.js';

const router = Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  getUserIDfromToken(token)
    .then((userId) => {
      req.userId = userId;
      next();
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};

// Get cart
router.get('/', authenticateToken, addToCart);

// Add item to cart
router.post('/add', authenticateToken, addToCart)

// Update item quantity
router.put('/update', authenticateToken, updateQuantity);

// Remove item from cart
router.delete('/remove', authenticateToken, async (req, res) => {
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
router.delete('/clear', authenticateToken, async (req, res) => {
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