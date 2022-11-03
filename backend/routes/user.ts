import { Router } from "express";
import { authenticateUser, signIn, signUp } from "../controllers/user";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get('/authenticate-user', authenticateUser)

export default router;
