import { Router } from 'express';
import getUserProfile from './get-user-profile.js';
import updateUserProfile from './update-user-profile.js';
import catchAll from '../catch-all.js';
import authMiddleware from '../../../utils/authMiddleware.js';

const router = Router();

//acts as /api/user-profile/ endpoint
router.route('/').get(authMiddleware, getUserProfile).post(authMiddleware, updateUserProfile);

//Fallback route
router.use(catchAll);

export default router;