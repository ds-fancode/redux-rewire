const baseConfig = require('../../eslint.config')

const finalConfig = [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'prefer-const': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/array-type': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [],
          patterns: []
        }
      ]
    }
  }
]
module.exports = finalConfig
