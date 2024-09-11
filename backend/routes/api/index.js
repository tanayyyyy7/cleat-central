import { Router } from 'express';
import getProducts from './get-products.js';
import storePost from './store-post.js';
import loginUser from './login-user.js';
import signUpUser from './signup-user.js';
import getProduct from './get-product.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
import verifyUser from './verify-user.js';

const router = Router();

router.get('/products', getProducts);
router.route('/product/:productId?').get(getProduct);
router.post('/login', loginUser);
router.post('/signup-user', signUpUser);
router.post('/verify-user', verifyUser);
router.use(catchAll);

export default router;
