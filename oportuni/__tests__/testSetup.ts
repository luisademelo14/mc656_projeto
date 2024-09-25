process.env.MONGODB_URI = 'mocked_mongodb_uri';

const httpMocks = require('node-mocks-http');
const User = require('@/models/User');
const bcrypt = require('bcryptjs');

jest.mock('@/lib/mongodb'); // mocking the dbConnect function
jest.mock('@/models/User', () => {
  const mockUser = jest.fn();
  return mockUser;
});

User.findOne = jest.fn(); // mocking the findOne method
User.prototype.save = jest.fn(); // mocking the save method

export const createRequestResponse = (method: string, body: object) => {
  return httpMocks.createMocks({
    method,
    body,
  });
};

// Exportar outros métodos ou variáveis comuns que você precise
export { httpMocks, bcrypt, User };