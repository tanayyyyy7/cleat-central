import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try{
  let { email, name, password } = req.body;
  const { user, token } = await signUpUser({ name, email, password});
  res.json({ user, token });
  }catch(error){
    res.status(400).json({ error });
  }
};
