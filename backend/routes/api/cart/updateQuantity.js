import Cart from "../../../models/cart.js";

export default async (req, res) => {
    try {
      const { productId, size, quantity } = req.body;
      const cart = await Cart.findOne({ userId: req.userId });
        
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const itemIndex = cart.items.findIndex(
        item => item._id === productId && item.size === size
      );

      //Item.productID is undefined
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await Cart.findOneAndUpdate({ userId: req.userId }, cart); 
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Item not found in cart' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }