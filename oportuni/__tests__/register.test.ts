import { createRequestResponse, bcrypt, User } from './testSetup';
const register = require('@/src/pages/api/auth/password/register').default;

describe('Register API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1
  it('should return 400 if name, email, or password is missing', async () => {
    const { req, res } = createRequestResponse('POST', {
      name: '',
      email: 'newuser@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Médio',
      birthdate: '2000-01-01',
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'É necessário preencher o campo de name' });
  });

  // 2
  it('should return 401 if user already exists', async () => {
    const mockUser = { email: 'existing@example.com', password: 'password123', name: 'John Doe', nivelescolar: 'Ensino Superior', birthdate: '1995-05-15' };
    User.findOne.mockResolvedValue(mockUser);
    const { req, res } = createRequestResponse('POST', {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Superior',
      birthdate: '1995-05-15',
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Usuário já cadastrado' });
  });

  // 3
  it('should return 200 if registration is successful', async () => {
    User.findOne.mockResolvedValue(null);
    const { req, res } = createRequestResponse('POST', {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Médio',
      birthdate: '2000-01-01',
    });
    await register(req, res);
    expect(User).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New User',
      email: 'newuser@example.com',
      password: expect.any(String),
      nivelescolar: 'Ensino Médio',
      birthdate: '2000-01-01',
    }));
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Cadastro realizado com sucesso!' });
  });
});
