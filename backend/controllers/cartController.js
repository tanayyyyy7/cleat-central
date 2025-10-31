// controllers/cartController.js
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import mongoose from 'mongoose';

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

export const addItemToCart = async (userId, item) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = await Product.findById(item.productId);
    if (!product) {
      return Promise.reject("Product not found");
    }

    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.productId.equals(item.productId) && cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
     
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0].src : '',
        size: item.size,
        quantity: item.quantity
      });
    }

    await cart.save();
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const updateQuantity = async (userId, productId, size, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Promise.reject("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.equals(productId) && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return Promise.resolve(cart);
    } else {
      return Promise.reject("Item not found in cart");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItemFromCart = async (userId, productId, size) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Promise.reject("Cart not found");
    }

    cart.items = cart.items.filter(
      item => !(item.productId.equals(productId) && item.size === size)
    );

    await cart.save();
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject("Error removing item from cart");
  }
};

export const clearCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, we can consider it 'cleared' and create a new one.
      cart = new Cart({ userId, items: [] });
      await cart.save();
      return Promise.resolve(cart);
    }

    cart.items = [];
    await cart.save();

    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};