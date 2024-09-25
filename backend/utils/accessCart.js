import { getUserIDfromToken } from "../controllers/userController.js";

const accessCart = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  await getUserIDfromToken(token)
        .then((userId) => {
        req.userId = userId;
        next();
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
};

export default accessCart;