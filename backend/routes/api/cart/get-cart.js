import { getCart } from "../../../controllers/cartController.js";
import Cart from "../../../models/cart.js";

export default async (req, res) => {
  const userId = req.userId;

  await getCart(userId)
    .then(cart => {
      res.json(cart);
    })
    .catch(error => {
      res.status(500).json({ error: error.message || 'Error fetching Cart' });
    });
};