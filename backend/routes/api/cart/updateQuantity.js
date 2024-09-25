import { updateQuantity } from "../../../controllers/cartController.js";

export default async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const result = await updateQuantity(req.userId, productId, size, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};