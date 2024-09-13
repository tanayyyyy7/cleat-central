import { getFeaturedProducts } from "../../controllers/product.js";

export default async (req, res) => {
  try{
    const featuredProducts = await getFeaturedProducts();
    res.json({
      featuredProducts,
    });
  } catch (error) {
    res.status(500).json({error});
  }
}