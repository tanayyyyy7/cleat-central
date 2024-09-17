import { Router } from 'express';
import getUserProfile from './get-user-profile.js';
import updateUserProfile from './update-user-profile.js';
import catchAll from '../catch-all.js';

const router = Router();

router.route('/user-profile').get(getUserProfile).post(updateUserProfile);

//Fallback route
router.use(catchAll);

export default router;