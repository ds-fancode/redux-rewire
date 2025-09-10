const baseConfig = require('../../jest.config')

const config = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/jest.mock.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@redux-rewire/core$': '<rootDir>/../core/src/index.ts'
  }
}
module.exports = config
