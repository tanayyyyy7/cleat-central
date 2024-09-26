import { removeItemFromCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
    try {
        const { productId, size } = req.body;
        const userId = req.userId;
        const updatedCart = await removeItemFromCart(userId, productId, size);
        res.json(updatedCart);
    } catch (error) {
      res.status(501).json({ error: 'Error removing item from cart' });
    }
  };
  