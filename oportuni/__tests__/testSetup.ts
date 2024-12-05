process.env.MONGODB_URI = 'mocked_mongodb_uri';

const httpMocks = require('node-mocks-http');
const User = require('@/src/models/User');
const Project = require('@/src/models/Project');
const bcrypt = require('bcryptjs');

jest.mock('@/src/lib/mongodb');         // mocking the dbConnect function

jest.mock('@/src/models/User', () => {  // mocking the User model
  const mockUser = jest.fn();
  return mockUser;
});
User.findOne = jest.fn();         // mocking the findOne method
User.prototype.save = jest.fn();  // mocking the save method

jest.mock('@/src/models/Project', () => {  // mocking the Project model
  const mockProject = jest.fn();
  return mockProject;
});
Project.find = jest.fn();         // mocking the find method
Project.findOne = jest.fn();      // mocking the findOne method

export const createRequestResponse = (method: string, body: object = {}, query: object = {}) => {
  return httpMocks.createMocks({
    method,
    body,
    query,
  });
};

export { httpMocks, bcrypt, User, Project };