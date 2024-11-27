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
      birthdate: '01-01-2000',
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'É necessário preencher o campo de name' });
  });

  // 2
  it('should return 401 if user already exists', async () => {
    const mockUser = { email: 'existing@example.com', password: 'password123', name: 'John Doe', nivelescolar: 'Ensino Superior', birthdate: '15-05-1995' };
    User.findOne.mockResolvedValue(mockUser);
    const { req, res } = createRequestResponse('POST', {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Superior',
      birthdate: '15-05-1995',
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
      birthdate: '01-01-2000',
    });
    await register(req, res);
    expect(User).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New User',
      email: 'newuser@example.com',
      password: expect.any(String),
      nivelescolar: 'Ensino Médio',
      birthdate: '01-01-2000',
    }));
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Cadastro realizado com sucesso!' });
  });

  // 4 - Análise de Valor Limite: Data de ontem (válida)
  it('should return 200 if birthdate is yesterday', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toLocaleDateString('pt-BR').replace(/\//g, '-'); // Formato DD-MM-AAAA
    User.findOne.mockResolvedValue(null);
    const { req, res } = createRequestResponse('POST', {
      name: 'Valid User',
      email: 'validuser@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Médio',
      birthdate: formattedDate,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Cadastro realizado com sucesso!' });
  });

  // 5 - Análise de Valor Limite: Data de hoje (inválida)
  it('should return 400 if birthdate is today', async () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR').replace(/\//g, '-'); // Formato DD-MM-AAAA
    const { req, res } = createRequestResponse('POST', {
      name: 'Invalid User',
      email: 'invaliduser@example.com',
      password: 'password123',
      nivelescolar: 'Ensino Médio',
      birthdate: formattedDate,
    });
    await register(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Data de nascimento inválida' });
  });
  
 // 6 - Tabela de decisão: Senha fraca e data inválida
 it('should return 400 for valid email, weak password, and invalid date format', async () => {
  User.findOne.mockResolvedValue(null);
  const { req, res } = createRequestResponse('POST', {
    name: 'Test User',
    email: 'valid@example.com',
    password: '12345', // Fraca
    nivelescolar: 'Ensino Médio',
    birthdate: '01/01/2000', // Formato inválido
  });
  await register(req, res);
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({ message: 'A senha deve ter pelo menos 6 caracteres' });
});

// 7 - Tabela de decisão: Data de nascimento futura
it('should return 400 for valid email, strong password, and future date', async () => {
  User.findOne.mockResolvedValue(null);
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1); // Data futura
  const formattedDate = futureDate.toLocaleDateString('pt-BR').replace(/\//g, '-');
  
  const { req, res } = createRequestResponse('POST', {
    name: 'Test User',
    email: 'valid@example.com',
    password: 'StrongPass123!', // Forte
    nivelescolar: 'Ensino Superior',
    birthdate: formattedDate,
  });
  await register(req, res);
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({ message: 'Data de nascimento inválida' });
});

// 8 - Tabela de decisão: E-mail inválido e data inválida
it('should return 400 for invalid email, weak password, and invalid date format', async () => {
  const { req, res } = createRequestResponse('POST', {
    name: 'Test User',
    email: 'invalid-email', // Inválido
    password: '12345', // Fraca
    nivelescolar: 'Ensino Médio',
    birthdate: '01-32-2000', // Data inválida
  });
  await register(req, res);
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({ message: 'E-mail inválido' });
});

// 9 - Tabela de decisão: E-mail inválido e data futura
it('should return 400 for invalid email, strong password, and future date', async () => {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1); // Data futura
  const formattedDate = futureDate.toLocaleDateString('pt-BR').replace(/\//g, '-');

  const { req, res } = createRequestResponse('POST', {
    name: 'Test User',
    email: 'invalid-email', // Inválido
    password: 'StrongPass123!', // Forte
    nivelescolar: 'Ensino Médio',
    birthdate: formattedDate,
  });
  await register(req, res);
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({ message: 'E-mail inválido' });
  });
});