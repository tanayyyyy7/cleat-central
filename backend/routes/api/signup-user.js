import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    let { email, firstName, lastName, password } = req.body;
    const { user, token } = await signUpUser({ firstName, lastName, email, password });
    //store the token in a http cookie
    res.cookie("token", token, { httpOnly: true });
    //send the user and token back to the client
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
