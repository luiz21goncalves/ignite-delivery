import rootConfig from '../jest.config';

export default {
  ...rootConfig,
  displayName: 'integration:tests',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/modules/**/dtos/*.ts',
    '!<rootDir>/src/modules/**/repositories/I*Repository.ts',
    '!<rootDir>/src/modules/**/repositories/in-memory/*.ts',
    '!<rootDir>/src/providers/**/dtos/*.ts',
    '!<rootDir>/src/providers/**/in-memory/*.ts',
    '!<rootDir>/**/*.spec.ts',
    '!<rootDir>/src/@types/**',
  ],
  coverageDirectory: 'coverage/integration',
  testMatch: ['**/*Controller.spec.ts'],
};
