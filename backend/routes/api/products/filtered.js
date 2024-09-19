import { filterProducts } from '../../../controllers/productController.js';

export default async (req, res) => {
    const { surfaceType, shoeHeight } = req.query;
    try {
        const filteredProducts = await filterProducts(surfaceType, shoeHeight);
        res.status(200).json(filteredProducts);
    } catch (error) {
        if (error.message === 'At least one parameter (surfaceType or shoeHeight) is required') {
            res.status(400).json({ message: error.message });
        } else if (error.message === 'No products found for the given parameters') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error while filtering products' });
        }
    }
};