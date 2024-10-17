import { createRequestResponse, User } from './testSetup';
const recover = require('@/src/pages/api/auth/password/recover').default;

describe('Recover API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1
  it('should return 400 if email is missing', async () => {
    const { req, res } = createRequestResponse('POST', {
      email: '',
    });
    await recover(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email inválido' });
  });

  // 2
  it('should return 401 if user does not exist', async () => {
    User.findOne.mockResolvedValue(null);
    const { req, res } = createRequestResponse('POST', {
      email: 'nonexistent@example.com',
    });
    await recover(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Por favor, insira o email utilizado para se cadastrar' });
  });

  // 3
  it('should return 200 if recovery is successful', async () => {
    const mockUser = { email: 'existing@example.com', password: 'password123', age: '20' };
    User.findOne.mockResolvedValue(mockUser);
    const { req, res } = createRequestResponse('POST', {
      email: 'existing@example.com',
    });
    await recover(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: `A senha do usuário é: ${mockUser.password}` });
  });
});
