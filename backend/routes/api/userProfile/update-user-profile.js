import { updateUserProfile } from "../../../controllers/userController.js";

export default async (req, res) => {
  try {
    const editedDetails = req.body;
    const updatedUser = await updateUserProfile(req.userId, editedDetails);
    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};