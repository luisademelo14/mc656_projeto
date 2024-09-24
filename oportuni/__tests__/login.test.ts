process.env.MONGODB_URI = 'mocked_mongodb_uri';
// __tests__/login.test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/auth/password/login';
import User from '@/models/User';
import bcrypt from 'bcryptjs';


// Mock database connection and models
jest.mock('@/lib/mongodb');

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email or password is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: '', // Missing email
        password: '', // Missing password
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email and password are required' });
  });

  it('should return 400 if user does not exist', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null); // Mock findOne to return null

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  it('should return 400 if password is invalid', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' });

    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false); // Simulate invalid password

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  it('should return 200 if login is successful', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' });

    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true); // Simulate valid password

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Login successful' });
  });
});
