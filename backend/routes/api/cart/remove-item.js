import { removeItemFromCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.userId;

  await removeItemFromCart(userId, productId, size)
    .then(updatedCart => {
      res.json(updatedCart);
    })
    .catch(error => {
      res.status(500).json({ error: error.message || 'Error removing item from cart' });
    });
};
