import Cart from "../../../models/cart.js";

export default async (req, res) => {
    try {
      const { productId, name, price, image, size, quantity } = req.body;
      
      let cart = await Cart.findOne({ userId: req.userId });
      
      if (!cart) {
        cart = new Cart({ userId: req.userId, items: [] });
        await cart.save();
      }
  
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId && item.size === size
      );
  
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, image, size, quantity });
        
      }
      
     // await cart.save();
     
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error adding item to cart' });
    }
  };
  