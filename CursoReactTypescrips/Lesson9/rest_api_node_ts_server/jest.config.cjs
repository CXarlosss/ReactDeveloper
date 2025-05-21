// jest.config.cjs (¡NUEVO NOMBRE!)
const { pathsToModuleNameMapper } = require('ts-jest'); // <-- Usa require
const tsconfig = require('./tsconfig.json'); // <-- Usa require (y no necesita assert { type: "json" } aquí)

/** @type {import('jest').Config} */
const config = { // Define como una constante
  preset: 'ts-jest/presets/default-esm', // Este preset sigue siendo para la transpilación de tus TESTS a ESM
  // transform: { // Si lo tenías, asegúrate de que también use config compatible con CJS
  //   '^.+\\.ts$': ['ts-jest', { useESM: true }],
  // },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json', 'node'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
  },
};

module.exports = config; // <-- Exporta con CommonJS