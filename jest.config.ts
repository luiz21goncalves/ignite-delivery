import path from 'path';

export default {
  rootDir: path.resolve(__dirname),
  displayName: 'unit:tests',
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*UseCase.ts'],
  coverageDirectory: 'coverage/unit',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*UseCase.spec.ts'],
};
