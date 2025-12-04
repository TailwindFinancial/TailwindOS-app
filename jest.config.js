/**
 * Jest Configuration
 * 
 * This file configures Jest testing framework for the Tailwind mobile app.
 * It sets up the testing environment, module mappings, and coverage thresholds.
 * 
 * Key Features:
 * - Uses jest-expo preset for React Native compatibility
 * - Maps module aliases to match TypeScript paths
 * - Enforces 70% code coverage thresholds
 * - Transforms TypeScript and JSX files
 * 
 * @see https://docs.expo.dev/develop/unit-testing/
 * @see https://jestjs.io/docs/configuration
 */

module.exports = {
  // Use jest-expo preset for Expo-specific configurations
  preset: 'jest-expo',
  
  // Setup files to run before tests (adds custom matchers)
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  
  // Map module aliases to their actual paths (must match tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  
  // Transform TypeScript and JavaScript files using babel-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  
  // File extensions to consider for module resolution
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Patterns to ignore during testing
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  
  // Collect coverage from these files
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
    '!src/**/__tests__/**/*',
  ],
  
  // Enforce code coverage thresholds
  coverageThresholds: {
    global: {
      branches: 70,    // 70% of code branches covered
      functions: 70,   // 70% of functions covered
      lines: 70,       // 70% of lines covered
      statements: 70,  // 70% of statements covered
    },
  },
};


