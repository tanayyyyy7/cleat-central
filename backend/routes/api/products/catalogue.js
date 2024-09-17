import { getAllProducts } from "../../../controllers/productController.js";

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