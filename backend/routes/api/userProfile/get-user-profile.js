import { getUserProfile } from "../../../controllers/userController.js";

export default async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.userId);
    res.status(200).json({
      userProfile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};