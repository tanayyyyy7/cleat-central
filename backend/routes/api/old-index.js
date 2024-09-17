import { Router } from 'express';
import getProducts from './products/catalogue.js';
import loginUser from './user/login.js';
import signUpUser from './user/signup.js';
import getProduct from './products/product.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
import verifyUser from './user/verify.js';
import getFeaturedProducts from './products/featured.js';
import getUserProfile from './userProfile/get-user-profile.js';
import updateUserProfile from './userProfile/update-user-profile.js';

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
