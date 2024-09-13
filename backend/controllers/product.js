import Product from "../models/product.js";

export const getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return Promise.resolve(product);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject(error);
  }
};


//The $sample stage randomly selects limit number of documents 
export const getFeaturedProducts = async (limit = 3) => {
  try {
    const featuredProducts = await Product.aggregate([
      { $sample: { size: limit } }
    ]);
    return Promise.resolve(featuredProducts);
  } catch (error) {
    return Promise.reject(error);
  }
};