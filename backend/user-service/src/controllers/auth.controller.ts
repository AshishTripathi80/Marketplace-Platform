import { Request, Response } from "express";
import { authService } from "../services/auth.service";

class AuthController {

    async register(req: Request, res: Response) {
        try{
            const {name, email, password, role}= req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Name, email, and password are required" });
            }
            const user= await authService.register(name,email, password, role);
            res.status(201).json({ message: "User registered successfully", user });

        }catch (error){
            res.status(400).json({ message: "Error registering user", error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password}= req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
            const token = await authService.login(email, password);
            res.status(200).json({ message: "Login successful", token });
        }catch (error) {
            res.status(400).json({ message: "Error logging in", error });
        }
    }
}

export const authController = new AuthController();
// This controller handles user registration and login