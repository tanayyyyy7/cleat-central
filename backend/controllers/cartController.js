import Cart from "../models/cart.js";

//Get Cart
export const getCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};


//Add Item to Cart
export const addItemToCart = async (userId, productId, name, price, image, size, quantity) => {
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, size, quantity });
    }
    await Cart.findOneAndUpdate({ userId }, cart);

  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};

//Update Item Quantity
export const updateQuantity = async (userId, productId, size, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await Cart.findOneAndUpdate({ userId }, cart);
      return Promise.resolve(cart);
    } else {
      throw new Error("Item not found in cart");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};


export const removeItemFromCart = async (userId, productId, size) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => !(item.productId === productId && item.size === size)
    );

    await Cart.findOneAndUpdate({ userId }, cart);

    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await Cart.findOneAndUpdate({ userId }, cart);

    return Promise.resolve(cart);
  }catch (error) {
    return Promise.reject(error);
  }
};
