import { createRequestResponse, bcrypt, User } from './testSetup';
const register = require('@/src/pages/api/auth/password/register').default;

describe('Register API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1
  it('should return 400 if email or password is missing', async () => {
    const { req, res } = createRequestResponse('POST', {
      email: '',
      password: '',
      age: 25,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'É necessário preencher os campos de email e senha' });
  });

  // 2
  it('should return 401 if user already exists', async () => {
    const mockUser = { email: 'existing@example.com', password: 'password123', age: '20' };
    User.findOne.mockResolvedValue(mockUser);
    const { req, res } = createRequestResponse('POST', {
      email: 'existing@example.com',
      password: 'password123',
      age: 25,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Usuário já cadastrado' });
  });

  // 3
  it('should return 200 if registration is successful', async () => {
    User.findOne.mockResolvedValue(null);
    const { req, res } = createRequestResponse('POST', {
      email: 'newuser@example.com',
      password: 'password123',
      age: 25,
    });
    await register(req, res);
    expect(User).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: expect.any(String),
      age: 25,
    });
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Cadastro realizado com sucesso!' });
  });

});