import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'tsx', 'ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/assets/',
    './jest.config.ts',
    './storybook',
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.{ts,tsx}', '!**/*.stories.{ts,tsx}'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(jpg|jpeg|png|gif|svg|css|webp)$': '<rootDir>/tests/file-mock.ts',
  },
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
    'uuid': require.resolve('uuid'),
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.test.json',
      isolatedModules: true,
    },
  },
};

export default config;
