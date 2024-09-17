import { Router } from 'express';
import getUserProfile from './get-user-profile.js';
import updateUserProfile from './update-user-profile.js';
import catchAll from '../catch-all.js';

const router = Router();

//acts as /api/user-profile/ endpoint
router.route('/').get(getUserProfile).post(updateUserProfile);

//Fallback route
router.use(catchAll);

export default router;