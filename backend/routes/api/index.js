import { Router } from 'express';
import getPosts from './get-posts.js';
import storePost from './store-post.js';
import loginUser from './login-user.js';
import signUpUser from './signup-user.js';
import getPost from './get-post.js';
import deletePost from './delete-post.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
const router = Router();

router.get('/posts', getPosts);
router.route('/post/:postId?').get(getPost).post(protectApi, storePost).delete(protectApi, deletePost);
router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.use(catchAll);

export default router;
