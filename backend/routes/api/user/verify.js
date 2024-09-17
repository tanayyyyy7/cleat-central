import { verifyToken } from '../../../controllers/userController.js';
export default async (req, res) => {
    try {
        const { token } = req.body;
        //verify the token
        await verifyToken({ token });
        res.status(200).json({ message: 'User verified' });
    } catch (error) {
        res.status(400).json({ error });
    }
};