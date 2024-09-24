import Cart from "../../../models/cart.js";

export default async (req, res) => {
    try {
      let cart = await Cart.findOne({ userId: req.userId });
      
      if (!cart) {
        cart = new Cart({ userId: req.userId, items: [] });
        await cart.save();
      }
      
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }