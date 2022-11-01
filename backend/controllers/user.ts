import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/user";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username } = req.body;

    if (!password || !username)
      return res.status(400).json({ error: "Fields cannot be empty" });

    const registeredUser = await User.findOne({ username });

    if (!registeredUser)
      return res.status(400).json({ error: "User not found" });

    const isPasswordCorrect = compare(password, registeredUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Incorrect password" });

    return res.json({ user: registeredUser.username, id: registeredUser._id });
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Fields cannot be empty" });

    const registeredUser = await User.findOne({ username });

    if (registeredUser)
      return res.status(400).json({ error: "User already exist" });

    const hashedPassword = await hash(password, 12);

    const newUser = new User({ username, password: hashedPassword });
    const data = await newUser.save();

    return res.json({ username, id: data._id });
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

export { signIn, signUp };
