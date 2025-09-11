const baseConfig = require('../../jest.config')

const config = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.mock.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@redux-rewire/core$': '<rootDir>/../core/src/index.ts'
  }
}
module.exports = config
