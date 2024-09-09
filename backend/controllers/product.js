import Product from "../models/product.js";

export const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return Promise.resolve(product);
  } catch (error) {
    return Promise.reject(error);
  }
};