import { Router } from 'express';
import { signUpUser, loginUser, logoutUser, refreshToken, checkAuth } from "../../../controllers/userController.js";
import authMiddleware from '../../../utils/authMiddleware.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const result = await signUpUser(req.body, res);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req.body, res);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  try {
    const result = await refreshToken(req.cookies.refreshToken, res);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const result = await logoutUser(req.userId, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/check-auth', authMiddleware, async (req, res) => {
  try {
    const result = await checkAuth(req.cookies.token);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message, isAuthenticated: false });
  }
});

export default router;