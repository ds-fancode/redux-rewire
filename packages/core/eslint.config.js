const baseConfig = require('../../eslint.config')

const finalConfig = [
  ...baseConfig,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [

          ],
          patterns: [

          ]
        }
      ]
    }
  }
]
module.exports = finalConfig
