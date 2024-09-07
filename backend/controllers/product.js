import Product from "../models/product.js";

export const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async () => {
  try {
    const product = await Product.findById(req.params.id);
    return Promise.resolve(product);
  } catch (error) {
    return Promise.reject(error);
  }
};