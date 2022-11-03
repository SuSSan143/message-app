import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
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

    const payload = {
      username: registeredUser.username,
      isAuthenticated: true,
    };

    sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
      if (err) return res.status(400).json({ error: err });
      return res.json({
        token: `Bearer ${token}`,
        username: registeredUser.username,
      });
    });
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

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers["x-access-token"]) {
      const token = (req.headers["x-access-token"] as string).split(" ")[1];
      if (token) {
        verify(token, "secret", (err, decoded: any) => {
          if (err)
            return res
              .status(400)
              .json({
                error: "Failed to authenticate",
                isAuthenticated: false,
              });

          return res.json({
            username: decoded?.username,
            isAuthenticated: decoded?.isAuthenticated,
          });
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

export { signIn, signUp, authenticateUser };
