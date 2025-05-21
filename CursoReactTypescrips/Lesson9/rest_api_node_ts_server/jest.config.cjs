/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json', 'node'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
  },
};

module.exports = config;
