import { createRequestResponse, bcrypt, User } from './testSetup';
const login = require('@/pages/api/auth/password/login').default;

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1
  it('should return 400 if email or password is missing', async () => {
    const { req, res } = createRequestResponse('POST', {
      email: '',    // Missing email
      password: '', // Missing password
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email and password are required' });
  });

  // 2
  it('should return 400 if user does not exist', async () => {
    User.findOne.mockResolvedValue(null);
    const { req, res } = createRequestResponse('POST', {
      email: 'test@example.com',
      password: 'password123',
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  // 3
  it('should return 400 if password is invalid', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com', password: bcrypt.hashSync('password123', 10) });
    const { req, res } = createRequestResponse('POST', {
      email: 'test@example.com',
      password: 'wrongpassword',
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(402);
    expect(res._getJSONData()).toEqual({ message: 'Invalid password' });
  });

  // 4
  it('should return 200 if login is successful', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com', password: bcrypt.hashSync('password123', 10) });
    const { req, res } = createRequestResponse('POST', {
      email: 'test@example.com',
      password: 'password123',
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Login successful' });
  });

});