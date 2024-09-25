import { clearCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
    try {
      const userId = req.userId;
      const updatedCart = await clearCart(userId);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Error clearing cart' });
    }
  }