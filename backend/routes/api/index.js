import { Router } from 'express';
import getProducts from './get-products.js';
import loginUser from './login-user.js';
import signUpUser from './signup-user.js';
import getProduct from './get-product.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
import verifyUser from './verify-user.js';
import getFeaturedProducts from './get-featured-products.js';
import getUserProfile from './get-user-profile.js';
import updateUserProfile from './update-user-profile.js';

const router = Router();

//Handling Retrival of Products
router.get('/products', getProducts);
router.route('/product/:productId?').get(getProduct);
router.get('/featured-products', getFeaturedProducts);

//Handling Auth Stuff
router.post('/login-user', loginUser);
router.post('/signup-user', signUpUser);
router.post('/verify-user', verifyUser);

//User Profile
router.get('/user-profile', getUserProfile);
router.post('/update-user-profile', updateUserProfile);

//Fallback route
router.use(catchAll);

export default router;
