import { updateQuantity } from "../../../controllers/cartController.js";

export default async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const updatedCart = await updateQuantity(req.userId, productId, size, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};