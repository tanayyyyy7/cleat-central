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

export const filterProducts = async (surfaceType, shoeHeight) => {
  try {
    let query = {};

    if (surfaceType) {
      query.surfaceType = surfaceType;
    }

    if (shoeHeight) {
      query.shoeHeight = shoeHeight;
    }

    if (Object.keys(query).length === 0) {
      throw new Error('At least one parameter (surfaceType or shoeHeight) is required');
    }

    const filteredProducts = await Product.find(query);

    if (filteredProducts.length === 0) {
      throw new Error('No products found for the given parameters');
    }

    return Promise.resolve(filteredProducts);
  } catch (error) {
    return Promise.reject(error);
  }
};