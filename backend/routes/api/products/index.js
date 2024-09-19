import { Router } from 'express';
import getProducts from './catalogue.js';
import getProduct from './product.js';
import getFeaturedProducts from './featured.js';
import getFilteredProducts from './filtered.js';
import catchAll from '../catch-all.js';


const router = Router();

router.get('/catalogue', getProducts);
router.get('/product/:productId?', getProduct);
router.get('/featured', getFeaturedProducts);
router.get('/filtered', getFilteredProducts);

//Fallback route
router.use(catchAll);

export default router;