process.env.MONGODB_URI = 'mocked_mongodb_uri';

const httpMocks = require('node-mocks-http');
const login = require('@/pages/api/auth/password/login').default;
const User = require('@/models/User');
const bcrypt = require('bcryptjs');


jest.mock('@/lib/mongodb'); // mocking the dbConnect function
jest.mock('@/models/User', () => ({
    findOne: jest.fn(),     // mocking the findOne method
}));


describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('should return 400 if email or password is missing', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        email: '',      // Missing email
        password: '',   // Missing password
      },
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email and password are required' });
  });


  it('should return 400 if user does not exist', async () => {
    User.findOne.mockResolvedValue(null); // Mock findOne to return null
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        email: 'test2@example.com',
        password: 'password123',
      },
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });


  it('should return 400 if password is invalid', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com', password: bcrypt.hashSync('password123', 10) });
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(402);
    expect(res._getJSONData()).toEqual({ message: 'Invalid password' });
  });


  it('should return 200 if login is successful', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com', password: bcrypt.hashSync('password123', 10) });
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
    await login(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Login successful' });
  });


});