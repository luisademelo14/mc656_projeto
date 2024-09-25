import { createRequestResponse, bcrypt, User } from './testSetup';
const register = require('@/pages/api/auth/password/register').default;

describe('Register API', () => {
beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
});

it('should return 400 if email or password is missing', async () => {
    const { req, res } = createRequestResponse('POST', {
        email: '',
        password: '', // Senha ausente
        age: 25,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email and password are required' });
});

it('should return 401 if user already exists', async () => {
    User.findOne.mockResolvedValue({ email: 'existing@example.com' }); // Simula que o usuário já existe
    const { req, res } = createRequestResponse('POST', {
        email: 'existing@example.com',
        password: 'password123',
        age: 25,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'User already exists' });
});

it('should return 200 if registration is successful', async () => {
    User.findOne.mockResolvedValue(null); // Simula que o usuário não existe
    User.prototype.save.mockResolvedValueOnce(true); // Simula um save bem-sucedido
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
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Signup successful!' });
});
});