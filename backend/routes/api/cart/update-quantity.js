import { updateQuantity } from "../../../controllers/cartController.js";

export default async (req, res) => {
  const { productId, size, quantity } = req.body;
  const userId = req.userId;

  await updateQuantity(userId, productId, size, quantity)
    .then(updatedCart => {
      res.json(updatedCart);
    })
    .catch(error => {
      res.status(500).json({ error: error.message || 'Error updating quantity' });
    });
};