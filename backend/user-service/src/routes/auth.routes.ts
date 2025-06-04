import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate } from '../middlewares/auth.middleware';


const authRouter = Router();
// Route for user registration
authRouter.post("/register", authController.register);
// Route for user login 
authRouter.post("/login", authController.login);

authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});
// Export the auth router   
export default authRouter;
// This file defines the routes for user authentication, including registration and login