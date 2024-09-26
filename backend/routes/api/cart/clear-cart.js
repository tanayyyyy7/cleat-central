import { clearCart } from "../../../controllers/cartController.js";

export default async (req, res) => {
  const userId = req.userId;

  await clearCart(userId)
    .then(updatedCart => {
      res.json(updatedCart);
    })
    .catch(error => {
      res.status(500).json({ error: error.message || 'Error clearing cart' });
    });
};