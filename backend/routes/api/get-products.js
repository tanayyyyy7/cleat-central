import { getAllProducts } from "../../controllers/product.js";

export default async (req, res) => {
  try{
    const products = await getAllProducts();
    res.json({
      products,
    });
  } catch (error) {
    res.status(500).json({error});
  }
}