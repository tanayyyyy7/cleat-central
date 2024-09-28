import { checkAuth } from "../controllers/userController.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const result = await checkAuth(token);
    if (result.isAuthenticated) {
      req.userId = result.user.id;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;