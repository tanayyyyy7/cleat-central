import { getCart } from "../../../controllers/cartController.js";
import Cart from "../../../models/cart.js";

export default async (req, res) => {
    try {
      let userId = req.userId;
      const cart = await getCart(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Cart" });
    }
  }