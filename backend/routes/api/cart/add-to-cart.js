import { addItemToCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
    try {
      const { productId, name, price, image, size, quantity } = req.body;
      const userId = req.userId;
      const updatedCart = await addItemToCart(userId, productId, name, price, image, size, quantity);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Error adding item to cart' });
    }
  };
  