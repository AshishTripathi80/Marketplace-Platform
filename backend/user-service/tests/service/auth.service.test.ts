import { authService } from '../../src/services/auth.service';
import { User } from '../../src/models/user.model';
import bcrypt from 'bcryptjs';

jest.mock('../../src/models/user.model');
jest.mock('bcryptjs');

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'customer',
  password: 'hashedpassword',
  getDataValue: (key: string) => {
    if (key === 'password') return 'hashedpassword';
    return undefined;
  },
};

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a new user if not exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      const user = await authService.register('Test User', 'test@example.com', 'password');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(User.create).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'hashedpassword', role: 'customer' });
      expect(user).toEqual(mockUser);
    });

    it('should throw if user already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      await expect(authService.register('Test User', 'test@example.com', 'password')).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should return token if credentials are valid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const token = await authService.login('test@example.com', 'password');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
      expect(typeof token).toBe('string');
    });

    it('should throw if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      await expect(authService.login('notfound@example.com', 'password')).rejects.toThrow('User not found');
    });

    it('should throw if password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(authService.login('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid password');
    });
  });
});