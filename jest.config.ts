import type {Config} from 'jest'

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  passWithNoTests: true,
  testRegex: '\\.(test|__tests__|spec)\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/**.(ts|tsx)', '!src/**/**.d.ts'],
  setupFiles: [],
  bail: true,
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
export default config
