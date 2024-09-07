import { getProduct } from "../../controllers/product.js";

export default async (req, res) => {
  try {
    let productId = req.params.productId;
    const product = await getProduct(productId);
    res.json({
      product
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
