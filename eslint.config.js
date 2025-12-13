const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
// const reactNative = require('eslint-plugin-react-native')
// const jsxA11y = require('eslint-plugin-jsx-a11y')
const globals = require('globals')
const importPlugin = require('eslint-plugin-import')

module.exports = tseslint.config(
  {
    ignores: [
      '**/build/**',
      '**/.yarn/**',
      '**/.git/**',
      '**/.bundle/**',
      '**/.storybook/**',
      '**/__mocks__/**',
      '**/android/**',
      '**/ios/**',
      '**/dist/**',
      '**/stats/**',
      '**/log/**',
      '**/coverage/**',
      '**/logs/**',
      '**/*.d.ts',
      '**/*.generated.ts',
      '**/node_modules/**',
      '**/*.{js,jsx}'
    ]
  },
  {
    plugins: {
      'react-hooks': reactHooks
      // 'react-native': reactNative,
      // 'jsx-a11y': jsxA11y
    }
  },
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.react,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect'
      },
      'import/ignore': ['node_modules/react-native/index\\.js$']
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: ['./tsconfig.json', './packages/*/tsconfig.json']
      },
      globals: Object.fromEntries(
        Object.entries(globals.browser).map(([key, value]) => [
          key.trim(),
          value
        ])
      )
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^(_|__)',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^(_|e)',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/jest.mock.ts',
      '**/jest.setup.ts'
    ],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.js'],
    rules: {
      // turn off other type-aware rules
      '@typescript-eslint/internal/no-poorly-typed-ts-props': 'off',
      // turn off rules that don't apply to JS code
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
)
