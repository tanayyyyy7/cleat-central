import { loginUser } from '../../../controllers/userController.js';

export default async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser({ email, password });
        //store the token in a http cookie
        res.cookie('token', token, {
            httpOnly: true
            //sameSite: 'strict',
        });
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error });
    }
};