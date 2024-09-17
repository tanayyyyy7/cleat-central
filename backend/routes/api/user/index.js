import { Router } from 'express';
import logInUser from './login.js';
import signUpUser from './signup.js';
import verifyUser from './verify.js';
import catchAll from '../catch-all.js';

const router = Router();

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.post('/verify', verifyUser);

//Fallback route
router.use(catchAll);

export default router;