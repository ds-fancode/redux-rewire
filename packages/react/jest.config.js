module.exports = {
  // setupFilesAfterEnv: ['./jest.mock.js'],
  // Only match files that strictly ends with __tests__.ts or spec.ts
  testRegex: '\\.(test|__tests__|spec)\\.tsx?$',
  testMatch: null,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/**.(ts|tsx)', '!src/**/**.d.ts'],
  setupFiles: [],
  testEnvironment: 'jsdom',
  bail: true,
  verbose: true,
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.mock.ts'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'identity-obj-proxy'
  }
}
