const baseConfig = require('../../jest.config')

const config = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.mock.ts']
}
module.exports = config
