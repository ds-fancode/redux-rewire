const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
// const jsxA11y = require('eslint-plugin-jsx-a11y')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/stats/**',
      '**/log/**',
      '**/coverage/**',
      '**/logs/**',
      '**/lib/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/*.d.ts',
      '**/*.generated.ts',
      '**/src/**/*.js',
      '**/sdk/**/*.js',
      '**/jest.mock.js'
    ]
  },
  {
    ...eslint.configs.recommended,
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    }
  },
  ...tseslint.config({
    files: ['**/*.{ts,tsx}'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: true
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern:
            '^(_|state|err|e|actions|action|actionData|req|res|compKey|compkey|globalState|prevState|key|actions|parentState|props|index)',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  }),
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      // 'jsx-a11y': jsxA11y
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // ...jsxA11y.configs.recommended.rules,
      'max-lines': [
        'off',
        {max: 300, skipBlankLines: true, skipComments: true}
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'warn',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/ban-types': 'warn',
      'react/display-name': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.commonjs,
        ...globals.node
      }
    }
  }
]
