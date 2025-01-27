module.exports = {
  verbose: true,
  testEnvironment: 'node',
  passWithNoTests: true,
  testRegex: '\\.(test|__tests__|__test__|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/**.(ts|tsx)', '!src/**/**.d.ts'],
  setupFiles: [],
  bail: true,
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'identity-obj-proxy'
  }
}
