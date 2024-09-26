import { addItemToCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
  const { productId, name, price, image, size, quantity } = req.body;
  const userId = req.userId;

  addItemToCart(userId, { productId, name, price, image, size, quantity })
    .then(updatedCart => {
      res.json(updatedCart);
    })
    .catch(error => {
      res.status(500).json({ error: error.message || 'Error adding item to cart' });
    });
};