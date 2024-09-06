import { Router } from 'express';
import getPosts from './get-posts.js';
import storePost from './store-post.js';
import loginUser from './login-user.js';
import signUpUser from './signup-user.js';
import getPost from './get-post.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
import verifyUser from './verify-user.js';

const router = Router();

router.get('/posts', getPosts);
router.route('/post/:postId?').get(getPost).post(protectApi, storePost);
router.post('/login', loginUser);
router.post('/signup-user', signUpUser);
router.post('/verify', verifyUser);
router.use(catchAll);

export default router;
