import { getUserProfile } from "../../../controllers/userController.js";

export default async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userProfile = await getUserProfile(token);
    res.status(200).json({
      userProfile,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};