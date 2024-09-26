module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Para suportar imports com '@/'
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/__tests__/testSetup.ts'],
};
