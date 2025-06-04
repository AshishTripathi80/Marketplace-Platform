import { User } from '../models/user.model';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt';
class AuthService {

    public async register (name: string, email: string, password:string, role: string = 'customer') {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user= await User.create({name, email, password: hashPassword, role});
        return user;
    }

    public async login (email: string, password: string) {
        const user= await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.getDataValue('password'));
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token= generateToken(user);
        return token;
    }
}

export const authService = new AuthService();
// This service handles user registration and login