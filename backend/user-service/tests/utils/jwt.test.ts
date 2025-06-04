import { generateToken } from '../../src/utils/jwt';

describe('generateToken', () => {
  it('should generate a valid JWT token with user payload', () => {
    const user = { id: 1, email: 'test@example.com', role: 'user' };
    const token = generateToken(user);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // JWT has 3 parts
  });

  it('should throw if JWT_SECRET is not set', () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    const user = { id: 1, email: 'test@example.com', role: 'user' };
    expect(() => generateToken(user)).toThrow();
    process.env.JWT_SECRET = originalSecret;
  });
});