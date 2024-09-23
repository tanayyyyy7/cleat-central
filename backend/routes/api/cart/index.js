// routes/api/cartRoutes.js
import { Router } from 'express';
import Cart from '../../../models/cart.js';
import jwt from 'jsonwebtoken';
import { getUserIDfromToken } from '../../../controllers/userController.js';

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
      res.status(401).json({ error: err });
    });
};

// Get cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, name, price, image, size, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, size, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Update item quantity
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating item quantity' });
  }
});

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